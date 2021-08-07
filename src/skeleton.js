"use strict";

var PriorityRule = {
	ABOVE: true,
	BELOW: false,
};

var PoseTag = {
	HANDBEHINDBACK_LEFT: 0,
	HANDBEHINDBACK_RIGHT: 1,
	KNEEL_LEFT: 10,
	KNEEL_RIGHT: 11,
	FIST_LEFT: 20,
	FIST_RIGHT: 21,
	TIPTOE_LEFT: 30,
	TIPTOE_RIGHT: 31,
}

class SkeletonContainer {
	/**
	 * @type {PIXI.Container}
	 */
	container = null;

	/**
	 * @type {Object.<string, PIXI.container>}
	 */
	containers = {};
	/**
	 * @type {BodySegment}
	 */
	renderOrder = [];

	Skeleton;

	/**
	 * Holds Containers for a BodySkeleton
	 * @param {BodySkeleton} Skeleton - The skeleton for this container
	 */
	constructor(Skeleton) {
		this.Skeleton = Skeleton;
		this.containers = {};
		this.renderOrder = [];

		for (let S = 0; S < Skeleton.segments.length; S++) {
			let seg = Skeleton.segments[S];
			this.containers[seg.Name] = new PIXI.Container();
			this.renderOrder.push(seg);
		}

		this.container = new PIXI.Container();
		this.container.sortableChildren = true;

		this.sortRenderOrder();

		for (let S = 0; S < this.renderOrder.length; S++) {
			let seg = this.renderOrder[S];
			let segContainer = this.containers[seg.Name];

			this.container.addChild(segContainer);

			const sprite = new PIXI.Sprite(PIXI.Texture.from(seg.Path));
			sprite.x = -seg.Pos.PivotX;
			sprite.y = -seg.Pos.PivotY;
			segContainer.addChild(sprite);

			segContainer.x = seg.Pos.ParentX * (seg.Invert ? -1 : 1);
			segContainer.y = seg.Pos.ParentY;
		}


	}

