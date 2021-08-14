import * as PIXI from 'pixi.js';

export const PriorityRule = {
	ABOVE: true,
	BELOW: false,
};

export const enum PoseTag {
	HANDBEHINDBACK_LEFT = 0,
	HANDBEHINDBACK_RIGHT = 1,
	REVERSEPRAYER_LEFT = 2,
	REVERSEPRAYER_RIGHT = 3,
	BOXTIE = 4,
	YOKED = 5,
	KNEEL_LEFT = 10,
	KNEEL_RIGHT = 11,
	FIST_LEFT = 20,
	FIST_RIGHT = 21,
	TIPTOE_LEFT = 30,
	TIPTOE_RIGHT = 31,
}

export interface IPriority {
	rule: boolean;
	seg: string;
	condition?: ((skeleton: BodySkeleton) => boolean);
}

export interface IPosition {
	/**Center of the sprite */
	pivotX: number;
	/**Center of the sprite */
	pivotY: number;
	/**Location to fix the sprite on the parent */
	parentX: number;
	/**Location to fix the sprite on the parent */
	parentY: number;
}

export interface IRotation {
	/**Max extension in radians. Must be >= 0 */
	angleMax: number;
	/**Max extension in radians. Must be >= 0 */
	angleMin: number;

	/**translation in x/y direction, this value is in pixels and is the value the sprite will be translated at max extension in the positive angle direction */
	translateXPos?: number;
	/**translation in x/y direction, this value is in pixels and is the value the sprite will be translated at max extension in the positive angle direction */
	translateYPos?: number;
	/**translation in x/y direction, this value is in pixels and is the value the sprite will be translated at max extension in the positive angle direction */
	translateXNeg?: number;
	/**translation in x/y direction, this value is in pixels and is the value the sprite will be translated at max extension in the positive angle direction */
	translateYNeg?: number;

	/**like translation, but instead it is a factor of how much the length changes. Good for shrinking forearms to simulate folding hands in front */
	squashXPos?: number;
	/**like translation, but instead it is a factor of how much the length changes. Good for shrinking forearms to simulate folding hands in front */
	squashYPos?: number;
	/**like translation, but instead it is a factor of how much the length changes. Good for shrinking forearms to simulate folding hands in front */
	squashXNeg?: number;
	/**like translation, but instead it is a factor of how much the length changes. Good for shrinking forearms to simulate folding hands in front */
	squashYNeg?: number;

	/**Hides this bodypart when extension is higher */
	hideExtAbove?: number;
	/**Hides this bodypart when extension is higher */
	hideExtBelow?: number;
}

/**extension parents for non-free segments */
export interface IExtension {
	/**if Ext is null, this is a free rotating segment. If specified, this will not freely rotate but the extension (percentage of min/max angle) will be copied from the specified segment */
	parent: string;

	/**multiplier for the extension parent. Basically if this is set to 0.75 and the extension parent is the arm, then this will rotate at 75% of the rate that the arm does. Good for shoulders */
	mult: number;

	/**Mult, but in the negative direction */
	multNegative?: number;
}

export interface IWeight {
	//  * @param {dict} Weight.Mult - a dict {} containing names of params and how much they are multiplied by based on the weight property assigned to the character body
	//  * @param {dict} Weight.Offset - a dict {} containing names of params and how much they are offset by based on the weight property assigned to the character body

	/**Map containing names of params and how much they are multiplied by based on the weight property assigned to the character body */
	mult: Map<string, any>;

	/**Map containing names of params and how much they are offset by based on the weight property assigned to the character body */
	offset: Map<string, any>;
}

/**
 * Holds Containers for a BodySkeleton
 */
export class SkeletonContainer {
	container: PIXI.Container;

	containers: Map<string, PIXI.Container> = new Map<string, PIXI.Container>();

	renderOrder: BodySegment[] = [];

	skeleton: BodySkeleton;

	/**
	 * @param skeleton - The skeleton for this container
	 */
	constructor(skeleton: BodySkeleton) {
		this.skeleton = skeleton;
		this.renderOrder = [];

		for (const seg of skeleton.segments) {
			this.containers.set(seg.name, new PIXI.Container());
			this.renderOrder.push(seg);
		}

		this.container = new PIXI.Container();
		this.container.sortableChildren = true;

		this.sortRenderOrder();

		for (const seg of this.renderOrder) {
			const segContainer = this.containers.get(seg.name);
			if (segContainer === undefined) {
				continue;
			}

			this.container.addChild(segContainer);

			const sprite = new PIXI.Sprite(PIXI.Texture.from(seg.path));
			sprite.x = -seg.position.pivotX;
			sprite.y = -seg.position.pivotY;
			segContainer.addChild(sprite);

			segContainer.x = seg.position.parentX * (seg.invert ? -1 : 1);
			segContainer.y = seg.position.parentY;
		}
	}

