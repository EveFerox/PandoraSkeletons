"use strict";

class SkeletonContainer {
	container = null;
	containers = {};
	renderOrder = [];

	/**
	 * Holds Containers for a BodySkeleton
	 * @param {BodySkeleton} Skeleton - The skeleton for this container
	 */
	constructor(Skeleton) {
		this.containers = {};
		this.renderOrder = [];

		for (let S = 0; S < Skeleton.segments.length; S++) {
			let seg = Skeleton.segments[S];
			this.containers[seg.Name] = new PIXI.Container();
			this.renderOrder.push(seg);
		}

		this.container = this.containers[Skeleton.head.Name];

		this.renderOrder.sort((a, b) => {return a.Priority - b.Priority;});

		for (let S = 0; S < this.renderOrder.length; S++) {
			let seg = this.renderOrder[S];
			let segContainer = this.containers[seg.Name];

			if (seg.Parent)
				this.container.addChild(segContainer);

			const sprite = new PIXI.Sprite(PIXI.Texture.from(seg.Path));
			sprite.x = -seg.Pos.PivotX;
			sprite.y = -seg.Pos.PivotY;
			segContainer.addChild(sprite);

			segContainer.x = seg.Pos.ParentX * (seg.Invert ? -1 : 1);
			segContainer.y = seg.Pos.ParentY;
		}


	}

	updateExtension() {

		for (let S = 0; S < this.renderOrder.length; S++) {
			let seg = this.renderOrder[S];
			let segContainer = this.containers[seg.Name];

			segContainer.rotation = seg.extensionAngleAbsolute;

			if (segContainer != this.container) { // We dont move the main container
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
				seg.currentX = seg.segParent.currentX
								+ xx * Math.cos(seg.segParent.extensionAngleAbsolute)
								- yy * Math.sin(seg.segParent.extensionAngleAbsolute);
				seg.currentY = seg.segParent.currentY
								+ xx * Math.sin(seg.segParent.extensionAngleAbsolute)
								+ yy * Math.cos(seg.segParent.extensionAngleAbsolute);

				segContainer.x = seg.currentX;
				segContainer.y = seg.currentY;
			}

			if (seg.Rotation.hideExtAbove && seg.extension > seg.Rotation.hideExtAbove) {
				segContainer.children[0].visible = false;
			} else if (seg.Rotation.hideExtBelow && seg.extension <= seg.Rotation.hideExtBelow) {
				segContainer.children[0].visible = false;
			} else {
				segContainer.children[0].visible = true;
			}
		}
	}

}

class BodySkeleton {
	segments = [];
	head = null;

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
	Priority;
	Path;
	Parent;
	Pos;
	Rotation;
	Ext = null;
	Weight = null;

	currentX = 0;
	currentY = 0;

	segParent = null;
	segExtensionParent = null;
	segChildren = [];
	segExtension = 0.0;

	/**
	 * A segment for use in Pandora characters
	 * @param {string} Name - Name of the segment
	 * @param {float} Priority - Render priority
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
	 * @param {float} Rotation.TranslateXPos - translation in x/y direction, this value is in pixels and is the value the sprite will be translated at max extension in the positive angle direction
	 * @param {float} Rotation.TranslateYPos - translation in x/y direction, this value is in pixels and is the value the sprite will be translated at max extension in the positive angle direction
	 * @param {float} Rotation.TranslateXNeg - translation in x/y direction, this value is in pixels and is the value the sprite will be translated at max extension in the negative angle direction
	 * @param {float} Rotation.TranslateYNeg - translation in x/y direction, this value is in pixels and is the value the sprite will be translated at max extension in the negative angle direction
	 * @param {float} Rotation.SquashXPos - like translation, but instead it is a factor of how much the length changes. Good for shrinking forearms to simulate folding hands in front
	 * @param {float} Rotation.SquashYPos - like translation, but instead it is a factor of how much the length changes. Good for shrinking forearms to simulate folding hands in front
	 * @param {float} Rotation.SquashXNeg - like translation, but instead it is a factor of how much the length changes. Good for shrinking forearms to simulate folding hands in front
	 * @param {float} Rotation.SquashYNeg - like translation, but instead it is a factor of how much the length changes. Good for shrinking forearms to simulate folding hands in front
	 * @param {float} Rotation.hideExtAbove - Hides this bodypart when extension is higher
	 * @param {float} Rotation.hideExtBelow - Hides this bodypart when extension is higher
	 * @param {} Ext - OPTIONAL extension parents for non-free segments
	 * @param {string} Ext.Parent - if Ext is null, this is a free rotating segment. If specified, this will not freely rotate but the extension (percentage of min/max angle) will be copied from the specified segment
	 * @param {string} Ext.Mult - multiplier for the extension parent. Basically if this is set to 0.75 and the extension parent is the arm, then this will rotate at 75% of the rate that the arm does. Good for shoulders
	 * @param {} Weight - OPTIONAL squish and offset based on weight
	 * @param {dict} Weight.Mult - a dict {} containing names of params and how much they are multiplied by based on the weight property assigned to the character body
	 * @param {dict} Weight.Offset - a dict {} containing names of params and how much they are offset by based on the weight property assigned to the character body
	 */
	constructor(Name, Priority, Path, Parent, Invert, Pos, Rotation, Ext, Weight) {
		this.Name = Name;
		this.Priority = Priority;
		this.Path = Path;
		this.Parent = Parent;
		this.Invert = Invert;
		this.Pos = Pos;
		this.Rotation = Rotation;
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
			this.segExtension = this.segExtensionParent.extension * this.Ext.Mult;
		}
		return this.segExtension;
	}
	/**
	 * Gets the current extension as an angle
	 * @returns {float} - Extension converted to angle
	 */
	 get extensionAngle() {
		if (this.Ext && this.segExtensionParent) {
			this.segExtension = this.segExtensionParent.extension * this.Ext.Mult;
		}
		let ang = 0;
		if (this.segExtension > 0) return  (this.Invert ? -1 : 1) * this.Rotation.AngleMax * this.segExtension;
		else return (this.Invert ? 1 : -1) * this.Rotation.AngleMin * this.segExtension;
	}
	/**
	 * Gets the absolute extension as an angle
	 * @returns {float} - Extension converted to angle
	 */
	 get extensionAngleAbsolute() {
		let ang = this.extensionAngle;
		if (this.segParent) ang += this.segParent.extensionAngle;
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