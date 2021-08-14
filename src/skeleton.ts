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

			const sprite = new PIXI.Sprite(PIXI.Texture.from(seg.Path));
			sprite.x = -seg.Pos.PivotX;
			sprite.y = -seg.Pos.PivotY;
			segContainer.addChild(sprite);

			segContainer.x = seg.Pos.ParentX * (seg.invert ? -1 : 1);
			segContainer.y = seg.Pos.ParentY;
		}
	}

	/**
	 * Algorithm to sort the current render order
	 */
	sortRenderOrder(): boolean {
		// We start by creating a map with the dynamic priority of all objects
		// We also make a temporary renderOrder
		let highestFallback = 1;
		const tempOrder = [];
		const pri = new Map();
		const priTags = new Map();
		for (let R = 0; R < this.renderOrder.length; R++) {
			highestFallback = Math.max(Math.max(this.renderOrder[R].PriorityFallback, highestFallback), 1); // Highest priority fallback
			let seg = this.renderOrder[R];
			pri.set(seg.name, 0);
			for (let T = 0; T < this.renderOrder[R].PriorityTag.length; T++) {
				let tag = seg.PriorityTag[T];
				let tags = priTags.get(tag);
				if (!tags) priTags.set(tag, [seg.name]);
				else tags.push(seg.name);
			}
			pri.set(this.renderOrder[R].name, 0);
			tempOrder.push(this.renderOrder[R]);
		}

		// Next we start an iteration where we migrate things to follow rules and then sort
		let iterations = 0;
		const iterationMax = 100;
		let adjusted = true;
		while (iterations < iterationMax && adjusted) {
			adjusted = false;
			for (let R = 0; R < tempOrder.length; R++) {
				let seg = tempOrder[R];
				let priorities = seg.Priority;

				if (seg.name == 'ArmL') {
					const a = 1;
				}

				for (let P = 0; P < priorities.length; P++) {
					let priority = priorities[P];
					if (!priority.condition || priority.condition(this.skeleton)) {
						let searchNames = [];
						if (pri.get(priority.seg) != null) searchNames.push(priority.seg);
						else {
							let tags = priTags.get(priority.seg);
							if (tags != null) {
								for (let T = 0; T < tags.length; T++) {
									searchNames.push(tags[T]);
								}
							}
						}

						for (let SN = 0; SN < searchNames.length; SN++) {
							let searchName = searchNames[SN];

							let currPri = pri.get(seg.name);
							let rulePri = pri.get(searchName);
							if (priority.rule == PriorityRule.ABOVE && currPri <= rulePri) {
								pri.set(seg.name, currPri + 1);
								pri.set(searchName, rulePri - 1);
								adjusted = true;
								//break; // To make sure each object moves at most 1 per step
							} else if (priority.rule == PriorityRule.BELOW && currPri >= rulePri) {
								pri.set(seg.name, currPri - 1);
								pri.set(searchName, rulePri + 1);
								adjusted = true;
								//break; // To make sure each object moves at most 1 per step
							}
						}

					}
				}
			}

			tempOrder.sort((a, b) => { return pri.get(a.name) - pri.get(b.name); });
			iterations++;
		}
		if (iterations == iterationMax) {
			console.log('Warning: Cycle detected!!! If this is unexpected, please report as a bug and provide the items being worn');
			return false;
		} else this.renderOrder = tempOrder;
		for (let L = 0; L < this.renderOrder.length; L++) {
			this.containers[this.renderOrder[L].name].zIndex = pri.get(this.renderOrder[L].name) + (this.renderOrder[L].PriorityFallback / highestFallback);
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

			if (seg.Hide && seg.Hide(this.skeleton)) {
				segContainer.children[0].visible = false;
				seg.visible = false;
			} else {
				let xoffset = 0;
				let yoffset = 0;

				if (seg.extension > 0) {
					xoffset = seg.Rotation.TranslateXPos ? seg.Rotation.TranslateXPos * seg.extension : 0;
					yoffset = seg.Rotation.TranslateYPos ? seg.Rotation.TranslateYPos * seg.extension : 0;
				} else {
					xoffset = seg.Rotation.TranslateXNeg ? -seg.Rotation.TranslateXNeg * seg.extension : 0;
					yoffset = seg.Rotation.TranslateYNeg ? -seg.Rotation.TranslateYNeg * seg.extension : 0;
				}

				let xx = (seg.invert ? -1 : 1) * (seg.Pos.ParentX + xoffset);
				let yy = seg.Pos.ParentY + yoffset;
				seg.currentX = ((seg.segParent) ? seg.segParent.currentX : 0)
					+ xx * ((seg.segParent) ? Math.cos(seg.segParent.extensionAngleAbsolute) : 0)
					- yy * ((seg.segParent) ? Math.sin(seg.segParent.extensionAngleAbsolute) : 0);
				seg.currentY = ((seg.segParent) ? seg.segParent.currentY : 0)
					+ xx * ((seg.segParent) ? Math.sin(seg.segParent.extensionAngleAbsolute) : 0)
					+ yy * ((seg.segParent) ? Math.cos(seg.segParent.extensionAngleAbsolute) : 0);

				segContainer.x = seg.currentX;
				segContainer.y = seg.currentY;

				if (seg.Rotation.hideExtAbove && seg.extension > seg.Rotation.hideExtAbove) {
					segContainer.children[0].visible = false;
					seg.visible = false;
				} else if (seg.Rotation.hideExtBelow && seg.extension <= seg.Rotation.hideExtBelow) {
					segContainer.children[0].visible = false;
					seg.visible = false;
				} else {
					segContainer.children[0].visible = true;
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
	head: BodySegment | null = null;

	/** @private */
	private poseTags: PoseTag[] = [];

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
		for (let S = 0; S < this.segments.length; S++) {
			if (this.segments[S].name == head) {
				this.head = this.segments[S];
				break;
			}
		}
		if (this.head) {
			for (let S = 0; S < this.segments.length; S++) {
				this.segments[S].setParent(this.segments);
			}
		} else console.log('Warning, torso not found when generating skeleton');
	}

	/**
	 * Returns the named segment
	 * @param name - Name of the segment
	 * @returns The segment with the right name, otherwise null
	 */
	get(name: string): BodySegment | undefined {
		return this.segments.find((x) => x.name === name);
	}
}

/**
 * Segment for use in Pandora characters
 */
export class BodySegment {
	name: string;

	/**
	 * @type {{ rule : PriorityRule, seg: string, condition: null | function(BodySkeleton) }[]}
	 */
	Priority;
	/**
	 * @type {string[]}
	 */
	PriorityTag;
	PriorityFallback;
	Path;
	Parent;
	Pos;
	Rotation;
	/**
	 * @type {function(BodySkeleton) | null}
	 */
	Hide: ((skeleton: BodySkeleton) => void) | null = null;
	Ext = null;
	Weight = null;

	currentX = 0;
	currentY = 0;
	visible = true;

	segParent: BodySegment | null = null;
	segExtensionParent = null;
	segChildren: BodySegment[] = [];
	segExtension = 0.0;

	invert: boolean = false;

	/**
	 * @param Name - Name of the segment
	 * @param {{ rule : PriorityRule, seg: string, condition: null | function(BodySkeleton) }[]} Priority - Render priority
	 * @param {string[]} PriorityTag - Render priority tag for grouping (e.g arm, or panties)
	 * @param {number} PriorityFallback - Render priority fallback when items have same priority
	 * @param {string} Path - Location of the sprite for this segment
	 * @param {string} Parent - Parent of the segment, which the segment is attached to and rotates with. If null, it will be the torso
	 * @param {boolean} Invert - All rotation/translation/positions are mirrored on the x axis, but still referenced as positive. You give this to the limbs on the opposite side of the body and all the other values stay the same
	 * @param {} Pos - REQUIRED position information
	 * @param {float} Pos.PivotX - Center of the sprite
	 * @param {float} Pos.PivotY - Center of the sprite
	 * @param {float} Pos.ParentX - Location to fix the sprite on the parent
	 * @param {float} Pos.ParentY - Location to fix the sprite on the parent
	 * @param {} Rotation - REQUIRED rotation information
	 * @param {float} Rotation.AngleMax - Max extension in radians. Must be >= 0
	 * @param {float} Rotation.AngleMin - Max extension in radians. Must be >= 0
	 * @param {float | null} Rotation.TranslateXPos - translation in x/y direction, this value is in pixels and is the value the sprite will be translated at max extension in the positive angle direction
	 * @param {float | null} Rotation.TranslateYPos - translation in x/y direction, this value is in pixels and is the value the sprite will be translated at max extension in the positive angle direction
	 * @param {float | null} Rotation.TranslateXNeg - translation in x/y direction, this value is in pixels and is the value the sprite will be translated at max extension in the negative angle direction
	 * @param {float | null} Rotation.TranslateYNeg - translation in x/y direction, this value is in pixels and is the value the sprite will be translated at max extension in the negative angle direction
	 * @param {float | null} Rotation.SquashXPos - like translation, but instead it is a factor of how much the length changes. Good for shrinking forearms to simulate folding hands in front
	 * @param {float | null} Rotation.SquashYPos - like translation, but instead it is a factor of how much the length changes. Good for shrinking forearms to simulate folding hands in front
	 * @param {float | null} Rotation.SquashXNeg - like translation, but instead it is a factor of how much the length changes. Good for shrinking forearms to simulate folding hands in front
	 * @param {float | null} Rotation.SquashYNeg - like translation, but instead it is a factor of how much the length changes. Good for shrinking forearms to simulate folding hands in front
	 * @param {float | null} Rotation.hideExtAbove - Hides this bodypart when extension is higher
	 * @param {float | null} Rotation.hideExtBelow - Hides this bodypart when extension is higher
	 * @param {function(BodySkeleton | null)} Hide - OPTIONAL Hide function
	 * @param {} Ext - OPTIONAL extension parents for non-free segments
	 * @param {string} Ext.Parent - if Ext is null, this is a free rotating segment. If specified, this will not freely rotate but the extension (percentage of min/max angle) will be copied from the specified segment
	 * @param {number} Ext.Mult - multiplier for the extension parent. Basically if this is set to 0.75 and the extension parent is the arm, then this will rotate at 75% of the rate that the arm does. Good for shoulders
	 * @param {number | null} Ext.MultNegative - Mult, but in the negative direction
	 * @param {} Weight - OPTIONAL squish and offset based on weight
	 * @param {dict} Weight.Mult - a dict {} containing names of params and how much they are multiplied by based on the weight property assigned to the character body
	 * @param {dict} Weight.Offset - a dict {} containing names of params and how much they are offset by based on the weight property assigned to the character body
	 */
	constructor(Name, Priority, PriorityTag, PriorityFallback, Path, Parent, Invert, Pos, Rotation, Hide, Ext, Weight) {
		this.name = Name;
		this.Priority = Priority;
		this.PriorityTag = PriorityTag;
		this.PriorityFallback = PriorityFallback;
		this.Path = Path;
		this.Parent = Parent;
		this.invert = Invert;
		this.Pos = Pos;
		this.Rotation = Rotation;
		this.Hide = Hide;
		this.Ext = Ext;
		this.Weight = Weight;
	}

	/**
	 * A sets the parent, called for everything in the skeleton once all segments are added
	 * @param skeleton - List of BodySegments
	 * @returns - Whether or not the operation was successful
	 */
	setParent(skeleton: BodySegment[]): boolean {
		let pass = 0;
		if (!this.Parent) return true;
		for (let S = 0; S < skeleton.length; S++) {
			if (skeleton[S].name == this.Parent) {
				this.segParent = skeleton[S];
				if (!this.Ext)
					return this.segParent.addChild(this);
				else {
					pass += 1;
					break;
				}
			}
		}
		for (let S = 0; S < skeleton.length; S++) {
			if (skeleton[S].name == this.Ext.Parent) {
				this.segExtensionParent = skeleton[S];
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
		if (this.Ext && this.segExtensionParent) {
			this.segExtension = Math.max(-1, Math.min(1, this.segExtensionParent.extension * ((this.Ext.MultNegative != null && this.segExtensionParent.extension < 0) ? this.Ext.MultNegative : this.Ext.Mult)));
		}
		return this.segExtension;
	}
	/**
	 * Gets the current extension as an angle
	 * @returns - Extension converted to angle
	 */
	get extensionAngle(): number {
		if (this.extension > 0) return (this.invert ? -1 : 1) * this.Rotation.AngleMax * this.segExtension;
		else return (this.invert ? 1 : -1) * this.Rotation.AngleMin * this.segExtension;
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
		if (this.Ext) return;
		this.segExtension = Math.min(1, Math.max(-1, amount));
	}

	/**
	 * Sets the extension internally, based on an angle
	 * @param angle - Sets the extension in radians
	 */
	setExtensionAngle(angle: number): void {
		if (this.Ext) return;
		const ang = (this.invert ? -angle : angle);
		let ext = 0;
		if (ang > 0 && this.Rotation.AngleMax > 0) {
			ext = ang / this.Rotation.AngleMax;
		} else if (ang < 0 && this.Rotation.AngleMin < 0) {
			ext = ang / this.Rotation.AngleMin;
		}

		this.segExtension = Math.min(1, Math.max(-1, ext));
	}
}