	/**
	 * Algorithm to sort the current render order
	 */
	sortRenderOrder(): boolean {
		// We start by creating a map with the dynamic priority of all objects
		// We also make a temporary renderOrder
		let highestFallback = 1;
		const tempOrder: BodySegment[] = [];
		const pri = new Map<string, number>();
		const priTags = new Map<string, string[]>();
		for (const seg of this.renderOrder) {
			highestFallback = Math.max(Math.max(seg.priorityFallback, highestFallback), 1); // Highest priority fallback
			pri.set(seg.name, 0);
			for (const tag of seg.priorityTag) {
				const tags = priTags.get(tag);
				if (!tags) priTags.set(tag, [seg.name]);
				else tags.push(seg.name);
			}
			pri.set(seg.name, 0);
			tempOrder.push(seg);
		}

		// Next we start an iteration where we migrate things to follow rules and then sort
		let iterations = 0;
		const iterationMax = 100;
		let adjusted = true;
		while (iterations < iterationMax && adjusted) {
			adjusted = false;
			for (const seg of tempOrder) {
				const priorities = seg.priority;

				for (const priority of priorities) {
					if (!priority.condition || priority.condition(this.skeleton)) {
						const searchNames: string[] = [];
						if (pri.get(priority.seg) != null) searchNames.push(priority.seg);
						else {
							const tags = priTags.get(priority.seg);
							if (tags != null) {
								for (const t of tags) {
									searchNames.push(t);
								}
							}
						}

						for (const searchName of searchNames) {
							const currPri = pri.get(seg.name) ?? 0;
							const rulePri = pri.get(searchName) ?? 0;
							if (priority.rule === PriorityRule.ABOVE && currPri <= rulePri) {
								pri.set(seg.name, currPri + 1);
								pri.set(searchName, rulePri - 1);
								adjusted = true;
								//break; // To make sure each object moves at most 1 per step
							} else if (priority.rule === PriorityRule.BELOW && currPri >= rulePri) {
								pri.set(seg.name, currPri - 1);
								pri.set(searchName, rulePri + 1);
								adjusted = true;
								//break; // To make sure each object moves at most 1 per step
							}
						}
					}
				}
			}

			tempOrder.sort((a, b) => (pri.get(a.name) ?? 0) - (pri.get(b.name) ?? 0));
			iterations++;
		}
		if (iterations === iterationMax) {
			// console.log('Warning: Cycle detected!!! If this is unexpected, please report as a bug and provide the items being worn');
			return false;
		} else {
			this.renderOrder = tempOrder;
		}

		for (const seg of this.renderOrder) {
			const container = this.containers.get(seg.name);
			if (container === undefined) continue;

			container.zIndex = (pri.get(seg.name) ?? 0) + (seg.priorityFallback / highestFallback);
		}

		this.container.sortChildren();
		return true;
	}

