import { BodySkeleton, BodySegment, PriorityRule, PoseTag } from './skeleton';

export function GenerateStandardBody(skelly: BodySkeleton): void {
	skelly.segments.push(new BodySegment(
		'Torso', // Name
		[], // Priority
		['Body'], // PriorityTag
		80, // PriorityFallback
		'img/BodyFront/Torso.png', // Path
		'', // Parent
		false, // Invert
		{
			pivotX: 100,
			pivotY: 200,
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
			{ rule: PriorityRule.ABOVE, seg: 'Torso' },
		], // Priority
		['Body'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/Chest.png', // Path
		'Torso', // Parent
		false, // Invert
		{
			pivotX: 100,
			pivotY: 191,
			parentX: 0,
			parentY: -162,
		},
		{
			angleMax: 0.1,
			angleMin: -0.1,
			translateXPos: 0,
			translateYPos: 5,
			translateXNeg: 0,
			translateYNeg: 5,
		}));

	skelly.segments.push(new BodySegment(
		'Breasts', // Name
		[
			{ rule: PriorityRule.ABOVE, seg: 'Chest' },
		], // Priority
		['Body'], // PriorityTag
		102, // PriorityFallback
		'img/BodyFront/Breasts.png', // Path
		'Chest', // Parent
		false, // Invert
		{
			pivotX: 100,
			pivotY: 191,
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
		101, // PriorityFallback
		'img/BodyFront/Head.png', // Path
		'Chest', // Parent
		false, // Invert
		{
			pivotX: 86,
			pivotY: 155,
			parentX: 0,
			parentY: -175,
		},
		{
			angleMax: 0.2,
			angleMin: -0.2,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 0,
		}));

	// ............. //
	// ............. //
	// ............. //
	// ARMS/SHOULDER //
	// ............. //
	// ............. //
	// ............. //
	skelly.segments.push(new BodySegment(
		'ShoulderL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
		], // Priority
		['Arms', 'UpperArms'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/ShoulderL.png', // Path
		'Chest', // Parent
		false, // Invert
		{
			pivotX: 70,
			pivotY: 70,
			parentX: 58,
			parentY: -255 + 162,
		},
		{
			angleMax: 1.65,
			angleMin: -0.75,
			translateXPos: -20,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: -5,
		},
		undefined,
		{
			parent: 'ArmL',
			mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		'ShoulderR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
		], // Priority
		['Arms', 'UpperArms'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/ShoulderR.png', // Path
		'Chest', // Parent
		true, // Invert
		{
			pivotX: 70,
			pivotY: 70,
			parentX: 58,
			parentY: -255 + 162,
		},
		{
			angleMax: 1.65,
			angleMin: -0.75,
			translateXPos: -20,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: -5,
		},
		undefined,
		{
			parent: 'ArmR',
			mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		'ArmL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_LEFT) },
			{ rule: PriorityRule.ABOVE, seg: 'Chest', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_LEFT) },
			{ rule: PriorityRule.BELOW, seg: 'Breasts' },
			{ rule: PriorityRule.ABOVE, seg: 'ShoulderL' },
		], // Priority
		['Arms', 'UpperArms'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/ArmL.png', // Path
		'Chest', // Parent
		false, // Invert
		{
			pivotX: 0,
			pivotY: 35,
			parentX: 57,
			parentY: -270 + 162,
		},
		{
			angleMax: 1.85,
			angleMin: -1,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: -10,
			translateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		'ArmR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Chest', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.BELOW, seg: 'Breasts' },
			{ rule: PriorityRule.ABOVE, seg: 'ShoulderR' },
		], // Priority
		['Arms', 'UpperArms'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/ArmR.png', // Path
		'Chest', // Parent
		true, // Invert
		{
			pivotX: 340,
			pivotY: 35,
			parentX: 57,
			parentY: -270 + 162,
		},
		{
			angleMax: 1.85,
			angleMin: -1,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: -10,
			translateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		'ForeArmL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Chest', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ArmL' },
		], // Priority
		['Arms', 'ForeArms'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/ForeArmL.png', // Path
		'ArmL', // Parent
		false, // Invert
		{
			pivotX: 4,
			pivotY: 16,
			parentX: 132,
			parentY: -22,
		},
		{
			angleMax: 2.75,
			angleMin: -2,
			translateXPos: 41,
			translateYPos: 14,
			translateXNeg: -10,
			translateYNeg: 15,
			hideExtAbove: 0.2,
			hideExtBelow: -0.2,
		}));
	skelly.segments.push(new BodySegment(
		'ForeArmR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Chest', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ArmR' },
		], // Priority
		['Arms', 'ForeArms'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/ForeArmR.png', // Path
		'ArmR', // Parent
		true, // Invert
		{
			pivotX: 236,
			pivotY: 16,
			parentX: 132,
			parentY: -22,
		},
		{
			angleMax: 2.75,
			angleMin: -2,
			translateXPos: 41,
			translateYPos: 14,
			translateXNeg: -10,
			translateYNeg: 15,
			hideExtAbove: 0.2,
			hideExtBelow: -0.2,
		}));

	// ............. //
	// ............. //
	// ............. //
	//    FOREARMS   //
	// ............. //
	// ............. //
	// ............. //
	skelly.segments.push(new BodySegment(
		'ForeArmL_back', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_LEFT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_LEFT) },
			{ rule: PriorityRule.ABOVE, seg: 'ArmL' },
		], // Priority
		['Arms', 'ForeArms'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/ForeArmL_back.png', // Path
		'ArmL', // Parent
		false, // Invert
		{
			pivotX: 4,
			pivotY: 61,
			parentX: 132,
			parentY: -22,
		},
		{
			angleMax: 2.75,
			angleMin: 0,
			translateXPos: 25,
			translateYPos: 19,
			translateXNeg: 0,
			translateYNeg: 0,
			hideExtBelow: 0.2,
		},
		undefined,
		{
			parent: 'ForeArmL',
			mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		'ForeArmR_back', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ArmR' },
		], // Priority
		['Arms', 'ForeArms'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/ForeArmR_back.png', // Path
		'ArmR', // Parent
		true, // Invert
		{
			pivotX: 196,
			pivotY: 61,
			parentX: 135,
			parentY: -22,
		},
		{
			angleMax: 2.75,
			angleMin: 0,
			translateXPos: 25,
			translateYPos: 19,
			translateXNeg: 0,
			translateYNeg: 0,
			hideExtBelow: 0.2,
		},
		undefined,
		{
			parent: 'ForeArmR',
			mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		'ForeArmL_front', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_LEFT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_LEFT) },
			{ rule: PriorityRule.ABOVE, seg: 'ArmL' },
		], // Priority
		['Arms', 'ForeArms'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/ForeArmL_front.png', // Path
		'ArmL', // Parent
		false, // Invert
		{
			pivotX: 4,
			pivotY: 61,
			parentX: 132,
			parentY: -18,
		},
		{
			angleMax: 0,
			angleMin: -2,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 14,
			hideExtAbove: -0.2,
		},
		undefined,
		{
			parent: 'ForeArmL',
			mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		'ForeArmR_front', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ArmR' },
		], // Priority
		['Arms', 'ForeArms'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/ForeArmR_front.png', // Path
		'ArmR', // Parent
		true, // Invert
		{
			pivotX: 196,
			pivotY: 61,
			parentX: 132,
			parentY: -18,
		},
		{
			angleMax: 0,
			angleMin: -2,
			translateXPos: 0,
			translateYPos: 0,
			translateXNeg: 0,
			translateYNeg: 14,
			hideExtAbove: -0.2,
		},
		undefined,
		{
			parent: 'ForeArmR',
			mult: 1,
		}));
	// ............. //
	// ............. //
	// ............. //
	// HAND AND FIST //
	// ............. //
	// ............. //
	// ............. //
	skelly.segments.push(new BodySegment(
		'HandSideL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmL' },
		], // Priority
		['Arms', 'Hands'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HandSideL.png', // Path
		'ForeArmL', // Parent
		false, // Invert
		{
			pivotX: 3,
			pivotY: 30,
			parentX: 95,
			parentY: 7,
		},
		{
			angleMax: -0.2,
			angleMin: -0.2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.REVERSEPRAYER_LEFT) ||
				skeleton.poseTags.includes(PoseTag.FIST_LEFT) ||
				!(skeleton.get('ForeArmL') && skeleton.get('ForeArmL').visible);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandSideR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmR' },
		], // Priority
		['Arms', 'Hands'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HandSideR.png', // Path
		'ForeArmR', // Parent
		true, // Invert
		{
			pivotX: 147,
			pivotY: 30,
			parentX: 95,
			parentY: 7,
		},
		{
			angleMax: -0.2,
			angleMin: -0.2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.REVERSEPRAYER_RIGHT) ||
				skeleton.poseTags.includes(PoseTag.FIST_RIGHT) ||
				!(skeleton.get('ForeArmR') && skeleton.get('ForeArmR').visible);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandSideFistL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmL' },
		], // Priority
		['Arms', 'Hands'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HandSideFistL.png', // Path
		'ForeArmL', // Parent
		false, // Invert
		{
			pivotX: 3,
			pivotY: 30,
			parentX: 95,
			parentY: 6,
		},
		{
			angleMax: -0.2,
			angleMin: -0.2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.REVERSEPRAYER_LEFT) ||
				!skeleton.poseTags.includes(PoseTag.FIST_LEFT) ||
				!(skeleton.get('ForeArmL') && skeleton.get('ForeArmL').visible);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandSideFistR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmR' },
		], // Priority
		['Arms', 'Hands'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HandSideFistR.png', // Path
		'ForeArmR', // Parent
		true, // Invert
		{
			pivotX: 147,
			pivotY: 30,
			parentX: 95,
			parentY: 6,
		},
		{
			angleMax: -0.2,
			angleMin: -0.2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.REVERSEPRAYER_RIGHT) ||
				!skeleton.poseTags.includes(PoseTag.FIST_RIGHT) ||
				!(skeleton.get('ForeArmR') && skeleton.get('ForeArmR').visible);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandBackFistL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmL_back' },
		], // Priority
		['Arms', 'Hands'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HandBackFistL.png', // Path
		'ForeArmL_back', // Parent
		false, // Invert
		{
			pivotX: 9,
			pivotY: 28,
			parentX: 95,
			parentY: 7,
		},
		{
			angleMax: -0.2,
			angleMin: -0.2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.REVERSEPRAYER_LEFT) ||
				!skeleton.poseTags.includes(PoseTag.FIST_LEFT) ||
				!(skeleton.get('ForeArmL_back') && skeleton.get('ForeArmL_back').visible);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandBackFistR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmR_back' },
		], // Priority
		['Arms', 'Hands'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HandBackFistR.png', // Path
		'ForeArmR_back', // Parent
		true, // Invert
		{
			pivotX: 141,
			pivotY: 28,
			parentX: 95,
			parentY: 7,
		},
		{
			angleMax: -0.2,
			angleMin: -0.2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.REVERSEPRAYER_RIGHT) ||
				!skeleton.poseTags.includes(PoseTag.FIST_RIGHT) ||
				!(skeleton.get('ForeArmR_back') && skeleton.get('ForeArmR_back').visible);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandFrontFistL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmL_front' },
		], // Priority
		['Arms', 'Hands'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HandFrontFistL.png', // Path
		'ForeArmL_front', // Parent
		false, // Invert
		{
			pivotX: 9,
			pivotY: 28,
			parentX: 95,
			parentY: 8,
		},
		{
			angleMax: -0.2,
			angleMin: -0.2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.REVERSEPRAYER_LEFT) ||
				!skeleton.poseTags.includes(PoseTag.FIST_LEFT) ||
				!(skeleton.get('ForeArmL_front') && skeleton.get('ForeArmL_front').visible);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandFrontFistR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmR_front' },
		], // Priority
		['Arms', 'Hands'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HandFrontFistR.png', // Path
		'ForeArmR_front', // Parent
		true, // Invert
		{
			pivotX: 141,
			pivotY: 28,
			parentX: 95,
			parentY: 8,
		},
		{
			angleMax: -0.2,
			angleMin: -0.2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.REVERSEPRAYER_RIGHT) ||
				!skeleton.poseTags.includes(PoseTag.FIST_RIGHT) ||
				!(skeleton.get('ForeArmR_front') && skeleton.get('ForeArmR_front').visible);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandBackOpenL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmL_back' },
		], // Priority
		['Arms', 'Hands'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HandBackOpenL.png', // Path
		'ForeArmL_back', // Parent
		false, // Invert
		{
			pivotX: 3,
			pivotY: 27,
			parentX: 95,
			parentY: 11,
		},
		{
			angleMax: -0.2,
			angleMin: -0.2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.REVERSEPRAYER_LEFT) ||
				skeleton.poseTags.includes(PoseTag.FIST_LEFT) ||
				!(skeleton.get('ForeArmL_back') && skeleton.get('ForeArmL_back').visible);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandBackOpenR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmR_back' },
		], // Priority
		['Arms', 'Hands'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HandBackOpenR.png', // Path
		'ForeArmR_back', // Parent
		true, // Invert
		{
			pivotX: 147,
			pivotY: 27,
			parentX: 95,
			parentY: 11,
		},
		{
			angleMax: -0.2,
			angleMin: -0.2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.REVERSEPRAYER_RIGHT) ||
				skeleton.poseTags.includes(PoseTag.FIST_RIGHT) ||
				!(skeleton.get('ForeArmR_back') && skeleton.get('ForeArmR_back').visible);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandFrontOpenL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmL_back' },
		], // Priority
		['Arms', 'Hands'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HandFrontOpenL.png', // Path
		'ForeArmL_front', // Parent
		false, // Invert
		{
			pivotX: 13,
			pivotY: 27,
			parentX: 89,
			parentY: 8,
		},
		{
			angleMax: -0.2,
			angleMin: -0.2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.REVERSEPRAYER_LEFT) ||
				skeleton.poseTags.includes(PoseTag.FIST_LEFT) ||
				!(skeleton.get('ForeArmL_front') && skeleton.get('ForeArmL_front').visible);
		},
	));
	skelly.segments.push(new BodySegment(
		'HandFrontOpenR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Legs', condition: (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'Body', condition: (skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT) },
			{ rule: PriorityRule.ABOVE, seg: 'ForeArmR_back' },
		], // Priority
		['Arms', 'Hands'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HandFrontOpenR.png', // Path
		'ForeArmR_front', // Parent
		true, // Invert
		{
			pivotX: 137,
			pivotY: 27,
			parentX: 89,
			parentY: 8,
		},
		{
			angleMax: -0.2,
			angleMin: -0.2,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.REVERSEPRAYER_RIGHT) ||
				skeleton.poseTags.includes(PoseTag.FIST_RIGHT) ||
				!(skeleton.get('ForeArmR_front') && skeleton.get('ForeArmR_front').visible);
		},
	));
	// ............. //
	// ............. //
	// ............. //
	// LEGS AND HIPS //
	// ............. //
	// ............. //
	// ............. //
	skelly.segments.push(new BodySegment(
		'HipL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
		], // Priority
		['Legs', 'Thighs'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HipL.png', // Path
		'Torso', // Parent
		false, // Invert
		{
			pivotX: 51,
			pivotY: 60,
			parentX: 8,
			parentY: -50,
		},
		{
			angleMax: 0.03,
			angleMin: -1.4,
		},
		undefined,
		{
			parent: 'LegL',
			mult: 0.15,
		}));
	skelly.segments.push(new BodySegment(
		'HipR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
		], // Priority
		['Legs', 'Thighs'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HipR.png', // Path
		'Torso', // Parent
		true, // Invert
		{
			pivotX: 99,
			pivotY: 60,
			parentX: 8,
			parentY: -50,
		},
		{
			angleMax: 0.03,
			angleMin: -1.4,
		},
		undefined,
		{
			parent: 'LegR',
			mult: 0.15,
		}));
	skelly.segments.push(new BodySegment(
		'LegL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
			{ rule: PriorityRule.ABOVE, seg: 'HipL' },
		], // Priority
		['Legs', 'Thighs'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/LegL.png', // Path
		'Torso', // Parent
		false, // Invert
		{
			pivotX: 2,
			pivotY: 0,
			parentX: 8,
			parentY: -20,
		},
		{
			angleMax: 0.03,
			angleMin: -1,
		},
		(skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.KNEEL_LEFT)
	));
	skelly.segments.push(new BodySegment(
		'LegR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
			{ rule: PriorityRule.ABOVE, seg: 'HipR' },
		], // Priority
		['Legs', 'Thighs'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/LegR.png', // Path
		'Torso', // Parent
		true, // Invert
		{
			pivotX: 92,
			pivotY: 0,
			parentX: 8,
			parentY: -20,
		},
		{
			angleMax: 0.03,
			angleMin: -1,
		}, (skeleton: BodySkeleton) => skeleton.poseTags.includes(PoseTag.KNEEL_RIGHT)
	));
	skelly.segments.push(new BodySegment(
		'LegKneelL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
			{ rule: PriorityRule.ABOVE, seg: 'HipL' },
		], // Priority
		['Legs', 'Thighs'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/LegKneelL.png', // Path
		'Torso', // Parent
		false, // Invert
		{
			pivotX: 2,
			pivotY: 0,
			parentX: 8,
			parentY: -20,
		},
		{
			angleMax: 0.085,
			angleMin: -1,
		},
		(skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.KNEEL_LEFT),
		{
			parent: 'LegL',
			mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		'LegKneelR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
			{ rule: PriorityRule.ABOVE, seg: 'HipR' },
		], // Priority
		['Legs', 'Thighs'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/LegKneelR.png', // Path
		'Torso', // Parent
		true, // Invert
		{
			pivotX: 92,
			pivotY: 0,
			parentX: 8,
			parentY: -20,
		},
		{
			angleMax: 0.085,
			angleMin: -1,
		},
		(skeleton: BodySkeleton) => !skeleton.poseTags.includes(PoseTag.KNEEL_RIGHT),
		{
			parent: 'LegR',
			mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		'FootL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
			{ rule: PriorityRule.ABOVE, seg: 'LegL' },
		], // Priority
		['Legs', 'Feet'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/FootL.png', // Path
		'LegL', // Parent
		false, // Invert
		{
			pivotX: 10,
			pivotY: 0,
			parentX: 10,
			parentY: 380,
		},
		{
			angleMax: 0.3,
			angleMin: -0.03,
			translateXPos: 1,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.KNEEL_LEFT) ||
				skeleton.poseTags.includes(PoseTag.TIPTOE_LEFT);
		},
		{
			parent: 'LegL',
			mult: -1,
			multNegative: -3.33,
		}));
	skelly.segments.push(new BodySegment(
		'FootR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
			{ rule: PriorityRule.ABOVE, seg: 'LegR' },
		], // Priority
		['Legs', 'Feet'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/FootR.png', // Path
		'LegR', // Parent
		true, // Invert
		{
			pivotX: 84,
			pivotY: 0,
			parentX: 10,
			parentY: 380,
		},
		{
			angleMax: 0.3,
			angleMin: -0.03,
			translateXPos: 1,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.KNEEL_RIGHT) ||
				skeleton.poseTags.includes(PoseTag.TIPTOE_RIGHT);
		},
		{
			parent: 'LegL',
			mult: -1,
			multNegative: -3.33,
		}));
	skelly.segments.push(new BodySegment(
		'FootTiptoeL', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
			{ rule: PriorityRule.ABOVE, seg: 'LegL' },
		], // Priority
		['Legs', 'Feet'], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/FootTiptoeL.png', // Path
		'LegL', // Parent
		false, // Invert
		{
			pivotX: 10,
			pivotY: 0,
			parentX: 10,
			parentY: 380,
		},
		{
			angleMax: 0.3,
			angleMin: -0.03,
			translateXPos: 1,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.KNEEL_LEFT) ||
				!skeleton.poseTags.includes(PoseTag.TIPTOE_LEFT);
		},
		{
			parent: 'LegL',
			mult: -1,
			multNegative: -3.33,
		}));
	skelly.segments.push(new BodySegment(
		'FootTiptoeR', // Name
		[
			{ rule: PriorityRule.BELOW, seg: 'Body' },
			{ rule: PriorityRule.ABOVE, seg: 'LegR' },
		], // Priority
		['Legs', 'Feet'], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/FootTiptoeR.png', // Path
		'LegR', // Parent
		true, // Invert
		{
			pivotX: 85,
			pivotY: 0,
			parentX: 10,
			parentY: 380,
		},
		{
			angleMax: 0.3,
			angleMin: -0.03,
			translateXPos: 1,
		},
		(skeleton: BodySkeleton) => {
			return skeleton.poseTags.includes(PoseTag.KNEEL_RIGHT) ||
				!skeleton.poseTags.includes(PoseTag.TIPTOE_RIGHT);
		},
		{
			parent: 'LegR',
			mult: -1,
			multNegative: -3.33,
		}));

	skelly.assignParents();
}

export function GenerateStandardOutfit(skelly: BodySkeleton): void {

	//... outfits go here

	skelly.assignParents();
}
