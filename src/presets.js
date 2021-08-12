function generateStandardBody(skelly) {
	skelly.segments.push(new BodySegment(
		"Torso", // Name
		[], // Priority
		["Body"], // PriorityTag
		80, // PriorityFallback
		'img/BodyFront/Torso.png', // Path
		"", // Parent
		false, // Invert
		{
			PivotX: 100,
			PivotY: 200,
			ParentX: 0,
			ParentY: 0,
		}, {
			AngleMax: 0,
			AngleMin: 0,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		"Chest", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "Torso"},
		], // Priority
		["Body"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/Chest.png', // Path
		"Torso", // Parent
		false, // Invert
		{
			PivotX: 100,
			PivotY: 191,
			ParentX: 0,
			ParentY: -162,
		}, {
			AngleMax: 0.1,
			AngleMin: -0.1,
			TranslateXPos: 0,
			TranslateYPos: 5,
			TranslateXNeg: 0,
			TranslateYNeg: 5,
		}));

	skelly.segments.push(new BodySegment(
		"Breasts", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "Chest"},
		], // Priority
		["Body"], // PriorityTag
		102, // PriorityFallback
		'img/BodyFront/Breasts.png', // Path
		"Chest", // Parent
		false, // Invert
		{
			PivotX: 100,
			PivotY: 191,
			ParentX: 0,
			ParentY: 0,
		}, {
			AngleMax: 0,
			AngleMin: 0,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		"Head", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "Chest"},
		], // Priority
		[], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/Head.png', // Path
		"Chest", // Parent
		false, // Invert
		{
			PivotX: 86,
			PivotY: 155,
			ParentX: 0,
			ParentY: -175,
		}, {
			AngleMax: 0.2,
			AngleMin: -0.2,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		}));


	// ............. //
	// ............. //
	// ............. //
	// ARMS/SHOULDER //
	// ............. //
	// ............. //
	// ............. //
	skelly.segments.push(new BodySegment(
		"ShoulderL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
		], // Priority
		["Arms", "UpperArms"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/ShoulderL.png', // Path
		"Chest", // Parent
		false, // Invert
		{
			PivotX: 70,
			PivotY: 70,
			ParentX: 58,
			ParentY: -255 + 162,
		}, {
			AngleMax: 1.65,
			AngleMin: -0.75,
			TranslateXPos: -20,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: -5,
		}, null, {
			Parent: "ArmL",
			Mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		"ShoulderR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
		], // Priority
		["Arms", "UpperArms"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/ShoulderR.png', // Path
		"Chest", // Parent
		true, // Invert
		{
			PivotX: 70,
			PivotY: 70,
			ParentX: 58,
			ParentY: -255 + 162,
		}, {
			AngleMax: 1.65,
			AngleMin: -0.75,
			TranslateXPos: -20,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: -5,
		}, null, {
			Parent: "ArmR",
			Mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		"ArmL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.ABOVE, seg: "ShoulderL"},
		], // Priority
		["Arms", "UpperArms"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/ArmL.png', // Path
		"Chest", // Parent
		false, // Invert
		{
			PivotX: 0,
			PivotY: 35,
			ParentX: 57,
			ParentY: -270 + 162,
		}, {
			AngleMax: 1.85,
			AngleMin: -1,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: -10,
			TranslateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		"ArmR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.ABOVE, seg: "ShoulderR"},
		], // Priority
		["Arms", "UpperArms"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/ArmR.png', // Path
		"Chest", // Parent
		true, // Invert
		{
			PivotX: 340,
			PivotY: 35,
			ParentX: 57,
			ParentY: -270 + 162,
		}, {
			AngleMax: 1.85,
			AngleMin: -1,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: -10,
			TranslateYNeg: 0,}));
	skelly.segments.push(new BodySegment(
		"ForeArmL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.BELOW, seg: "Legs"},
			{rule: PriorityRule.ABOVE, seg: "ArmL"},
		], // Priority
		["Arms", "ForeArms"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/ForeArmL.png', // Path
		"ArmL", // Parent
		false, // Invert
		{
			PivotX: 4,
			PivotY: 16,
			ParentX: 132,
			ParentY: -22,
		}, {
			AngleMax: 2,
			AngleMin: -2,
			TranslateXPos: 41,
			TranslateYPos: 14,
			TranslateXNeg: -10,
			TranslateYNeg: 15,
			hideExtAbove: 0.3,
			hideExtBelow: -0.2,}));
	skelly.segments.push(new BodySegment(
		"ForeArmR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.BELOW, seg: "Legs"},
			{rule: PriorityRule.ABOVE, seg: "ArmR"},
		], // Priority
		["Arms", "ForeArms"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/ForeArmR.png', // Path
		"ArmR", // Parent
		true, // Invert
		{
			PivotX: 236,
			PivotY: 16,
			ParentX: 132,
			ParentY: -22,
		}, {
			AngleMax: 2,
			AngleMin: -2,
			TranslateXPos: 41,
			TranslateYPos: 14,
			TranslateXNeg: -10,
			TranslateYNeg: 15,
			hideExtAbove: 0.3,
			hideExtBelow: -0.2,}));

	// ............. //
	// ............. //
	// ............. //
	//    FOREARMS   //
	// ............. //
	// ............. //
	// ............. //
	skelly.segments.push(new BodySegment(
		"ForeArmL_back", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Legs", condition: (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_LEFT);}},
			{rule: PriorityRule.ABOVE, seg: "Body", condition: (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_LEFT);}},
			{rule: PriorityRule.ABOVE, seg: "ArmL"},
		], // Priority
		["Arms", "ForeArms"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/ForeArmL_back.png', // Path
		"ArmL", // Parent
		false, // Invert
		{
			PivotX: 4,
			PivotY: 61,
			ParentX: 132,
			ParentY: -22,
		}, {
			AngleMax: 2,
			AngleMin: 0,
			TranslateXPos: 21,
			TranslateYPos: 7,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			hideExtBelow: 0.3
		}, null, {
			Parent: "ForeArmL",
			Mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		"ForeArmR_back", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Legs", condition: (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
			{rule: PriorityRule.ABOVE, seg: "Body", condition: (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
			{rule: PriorityRule.ABOVE, seg: "ArmR"},
		], // Priority
		["Arms", "ForeArms"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/ForeArmR_back.png', // Path
		"ArmR", // Parent
		true, // Invert
		{
			PivotX: 196,
			PivotY: 61,
			ParentX: 135,
			ParentY: -22,
		}, {
			AngleMax: 2,
			AngleMin: 0,
			TranslateXPos: 21,
			TranslateYPos: 7,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			hideExtBelow: 0.3,
		}, null, {
			Parent: "ForeArmR",
			Mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		"ForeArmL_front", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Legs", condition: (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_LEFT);}},
			{rule: PriorityRule.ABOVE, seg: "Body", condition: (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_LEFT);}},
			{rule: PriorityRule.ABOVE, seg: "ArmL"},
		], // Priority
		["Arms", "ForeArms"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/ForeArmL_front.png', // Path
		"ArmL", // Parent
		false, // Invert
		{
			PivotX: 4,
			PivotY: 61,
			ParentX: 132,
			ParentY: -18,
		}, {
			AngleMax: 0,
			AngleMin: -2,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 14,
			hideExtAbove: -0.2,
		}, null, {
			Parent: "ForeArmL",
			Mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		"ForeArmR_front", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Legs", condition: (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
			{rule: PriorityRule.ABOVE, seg: "Body", condition: (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
			{rule: PriorityRule.ABOVE, seg: "ArmR"},
		], // Priority
		["Arms", "ForeArms"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/ForeArmR_front.png', // Path
		"ArmR", // Parent
		true, // Invert
		{
			PivotX: 196,
			PivotY: 61,
			ParentX: 132,
			ParentY: -18,
		}, {
			AngleMax: 0,
			AngleMin: -2,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 14,
			hideExtAbove: -0.2,
		}, null, {
			Parent: "ForeArmR",
			Mult: 1,
		}));


	// ............. //
	// ............. //
	// ............. //
	// HAND AND FIST //
	// ............. //
	// ............. //
	// ............. //
	skelly.segments.push(new BodySegment(
		"HandSideL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.BELOW, seg: "Legs"},
			{rule: PriorityRule.ABOVE, seg: "ForeArmL"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HandSideL.png', // Path
		"ForeArmL", // Parent
		false, // Invert
		{
			PivotX: 3,
			PivotY: 30,
			ParentX: 95,
			ParentY: 7,
		}, {
			AngleMax: -0.2,
			AngleMin: -0.2,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL") && Skeleton.get("ForeArmL").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandSideR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.BELOW, seg: "Legs"},
			{rule: PriorityRule.ABOVE, seg: "ForeArmR"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HandSideR.png', // Path
		"ForeArmR", // Parent
		true, // Invert
		{
			PivotX: 147,
			PivotY: 30,
			ParentX: 95,
			ParentY: 7,
		}, {
			AngleMax: -0.2,
			AngleMin: -0.2,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.FIST_RIGHT) || !(Skeleton.get("ForeArmR") && Skeleton.get("ForeArmR").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandSideFistL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.BELOW, seg: "Legs"},
			{rule: PriorityRule.ABOVE, seg: "ForeArmL"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HandSideFistL.png', // Path
		"ForeArmL", // Parent
		false, // Invert
		{
			PivotX: 3,
			PivotY: 30,
			ParentX: 95,
			ParentY: 6,
		}, {
			AngleMax: -0.2,
			AngleMin: -0.2,
		},
		(Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL") && Skeleton.get("ForeArmL").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandSideFistR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.BELOW, seg: "Legs"},
			{rule: PriorityRule.ABOVE, seg: "ForeArmR"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HandSideFistR.png', // Path
		"ForeArmR", // Parent
		true, // Invert
		{
			PivotX: 147,
			PivotY: 30,
			ParentX: 95,
			ParentY: 6,
		}, {
			AngleMax: -0.2,
			AngleMin: -0.2,
		},
		(Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.FIST_RIGHT) || !(Skeleton.get("ForeArmR") && Skeleton.get("ForeArmR").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandBackFistL", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmL_back"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HandBackFistL.png', // Path
		"ForeArmL_back", // Parent
		false, // Invert
		{
			PivotX: 9,
			PivotY: 28,
			ParentX: 95,
			ParentY: 7,
		}, {
			AngleMax: -0.2,
			AngleMin: -0.2,
		},
		(Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL_back") && Skeleton.get("ForeArmL_back").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandBackFistR", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmR_back"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HandBackFistR.png', // Path
		"ForeArmR_back", // Parent
		true, // Invert
		{
			PivotX: 141,
			PivotY: 28,
			ParentX: 95,
			ParentY: 7,
		}, {
			AngleMax: -0.2,
			AngleMin: -0.2,
		},
		(Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.FIST_RIGHT) || !(Skeleton.get("ForeArmR_back") && Skeleton.get("ForeArmR_back").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandFrontFistL", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmL_front"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HandFrontFistL.png', // Path
		"ForeArmL_front", // Parent
		false, // Invert
		{
			PivotX: 9,
			PivotY: 28,
			ParentX: 95,
			ParentY: 8,
		}, {
			AngleMax: -0.2,
			AngleMin: -0.2,
		},
		(Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL_front") && Skeleton.get("ForeArmL_front").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandFrontFistR", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmR_front"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HandFrontFistR.png', // Path
		"ForeArmR_front", // Parent
		true, // Invert
		{
			PivotX: 141,
			PivotY: 28,
			ParentX: 95,
			ParentY: 8,
		}, {
			AngleMax: -0.2,
			AngleMin: -0.2,
		},
		(Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.FIST_RIGHT) || !(Skeleton.get("ForeArmR_front") && Skeleton.get("ForeArmR_front").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandBackOpenL", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmL_back"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HandBackOpenL.png', // Path
		"ForeArmL_back", // Parent
		false, // Invert
		{
			PivotX: 3,
			PivotY: 27,
			ParentX: 95,
			ParentY: 11,
		}, {
			AngleMax: -0.2,
			AngleMin: -0.2,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL_back") && Skeleton.get("ForeArmL_back").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandBackOpenR", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmR_back"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HandBackOpenR.png', // Path
		"ForeArmR_back", // Parent
		true, // Invert
		{
			PivotX: 147,
			PivotY: 27,
			ParentX: 95,
			ParentY: 11,
		}, {
			AngleMax: -0.2,
			AngleMin: -0.2,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.FIST_RIGHT) || !(Skeleton.get("ForeArmR_back") && Skeleton.get("ForeArmR_back").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandFrontOpenL", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmL_back"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HandFrontOpenL.png', // Path
		"ForeArmL_front", // Parent
		false, // Invert
		{
			PivotX: 2,
			PivotY: 72,
			ParentX: 80,
			ParentY: 11,
		}, {
			AngleMax: -0.2,
			AngleMin: -0.2,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL_front") && Skeleton.get("ForeArmL_front").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandFrontOpenR", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmR_back"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HandFrontOpenR.png', // Path
		"ForeArmR_front", // Parent
		true, // Invert
		{
			PivotX: 116,
			PivotY: 72,
			ParentX: 80,
			ParentY: 11,
		}, {
			AngleMax: -0.2,
			AngleMin: -0.2,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.FIST_RIGHT) || !(Skeleton.get("ForeArmR_front") && Skeleton.get("ForeArmR_front").visible)},
		));
	// ............. //
	// ............. //
	// ............. //
	// LEGS AND HIPS //
	// ............. //
	// ............. //
	// ............. //
	skelly.segments.push(new BodySegment(
		"HipL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
		], // Priority
		["Legs", "Thighs"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/HipL.png', // Path
		"Torso", // Parent
		false, // Invert
		{
			PivotX: 51,
			PivotY: 60,
			ParentX: 8,
			ParentY: -50,
		}, {
			AngleMax: 0.03,
			AngleMin: -1.4,
		}, null, {
			Parent: "LegL",
			Mult: 0.15,
		}));
	skelly.segments.push(new BodySegment(
		"HipR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
		], // Priority
		["Legs", "Thighs"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/HipR.png', // Path
		"Torso", // Parent
		true, // Invert
		{
			PivotX: 99,
			PivotY: 60,
			ParentX: 8,
			ParentY: -50,
		}, {
			AngleMax: 0.03,
			AngleMin: -1.4,
		}, null, {
			Parent: "LegR",
			Mult: 0.15,
		}));
	skelly.segments.push(new BodySegment(
		"LegL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.ABOVE, seg: "HipL"},
		], // Priority
		["Legs", "Thighs"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/LegL.png', // Path
		"Torso", // Parent
		false, // Invert
		{
			PivotX: 2,
			PivotY: 0,
			ParentX: 8,
			ParentY: -20,
		}, {
			AngleMax: 0.03,
			AngleMin: -1,
		}, (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.KNEEL_LEFT);},));
	skelly.segments.push(new BodySegment(
		"LegR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.ABOVE, seg: "HipR"},
		], // Priority
		["Legs", "Thighs"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/LegR.png', // Path
		"Torso", // Parent
		true, // Invert
		{
			PivotX: 92,
			PivotY: 0,
			ParentX: 8,
			ParentY: -20,
		}, {
			AngleMax: 0.03,
			AngleMin: -1,
		}, (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.KNEEL_RIGHT);},));
	skelly.segments.push(new BodySegment(
		"LegKneelL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.ABOVE, seg: "HipL"},
		], // Priority
		["Legs", "Thighs"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/LegKneelL.png', // Path
		"Torso", // Parent
		false, // Invert
		{
			PivotX: 2,
			PivotY: 0,
			ParentX: 8,
			ParentY: -20,
		}, {
			AngleMax: 0.085,
			AngleMin: -1,
		}, (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.KNEEL_LEFT);},
		{
			Parent: "LegL",
			Mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		"LegKneelR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.ABOVE, seg: "HipR"},
		], // Priority
		["Legs", "Thighs"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/LegKneelR.png', // Path
		"Torso", // Parent
		true, // Invert
		{
			PivotX: 92,
			PivotY: 0,
			ParentX: 8,
			ParentY: -20,
		}, {
			AngleMax: 0.085,
			AngleMin: -1,
		}, (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.KNEEL_RIGHT);},
		{
			Parent: "LegR",
			Mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		"FootL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.ABOVE, seg: "LegL"},
		], // Priority
		["Legs", "Feet"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/FootL.png', // Path
		"LegL", // Parent
		false, // Invert
		{
			PivotX: 10,
			PivotY: 0,
			ParentX: 10,
			ParentY: 380,
		}, {
			AngleMax: 0.3,
			AngleMin: -0.03,
			TranslateXPos: 1,
		}, (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.KNEEL_LEFT) || Skeleton.PoseTags.includes(PoseTag.TIPTOE_LEFT);},
		{
			Parent: "LegL",
			Mult: -1,
			MultNegative: -3.33,
		}));
	skelly.segments.push(new BodySegment(
		"FootR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.ABOVE, seg: "LegR"},
		], // Priority
		["Legs", "Feet"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/FootR.png', // Path
		"LegR", // Parent
		true, // Invert
		{
			PivotX: 84,
			PivotY: 0,
			ParentX: 10,
			ParentY: 380,
		}, {
			AngleMax: 0.3,
			AngleMin: -0.03,
			TranslateXPos: 1,
		}, (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.KNEEL_RIGHT) || Skeleton.PoseTags.includes(PoseTag.TIPTOE_RIGHT);},
		{
			Parent: "LegL",
			Mult: -1,
			MultNegative: -3.33,
		}));
	skelly.segments.push(new BodySegment(
		"FootTiptoeL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.ABOVE, seg: "LegL"},
		], // Priority
		["Legs", "Feet"], // PriorityTag
		100, // PriorityFallback
		'img/BodyFront/FootTiptoeL.png', // Path
		"LegL", // Parent
		false, // Invert
		{
			PivotX: 10,
			PivotY: 0,
			ParentX: 10,
			ParentY: 380,
		}, {
			AngleMax: 0.3,
			AngleMin: -0.03,
			TranslateXPos: 1,
		}, (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.KNEEL_LEFT) || !Skeleton.PoseTags.includes(PoseTag.TIPTOE_LEFT);},
		{
			Parent: "LegL",
			Mult: -1,
			MultNegative: -3.33,
		}));
	skelly.segments.push(new BodySegment(
		"FootTiptoeR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
			{rule: PriorityRule.ABOVE, seg: "LegR"},
		], // Priority
		["Legs", "Feet"], // PriorityTag
		101, // PriorityFallback
		'img/BodyFront/FootTiptoeR.png', // Path
		"LegR", // Parent
		true, // Invert
		{
			PivotX: 85,
			PivotY: 0,
			ParentX: 10,
			ParentY: 380,
		}, {
			AngleMax: 0.3,
			AngleMin: -0.03,
			TranslateXPos: 1,
		}, (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.KNEEL_RIGHT) || !Skeleton.PoseTags.includes(PoseTag.TIPTOE_RIGHT);},
		{
			Parent: "LegR",
			Mult: -1,
			MultNegative: -3.33,
		}));

	skelly.assignParents();
}

function generateSideBody(skelly) {
	skelly.segments.push(new BodySegment(
		"Torso", // Name
		[], // Priority
		["Body"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/Torso.png', // Path
		"", // Parent
		false, // Invert
		{
			PivotX: 100,
			PivotY: 30,
			ParentX: 0,
			ParentY: 0,
		}, {
			AngleMax: 0,
			AngleMin: 0,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		"Chest", // Name
		[], // Priority
		["Body"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/Chest.png', // Path
		"Torso", // Parent
		false, // Invert
		{
			PivotX: 100,
			PivotY: 230,
			ParentX: 0,
			ParentY: 35,
		}, {
			AngleMax: 0.1,
			AngleMin: -0.1,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		}));



	skelly.segments.push(new BodySegment(
		"ArmR", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ShoulderR"},
		], // Priority
		["RightArm"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ArmR.png', // Path
		"Chest", // Parent
		false, // Invert
		{
			PivotX: 42,
			PivotY: 44,
			ParentX: -30,
			ParentY: -140,
		}, {
			AngleMax: 2.7,
			AngleMin: -1.8,
			TranslateXPos: -10,
			TranslateYPos: 0,
			TranslateXNeg: -10,
			TranslateYNeg: -5,
		}));


	skelly.segments.push(new BodySegment(
		"ThighR", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "Torso"},
			{rule: PriorityRule.ABOVE, seg: "LeftLeg"},
		], // Priority
		["RightLeg", "Thighs"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ThighR.png', // Path
		"Torso", // Parent
		false, // Invert
		{
			PivotX: 63,
			PivotY: 60,
			ParentX: -22,
			ParentY: 115,
		}, {
			AngleMax: 0.7,
			AngleMin: -0.7,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		"ShinR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "ThighR"},
			{rule: PriorityRule.ABOVE, seg: "LeftLeg"},
		], // Priority
		["RightLeg", "Shins"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ShinR.png', // Path
		"ThighR", // Parent
		false, // Invert
		{
			PivotX: 84,
			PivotY: 50,
			ParentX: -10,
			ParentY: 190,
		}, {
			AngleMax: 2.3,
			AngleMin: 0,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		"FootR", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ShinR"},
			{rule: PriorityRule.ABOVE, seg: "LeftLeg"},
		], // Priority
		["RightLeg", "Feet"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/FootR.png', // Path
		"ShinR", // Parent
		false, // Invert
		{
			PivotX: 58,
			PivotY: 16,
			ParentX: -17,
			ParentY: 220,
		}, {
			AngleMax: 2.3,
			AngleMin: 0,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		}));

	skelly.segments.push(new BodySegment(
		"ThighL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
		], // Priority
		["LeftLeg", "Thighs"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ThighL.png', // Path
		"Torso", // Parent
		false, // Invert
		{
			PivotX: 63,
			PivotY: 60,
			ParentX: -22,
			ParentY: 115,
		}, {
			AngleMax: 0.7,
			AngleMin: -0.7,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		"ShinL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
			{rule: PriorityRule.BELOW, seg: "ThighL"},
		], // Priority
		["LeftLeg", "Shins"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ShinL.png', // Path
		"ThighL", // Parent
		false, // Invert
		{
			PivotX: 84,
			PivotY: 50,
			ParentX: -10,
			ParentY: 190,
		}, {
			AngleMax: 2.3,
			AngleMin: 0,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		}));
	skelly.segments.push(new BodySegment(
		"FootL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
			{rule: PriorityRule.ABOVE, seg: "ShinL"},
		], // Priority
		["LeftLeg", "Feet"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/FootL.png', // Path
		"ShinL", // Parent
		false, // Invert
		{
			PivotX: 58,
			PivotY: 16,
			ParentX: -17,
			ParentY: 220,
		}, {
			AngleMax: 2.3,
			AngleMin: 0,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		}));

	skelly.assignParents();

}


function generateStandardOutfit(skelly) {

	//... outfits go here

	skelly.assignParents();
}