	/**
	 * Algorithm to sort the current render order
	 */
	sortRenderOrder() {
		// We start by creating a map with the dynamic priority of all objects
		// We also make a temporary renderOrder
		let highestFallback = 1;
		let tempOrder = [];
		let pri = new Map();
		let priTags = new Map();
		for (let R = 0; R < this.renderOrder.length; R++) {
			highestFallback = Math.max(highestFallback, 1); // Highest priority fallback
			let seg = this.renderOrder[R];
			pri.set(seg.Name, 0);
			for (let T = 0; T < this.renderOrder[R].PriorityTag.length; T++) {
				let tag = seg.PriorityTag[T];
				let tags = priTags.get(tag);
				if (!tags) priTags.set(tag, [seg.Name]);
				else tags.push(seg.Name);
			}
			pri.set(this.renderOrder[R].Name, 0);
			tempOrder.push(this.renderOrder[R]);
		}

		// Next we start an iteration where we migrate things to follow rules and then sort
		let iterations = 0;
		let iterationMax = 100;
		let adjusted = true;
		while (iterations < iterationMax && adjusted) {
			adjusted = false;
			for (let R = 0; R < tempOrder.length; R++) {
				let seg = tempOrder[R];
				let priorities = seg.Priority;

				for (let P = 0; P < priorities.length; P++) {
					let priority = priorities[P];
					if (!priority.condition || priority.condition(this.Skeleton))
					{
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

							let currPri = pri.get(seg.Name);
							let rulePri = pri.get(searchName);
							if (priority.rule == PriorityRule.ABOVE && currPri <= rulePri) {
								pri.set(seg.Name, currPri + 1);
								pri.set(searchName, rulePri - 1);
								adjusted = true;
								break; // To make sure each object moves at most 1 per step
							} else if (priority.rule == PriorityRule.BELOW && currPri >= rulePri) {
								pri.set(seg.Name, currPri - 1);
								pri.set(searchName, rulePri + 1);
								adjusted = true;
								break; // To make sure each object moves at most 1 per step
							}
						}

					}
				}
			}

			tempOrder.sort((a, b) => {return pri.get(a.Name) - pri.get(b.Name)});
			iterations++;
		}
		if (iterations == iterationMax) {
			console.log("Warning: Cycle detected!!! If this is unexpected, please report as a bug and provide the items being worn");
			return false;
		} else this.renderOrder = tempOrder;
		for (let L = 0; L < this.renderOrder.length; L++) {
			this.containers[this.renderOrder[L].Name].zIndex = pri.get(this.renderOrder[L].Name) + (this.renderOrder[L].PriorityFallback/highestFallback);
		}
		this.container.sortChildren();
		return true;
	}


	/**
	 * Algorithm to update the skeleton
	 */
	update() {
		this.updateExtension();
		if (this.Skeleton.changed) this.sortRenderOrder();
	}
	/**
	 * Algorithm to update all item extensions and their respective graphics objects
	 */
	updateExtension() {

		for (let S = 0; S < this.renderOrder.length; S++) {
			let seg = this.renderOrder[S];
			let segContainer = this.containers[seg.Name];

			segContainer.rotation = seg.extensionAngleAbsolute;

			if (seg.Hide && seg.Hide(this.Skeleton)) {
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

				let xx = (seg.Invert ? -1 : 1) * (seg.Pos.ParentX + xoffset);
				let yy = seg.Pos.ParentY + yoffset;
				seg.currentX = ((seg.segParent) ? seg.segParent.currentX : 0)
								+ xx *  ((seg.segParent) ? Math.cos(seg.segParent.extensionAngleAbsolute) : 0)
								- yy *  ((seg.segParent) ? Math.sin(seg.segParent.extensionAngleAbsolute) : 0);
				seg.currentY = ((seg.segParent) ? seg.segParent.currentY : 0)
								+ xx *  ((seg.segParent) ? Math.sin(seg.segParent.extensionAngleAbsolute) : 0)
								+ yy *  ((seg.segParent) ? Math.cos(seg.segParent.extensionAngleAbsolute) : 0);

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

class BodySkeleton {
	segments = [];
	head = null;

	/** @private */
	PoseTags = [];

	changed = false;

	/**
	 * Adds poses
	 * @param {PoseTag[]} Poses - List of poses to add
	 * @param {SkeletonContainer} SkeletonContainer - Container to refresh
	 */
	 addPose(Poses, SkeletonContainer) {
		let changed = false;
		for (let P = 0; P < Poses.length; P++) {
			if (!this.PoseTags.includes(Poses[P])) {
				this.PoseTags.push(Poses[P]);
				changed = true;
			}
		}
		this.changed = changed ? changed : this.changed;
		return changed;
	}

	/**
	 * Removes poses
	 * @param {PoseTag[]} Poses - List of poses to add
	 * @param {SkeletonContainer} SkeletonContainer - Container to refresh
	 */
	removePose(Poses, SkeletonContainer) {
		let changed = false;
		for (let P = 0; P < Poses.length; P++) {
			if (this.PoseTags.includes(Poses[P])) {
				this.PoseTags.splice(this.PoseTags.indexOf(Poses[P]), 1); // Remove the pose
				changed = true;
			}
		}
		this.changed = changed ? changed : this.changed;
		return changed;
	}


	/**
	 * Holds BodySegment options and utility functions
	 */
	constructor() {
		this.segments = [];
	}

	/**
	 * Assigns parents to children
	 * @param {string} Head - Optional name of the head
	 */
	assignParents(Head = "Torso") {
		for (let S = 0; S < this.segments.length; S++) {
			if (this.segments[S].Name == Head) {
				this.head = this.segments[S];
				break;
			}
		}
		if (this.head) {
			for (let S = 0; S < this.segments.length; S++) {
				this.segments[S].setParent(this.segments);
			}
		} else console.log("Warning, torso not found when generating skeleton");
	}

	/**
	 * Returns the named segment
	 * @param {string} Name - Name of the segment
	 * @returns {BodySegment} The segment with the right name, otherwise null
	 */
	get(Name) {
		for (let S = 0; S < this.segments.length; S++) {
			if (this.segments[S].Name == Name) {
				return this.segments[S];
			}
		}
		return null;
	}
}

class BodySegment {
	Name;

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
	Hide = null;
	Ext = null;
	Weight = null;

	currentX = 0;
	currentY = 0;
	visible = true;

	segParent = null;
	segExtensionParent = null;
	segChildren = [];
	segExtension = 0.0;

	/**
	 * A segment for use in Pandora characters
	 * @param {string} Name - Name of the segment
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
		this.Name = Name;
		this.Priority = Priority;
		this.PriorityTag = PriorityTag;
		this.PriorityFallback = PriorityFallback;
		this.Path = Path;
		this.Parent = Parent;
		this.Invert = Invert;
		this.Pos = Pos;
		this.Rotation = Rotation;
		this.Hide = Hide;
		this.Ext = Ext;
		this.Weight = Weight;
	}

	/**
	 * A sets the parent, called for everything in the skeleton once all segments are added
	 * @param {list} Skeleton - List of BodySegments
	 * @returns {boolean} - Whether or not the operation was successful
	 */
	setParent(Skeleton) {
		let pass = 0;
		if (!this.Parent) return true;
		for (let S = 0; S < Skeleton.length; S++) {
			if (Skeleton[S].Name == this.Parent) {
				this.segParent = Skeleton[S];
				if (!this.Ext)
					return this.segParent.addChild(this);
				else {
					pass += 1;
					break;
				}
			}
		}
		for (let S = 0; S < Skeleton.length; S++) {
			if (Skeleton[S].Name == this.Ext.Parent) {
				this.segExtensionParent = Skeleton[S];
				pass += 1;
				break;
			}
		}

		return pass == 2;
	}

	/**
	 * Gets a copied list of children
	 * @returns {list} - List of children
	 */
	getChildren() {
		let temp = [];
		for (let C = 0; C < this.segChildren.length; C++) {
			temp.push(this.segChildren[C]);
		}
		return temp;
	}

	/**
	 * Clears the current children of the segment
	 */
	clearChildren() {
		this.segChildren = [];
	}

	/**
	 * Adds a child to this segment
	 * @param {BodySegment} Child - The child to add
	 * @returns {boolean} - Whether or not the operation was successful
	 */
	addChild(Child) {
		for (let C = 0; C < this.segChildren.length; C++) {
			if (this.segChildren[C].Name == Child.Name) {

				return false;
			}
		}
		this.segChildren.push(Child);
		return true;
	}


	/**
	 * Gets the current extension percent
	 * @returns {float} - Current Extension Percentage
	 */
	get extension() {
		if (this.Ext && this.segExtensionParent) {
			this.segExtension = Math.max(-1, Math.min(1, this.segExtensionParent.extension * ((this.Ext.MultNegative != null && this.segExtensionParent.extension < 0) ? this.Ext.MultNegative : this.Ext.Mult)));
		}
		return this.segExtension;
	}
	/**
	 * Gets the current extension as an angle
	 * @returns {float} - Extension converted to angle
	 */
	 get extensionAngle() {
		let ang = 0;
		if (this.extension > 0) return  (this.Invert ? -1 : 1) * this.Rotation.AngleMax * this.segExtension;
		else return (this.Invert ? 1 : -1) * this.Rotation.AngleMin * this.segExtension;
	}
	/**
	 * Gets the absolute extension as an angle
	 * @returns {float} - Extension converted to angle
	 */
	 get extensionAngleAbsolute() {
		let ang = this.extensionAngle;
		if (this.segParent) ang += this.segParent.extensionAngleAbsolute;
		return ang;
	}

	/**
	 * Sets the extension in terms of percentage of max
	 * @param {float} Amount - Sets the extension in terms of percentage of max
	 */
	setExtension(Amount) {
		if (this.Ext) return;
		this.segExtension = Math.min(1, Math.max(-1, Amount));
	}

	/**
	 * Sets the extension internally, based on an angle
	 * @param {float} Angle - Sets the extension in radians
	 */
	setExtensionAngle(Angle) {
		if (this.Ext) return;
		let ang = (this.Invert ? -Angle : Angle);
		let ext = 0;
		if (ang > 0 && this.Rotation.AngleMax > 0) {
			ext = ang/this.Rotation.AngleMax;
		} else if (ang < 0 && this.Rotation.AngleMin < 0) {
			ext = ang/this.Rotation.AngleMin;
		}

		this.segExtension = Math.min(1, Math.max(-1, ext));
	}
}