	/**
	 * Algorithm to update the skeleton
	 */
	update(): void {
		this.updateExtension();
		if (this.skeleton.changed) this.sortRenderOrder();
	}
	/**
	 * Algorithm to update all item extensions and their respective graphics objects
	 */
	updateExtension(): void {
		for (const seg of this.renderOrder) {
			const segContainer = this.containers.get(seg.name);
			if (segContainer === undefined) {
				continue;
			}

			segContainer.rotation = seg.extensionAngleAbsolute;

			const firstChild = segContainer.children[0];
			if (firstChild === undefined) {
				continue;
			}

			if (seg.hide && seg.hide(this.skeleton)) {
				firstChild.visible = false;
				seg.visible = false;
			} else {
				let xoffset = 0;
				let yoffset = 0;

				if (seg.extension > 0) {
					xoffset = seg.rotation.translateXPos ? seg.rotation.translateXPos * seg.extension : 0;
					yoffset = seg.rotation.translateYPos ? seg.rotation.translateYPos * seg.extension : 0;
				} else {
					xoffset = seg.rotation.translateXNeg ? -seg.rotation.translateXNeg * seg.extension : 0;
					yoffset = seg.rotation.translateYNeg ? -seg.rotation.translateYNeg * seg.extension : 0;
				}

				const xx = (seg.invert ? -1 : 1) * (seg.position.parentX + xoffset);
				const yy = seg.position.parentY + yoffset;
				seg.currentX = ((seg.segParent) ? seg.segParent.currentX : 0)
					+ xx * ((seg.segParent) ? Math.cos(seg.segParent.extensionAngleAbsolute) : 0)
					- yy * ((seg.segParent) ? Math.sin(seg.segParent.extensionAngleAbsolute) : 0);
				seg.currentY = ((seg.segParent) ? seg.segParent.currentY : 0)
					+ xx * ((seg.segParent) ? Math.sin(seg.segParent.extensionAngleAbsolute) : 0)
					+ yy * ((seg.segParent) ? Math.cos(seg.segParent.extensionAngleAbsolute) : 0);

				segContainer.x = seg.currentX;
				segContainer.y = seg.currentY;

				if (seg.rotation.hideExtAbove && seg.extension > seg.rotation.hideExtAbove) {
					firstChild.visible = false;
					seg.visible = false;
				} else if (seg.rotation.hideExtBelow && seg.extension <= seg.rotation.hideExtBelow) {
					firstChild.visible = false;
					seg.visible = false;
				} else {
					firstChild.visible = true;
					seg.visible = true;
				}
			}
		}
	}

}

/**
 * Holds BodySegment options and utility functions
 */
export class BodySkeleton {
	segments: BodySegment[] = [];
	head?: BodySegment;

	poseTags: PoseTag[] = [];

	changed: boolean = false;

	/**
	 * Adds poses
	 * @param poses - List of poses to add
	 */
	addPose(poses: PoseTag[]): boolean {
		let changed = false;
		for (const p of poses) {
			if (!this.poseTags.includes(p)) {
				this.poseTags.push(p);
				changed = true;
			}
		}
		this.changed = changed ? changed : this.changed;
		return changed;
	}

	/**
	 * Removes poses
	 * @param poses - List of poses to add
	 */
	removePose(poses: PoseTag[]): boolean {
		let changed = false;
		for (const p of poses) {
			if (this.poseTags.includes(p)) {
				this.poseTags.splice(this.poseTags.indexOf(p), 1); // Remove the pose
				changed = true;
			}
		}
		this.changed = changed ? changed : this.changed;
		return changed;
	}

	/**
	 * Assigns parents to children
	 * @param head - Optional name of the head
	 */
	assignParents(head: string = 'Torso'): void {
		for (const seg of this.segments) {
			if (seg.name === head) {
				this.head = seg;
				break;
			}
		}

		if (this.head) {
			for (const seg of this.segments) {
				seg.setParent(this.segments);
			}
		} //else console.log('Warning, torso not found when generating skeleton');
	}

	/**
	 * Returns the named segment
	 * @param name - Name of the segment
	 * @returns The segment with the right name, otherwise null
	 */
	get(name: string): BodySegment {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return this.segments.find((x) => x.name === name)!;
	}
}

/**
 * Segment for use in Pandora characters
 */
export class BodySegment {
	name: string;

	priority: IPriority[];

	/**Render priority tag for grouping (e.g arm, or panties) */
	priorityTag: string[];

	/**Render priority fallback when items have same priority */
	priorityFallback: number;

	/**Location of the sprite for this segment */
	path: string;

	/**Parent of the segment, which the segment is attached to and rotates with. If null, it will be the torso */
	parent: string;

	position: IPosition;

	rotation: IRotation;

	/**OPTIONAL Hide function */
	hide?: ((skeleton: BodySkeleton) => boolean);

	ext?: IExtension;
	weight?: IWeight;

	currentX = 0;
	currentY = 0;
	visible = true;

	segParent?: BodySegment;
	segExtensionParent?: BodySegment;
	segChildren: BodySegment[] = [];
	segExtension = 0.0;

	/**All rotation/translation/positions are mirrored on the x axis, but still referenced as positive. You give this to the limbs on the opposite side of the body and all the other values stay the same */
	invert: boolean = false;

