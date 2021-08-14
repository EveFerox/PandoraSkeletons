import { BodySkeleton, BodySegment, PriorityRule, PoseTag } from './skeleton';

export function GenerateSideBody(skelly: BodySkeleton): void {
	skelly.segments.push(new BodySegment(
		'Torso', // Name
		[], // Priority
		['Body'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/Torso.png', // Path
		'', // Parent
		false, // Invert
		{
			pivotX: 100,
			pivotY: 30,
			parentX: 0,
			parentY: 0,
		},
		{
			angleMax: 0,
			angleMin: 0,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		'Chest', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Torso' },
		], // Priority
		['Body'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/Chest.png', // Path
		'Torso', // Parent
		false, // Invert
		{
			pivotX: 100,
			pivotY: 230,
			parentX: 0,
			parentY: 35,
		},
		{
			angleMax: 0.1,
			angleMin: -0.1,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		}));

	skelly.segments.push(new BodySegment(
		'Breasts', // Name
		[
			{ rule: PriorityRule.ABOVE, seg: 'Chest' },
		], // Priority
		['Body'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/Breasts.png', // Path
		'Chest', // Parent
		false, // Invert
		{
			pivotX: 100,
			pivotY: 230,
			parentX: 0,
			parentY: 0,
		},
		{
			angleMax: 0,
			angleMin: 0,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		}));

	skelly.segments.push(new BodySegment(
		'Head', // Name
		[
			{ rule: PriorityRule.ABOVE, seg: 'Chest' },
		], // Priority
		[], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/Head.png', // Path
		'Chest', // Parent
		false, // Invert
		{
			pivotX: 88,
			pivotY: 155,
			parentX: -30,
			parentY: -190,
		},
		{
			angleMax: 0.1,
			angleMin: -0.1,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		}));

	skelly.segments.push(new BodySegment(
		'ArmR', // Name
		[
			{ rule: PriorityRule.ABOVE, seg: 'Legs' },
		], // Priority
		['RightArm'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ArmR.png', // Path
		'Chest', // Parent
		false, // Invert
		{
			pivotX: 42,
			pivotY: 44,
			parentX: -30,
			parentY: -140,
		},
		{
			angleMax: 2.7,
			angleMin: -1.8,
			translateXPos: -10,
			translateYPos: 0,
			translateXNeg: -10,
			translateYNeg: -5,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.YOKED);
		},
	));
	skelly.segments.push(new BodySegment(
		'ForeArmR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'ArmR' },
			{
				rule: PriorityRule.BELOW, seg: 'Torso', condition: (skeleton: BodySkeleton) => {
					return skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);
				},
			},
			{
				rule: PriorityRule.ABOVE, seg: 'RightLeg', condition: (skeleton: BodySkeleton) => {
					return !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);
				},
			},
		], // Priority
		['RightArm'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ForeArmR.png', // Path
		'ArmR', // Parent
		false, // Invert
		{
			pivotX: 14,
			pivotY: 71,
			parentX: 161,
			parentY: 5,
		},
		{
			angleMax: 3.3,
			angleMin: -3.3,
			translateXPos: -110,
			translateYPos: 0,
			translateXNeg: 1,
			translateYNeg: -2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.BOXTIE);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'ForeArmR' },
			{
				rule: PriorityRule.BELOW, seg: 'Torso', condition: (skeleton: BodySkeleton) => {
					return skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);
				},
			},
			{
				rule: PriorityRule.ABOVE, seg: 'RightLeg', condition: (skeleton: BodySkeleton) => {
					return !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);
				},
			},
		], // Priority
		['RightArm'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/HandOpenR.png', // Path
		'ForeArmR', // Parent
		false, // Invert
		{
			pivotX: 9,
			pivotY: 32,
			parentX: 89,
			parentY: -1,
		},
		{
			angleMax: 0.2,
			angleMin: -0.2,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.BOXTIE) ||
				skeleton.poseTags.includes(PoseTag.FIST_RIGHT) ||
				!(skeleton.get('ForeArmR') && skeleton.get('ForeArmR').visible);
		},
	));

	skelly.segments.push(new BodySegment(
		'FistR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'ForeArmR' },
			{
				rule: PriorityRule.BELOW, seg: 'Torso', condition: (skeleton: BodySkeleton) => {
					return skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);
				},
			},
			{
				rule: PriorityRule.ABOVE, seg: 'RightLeg', condition: (skeleton: BodySkeleton) => {
					return !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);
				},
			},
		], // Priority
		['RightArm'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/HandFistR.png', // Path
		'ForeArmR', // Parent
		false, // Invert
		{
			pivotX: 9,
			pivotY: 28,
			parentX: 89,
			parentY: 0,
		},
		{
			angleMax: 0.2,
			angleMin: -0.2,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.BOXTIE) ||
				!skeleton.poseTags.includes(PoseTag.FIST_RIGHT) ||
				!(skeleton.get('ForeArmR') && skeleton.get('ForeArmR').visible);
		},
	));

	skelly.segments.push(new BodySegment(
		'ArmL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
		], // Priority
		['RightArm'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ArmL.png', // Path
		'Chest', // Parent
		false, // Invert
		{
			pivotX: 42,
			pivotY: 44,
			parentX: -30,
			parentY: -140,
		},
		{
			angleMax: 2.7,
			angleMin: -1.8,
			translateXPos: -10,
			translateYPos: 0,
			translateXNeg: -10,
			translateYNeg: -5,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.YOKED);
		},
	));
	skelly.segments.push(new BodySegment(
		'ForeArmL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'ArmL' },
			{ rule: PriorityRule.BELOW, seg: 'Legs' },
		], // Priority
		['LeftArm'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ForeArmL.png', // Path
		'ArmL', // Parent
		false, // Invert
		{
			pivotX: 14,
			pivotY: 71,
			parentX: 161,
			parentY: 5,
		},
		{
			angleMax: 3.3,
			angleMin: -3.3,
			translateXPos: -110,
			translateYPos: 0,
			translateXNeg: 1,
			translateYNeg: -2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.BOXTIE);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandL', // Name
		[
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmL' },
			{ rule: PriorityRule.BELOW, seg: 'Legs' },
		], // Priority
		['LeftArm'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/HandOpenL.png', // Path
		'ForeArmL', // Parent
		false, // Invert
		{
			pivotX: 13,
			pivotY: 32,
			parentX: 89,
			parentY: 2,
		},
		{
			angleMax: 0.2,
			angleMin: -0.2,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.BOXTIE) ||
				skeleton.poseTags.includes(PoseTag.FIST_LEFT) ||
				!(skeleton.get('ForeArmL') && skeleton.get('ForeArmL').visible);
		},
	));

	skelly.segments.push(new BodySegment(
		'FistL', // Name
		[
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmL' },
			{ rule: PriorityRule.BELOW, seg: 'Legs' },
		], // Priority
		['LeftArm'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/HandFistL.png', // Path
		'ForeArmL', // Parent
		false, // Invert
		{
			pivotX: 9,
			pivotY: 28,
			parentX: 87,
			parentY: -1,
		},
		{
			angleMax: 0.2,
			angleMin: -0.2,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.BOXTIE) ||
				!skeleton.poseTags.includes(PoseTag.FIST_LEFT) ||
				!(skeleton.get('ForeArmL') && skeleton.get('ForeArmL').visible);
		},
	));

	skelly.segments.push(new BodySegment(
		'ThighR', // Name
		[
			{ rule: PriorityRule.ABOVE, seg: 'Torso' },
			{ rule: PriorityRule.ABOVE, seg: 'LeftLeg' },
		], // Priority
		['RightLeg', 'Thighs', 'Legs'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ThighR.png', // Path
		'Torso', // Parent
		false, // Invert
		{
			pivotX: 63,
			pivotY: 60,
			parentX: -22,
			parentY: 115,
		},
		{
			angleMax: 0.7,
			angleMin: -0.7,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		'ShinR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'ThighR' },
			{ rule: PriorityRule.ABOVE, seg: 'LeftLeg' },
		], // Priority
		['RightLeg', 'Shins', 'Legs'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ShinR.png', // Path
		'ThighR', // Parent
		false, // Invert
		{
			pivotX: 84,
			pivotY: 50,
			parentX: -10,
			parentY: 190,
		},
		{
			angleMax: 2.3,
			angleMin: 0,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		'FootR', // Name
		[
			{ rule: PriorityRule.ABOVE, seg: 'ShinR' },
			{ rule: PriorityRule.ABOVE, seg: 'LeftLeg' },
		], // Priority
		['RightLeg', 'Feet', 'Legs'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/FootR.png', // Path
		'ShinR', // Parent
		false, // Invert
		{
			pivotX: 58,
			pivotY: 16,
			parentX: -17,
			parentY: 220,
		},
		{
			angleMax: 0.3,
			angleMin: -0.3,
			translateXPos: 3,
			translateYPos: -5,
			translateXNeg: -3,
			translateYNeg: -5,
		}));

	skelly.segments.push(new BodySegment(
		'ThighL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Torso' },
		], // Priority
		['LeftLeg', 'Thighs', 'Legs'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ThighL.png', // Path
		'Torso', // Parent
		false, // Invert
		{
			pivotX: 63,
			pivotY: 60,
			parentX: -22,
			parentY: 115,
		},
		{
			angleMax: 0.7,
			angleMin: -0.7,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		'ShinL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Torso' },
			{ rule: PriorityRule.BELOW, seg: 'ThighL' },
		], // Priority
		['LeftLeg', 'Shins', 'Legs'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ShinL.png', // Path
		'ThighL', // Parent
		false, // Invert
		{
			pivotX: 84,
			pivotY: 50,
			parentX: -10,
			parentY: 190,
		},
		{
			angleMax: 2.3,
			angleMin: 0,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		'FootL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Torso' },
			{ rule: PriorityRule.ABOVE, seg: 'ShinL' },
		], // Priority
		['LeftLeg', 'Feet', 'Legs'], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/FootL.png', // Path
		'ShinL', // Parent
		false, // Invert
		{
			pivotX: 58,
			pivotY: 16,
			parentX: -17,
			parentY: 220,
		},
		{
			angleMax: 0.3,
			angleMin: -0.3,
			translateXPos: 3,
			translateYPos: -5,
			translateXNeg: -3,
			translateYNeg: -5,
		}));

	skelly.assignParents();
}

export function GenerateSideOutfit(skelly: BodySkeleton): void {

	//... outfits go here

	skelly.assignParents();
}