	/**
	 * @param name - Name of the segment
	 * @param priority - Render priority
	 * @param priorityTag - Render priority tag for grouping (e.g arm, or panties)
	 * @param priorityFallback - Render priority fallback when items have same priority
	 * @param path - Location of the sprite for this segment
	 * @param parent - Parent of the segment, which the segment is attached to and rotates with. If null, it will be the torso
	 * @param invert - All rotation/translation/positions are mirrored on the x axis, but still referenced as positive. You give this to the limbs on the opposite side of the body and all the other values stay the same
	 * @param rotation - REQUIRED rotation information
	 * @param hide - OPTIONAL Hide function
	 * @param extension - OPTIONAL extension parents for non-free segments
	 * @param weight - OPTIONAL squish and offset based on weight
	 */
	constructor(
		name: string,
		priority: IPriority[],
		priorityTag: string[],
		priorityFallback: number,
		path: string,
		parent: string,
		invert: boolean,
		position: IPosition,
		rotation: IRotation,
		hide: ((skeleton: BodySkeleton) => boolean) | undefined = undefined,
		extension: IExtension | undefined = undefined,
		weight: IWeight | undefined = undefined) {
		this.name = name;
		this.priority = priority;
		this.priorityTag = priorityTag;
		this.priorityFallback = priorityFallback;
		this.path = path;
		this.parent = parent;
		this.invert = invert;
		this.position = position;
		this.rotation = rotation;
		this.hide = hide;
		this.ext = extension;
		this.weight = weight;
	}

	/**
	 * Sets the parent, called for everything in the skeleton once all segments are added
	 * @param skeleton - List of BodySegments
	 * @returns - Whether or not the operation was successful
	 */
	setParent(skeleton: BodySegment[]): boolean {
		let pass = 0;
		if (!this.parent) return true;
		for (const seg of skeleton) {
			if (seg.name === this.parent) {
				this.segParent = seg;
				if (!this.ext)
					return this.segParent.addChild(this);
				else {
					pass += 1;
					break;
				}
			}
		}

		for (const seg of skeleton) {
			if (this.ext && seg.name === this.ext.parent) {
				this.segExtensionParent = seg;
				pass += 1;
				break;
			}
		}

		return pass === 2;
	}

	/**
	 * Gets a copied list of children
	 * @returns - List of children
	 */
	getChildren(): BodySegment[] {
		const temp: BodySegment[] = [];
		for (const c of this.segChildren) {
			temp.push(c);
		}
		return temp;
	}

	/**
	 * Clears the current children of the segment
	 */
	clearChildren(): void {
		this.segChildren = [];
	}

	/**
	 * Adds a child to this segment
	 * @param child - The child to add
	 * @returns - Whether or not the operation was successful
	 */
	addChild(child: BodySegment): boolean {
		for (const c of this.segChildren) {
			if (c.name === child.name) {

				return false;
			}
		}
		this.segChildren.push(child);
		return true;
	}

	/**
	 * Gets the current extension percent
	 * @returns - Current Extension Percentage
	 */
	get extension(): number {
		if (this.ext && this.segExtensionParent) {
			this.segExtension = Math.max(-1, Math.min(1, this.segExtensionParent.extension * ((this.ext.multNegative != null && this.segExtensionParent.extension < 0) ? this.ext.multNegative : this.ext.mult)));
		}
		return this.segExtension;
	}
	/**
	 * Gets the current extension as an angle
	 * @returns - Extension converted to angle
	 */
	get extensionAngle(): number {
		if (this.extension > 0) return (this.invert ? -1 : 1) * this.rotation.angleMax * this.segExtension;
		else return (this.invert ? 1 : -1) * this.rotation.angleMin * this.segExtension;
	}
	/**
	 * Gets the absolute extension as an angle
	 * @returns {float} - Extension converted to angle
	 */
	get extensionAngleAbsolute(): number {
		let ang = this.extensionAngle;
		if (this.segParent) ang += this.segParent.extensionAngleAbsolute;
		return ang;
	}

	/**
	 * Sets the extension in terms of percentage of max
	 * @param amount - Sets the extension in terms of percentage of max
	 */
	setExtension(amount: number): void {
		if (this.ext) return;
		this.segExtension = Math.min(1, Math.max(-1, amount));
	}

	/**
	 * Sets the extension internally, based on an angle
	 * @param angle - Sets the extension in radians
	 */
	setExtensionAngle(angle: number): void {
		if (this.ext) return;
		const ang = (this.invert ? -angle : angle);
		let ext = 0;
		if (ang > 0 && this.rotation.angleMax > 0) {
			ext = ang / this.rotation.angleMax;
		} else if (ang < 0 && this.rotation.angleMin < 0) {
			ext = ang / this.rotation.angleMin;
		}

		this.segExtension = Math.min(1, Math.max(-1, ext));
	}
}
