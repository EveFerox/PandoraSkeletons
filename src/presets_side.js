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
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
		], // Priority
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
		"Breasts", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "Chest"},
		], // Priority
		["Body"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/Breasts.png', // Path
		"Chest", // Parent
		false, // Invert
		{
			PivotX: 100,
			PivotY: 230,
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
		80, // PriorityFallback
		'img/BodySide/Head.png', // Path
		"Chest", // Parent
		false, // Invert
		{
			PivotX: 88,
			PivotY: 155,
			ParentX: -30,
			ParentY: -190,
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
			{rule: PriorityRule.ABOVE, seg: "Legs"},
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
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.YOKED)},
		));
	skelly.segments.push(new BodySegment(
		"ForeArmR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "ArmR"},
			{rule: PriorityRule.BELOW, seg: "Torso", condition: (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
			{rule: PriorityRule.ABOVE, seg: "RightLeg", condition: (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
		], // Priority
		["RightArm"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ForeArmR.png', // Path
		"ArmR", // Parent
		false, // Invert
		{
			PivotX: 14,
			PivotY: 71,
			ParentX: 161,
			ParentY: 5,
		}, {
			AngleMax: 3.3,
			AngleMin: -3.3,
			TranslateXPos: -110,
			TranslateYPos: 0,
			TranslateXNeg: 1,
			TranslateYNeg: -2,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.BOXTIE)},
		));
	skelly.segments.push(new BodySegment(
		"HandR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "ForeArmR"},
			{rule: PriorityRule.BELOW, seg: "Torso", condition: (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
			{rule: PriorityRule.ABOVE, seg: "RightLeg", condition: (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
		], // Priority
		["RightArm"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/HandOpenR.png', // Path
		"ForeArmR", // Parent
		false, // Invert
		{
			PivotX: 9,
			PivotY: 32,
			ParentX: 89,
			ParentY: -1,
		}, {
			AngleMax: 0.2,
			AngleMin: -0.2,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.BOXTIE) || Skeleton.PoseTags.includes(PoseTag.FIST_RIGHT) || !(Skeleton.get("ForeArmR") && Skeleton.get("ForeArmR").visible)},
		));

	skelly.segments.push(new BodySegment(
		"FistR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "ForeArmR"},
			{rule: PriorityRule.BELOW, seg: "Torso", condition: (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
			{rule: PriorityRule.ABOVE, seg: "RightLeg", condition: (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
		], // Priority
		["RightArm"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/HandFistR.png', // Path
		"ForeArmR", // Parent
		false, // Invert
		{
			PivotX: 9,
			PivotY: 28,
			ParentX: 89,
			ParentY: 0,
		}, {
			AngleMax: 0.2,
			AngleMin: -0.2,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.BOXTIE) || !Skeleton.PoseTags.includes(PoseTag.FIST_RIGHT) || !(Skeleton.get("ForeArmR") && Skeleton.get("ForeArmR").visible)},
		));

	skelly.segments.push(new BodySegment(
		"ArmL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Body"},
		], // Priority
		["RightArm"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ArmL.png', // Path
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
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.YOKED)},
		));
	skelly.segments.push(new BodySegment(
		"ForeArmL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "ArmL"},
    		{rule: PriorityRule.BELOW, seg: "Legs"},
		], // Priority
		["LeftArm"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/ForeArmL.png', // Path
		"ArmL", // Parent
		false, // Invert
		{
			PivotX: 14,
			PivotY: 71,
			ParentX: 161,
			ParentY: 5,
		}, {
			AngleMax: 3.3,
			AngleMin: -3.3,
			TranslateXPos: -80,
			TranslateYPos: 0,
			TranslateXNeg: 1,
			TranslateYNeg: -2,
		},
		(Skeleton) => {Skeleton.PoseTags.includes(PoseTag.BOXTIE)},
		));
	skelly.segments.push(new BodySegment(
		"HandL", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmL"},
    		{rule: PriorityRule.BELOW, seg: "Legs"},
		], // Priority
		["LeftArm"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/HandOpenL.png', // Path
		"ForeArmL", // Parent
		false, // Invert
		{
			PivotX: 13,
			PivotY: 32,
			ParentX: 89,
			ParentY: 2,
		}, {
			AngleMax: 0.2,
			AngleMin: -0.2,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.BOXTIE) || Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL") && Skeleton.get("ForeArmL").visible)},
		));

	skelly.segments.push(new BodySegment(
		"FistL", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmL"},
    		{rule: PriorityRule.BELOW, seg: "Legs"},
		], // Priority
		["LeftArm"], // PriorityTag
		80, // PriorityFallback
		'img/BodySide/HandFistL.png', // Path
		"ForeArmL", // Parent
		false, // Invert
		{
			PivotX: 9,
			PivotY: 28,
			ParentX: 87,
			ParentY: -1,
		}, {
			AngleMax: 0.2,
			AngleMin: -0.2,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.BOXTIE) || !Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL") && Skeleton.get("ForeArmL").visible)},
		));


	skelly.segments.push(new BodySegment(
		"ThighR", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "Torso"},
			{rule: PriorityRule.ABOVE, seg: "LeftLeg"},
		], // Priority
		["RightLeg", "Thighs", "Legs"], // PriorityTag
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
		["RightLeg", "Shins", "Legs"], // PriorityTag
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
		["RightLeg", "Feet", "Legs"], // PriorityTag
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
			AngleMax: 0.3,
			AngleMin: -0.3,
			TranslateXPos: 3,
			TranslateYPos: -5,
			TranslateXNeg: -3,
			TranslateYNeg: -5,
		}));

	skelly.segments.push(new BodySegment(
		"ThighL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
		], // Priority
		["LeftLeg", "Thighs", "Legs"], // PriorityTag
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
		["LeftLeg", "Shins", "Legs"], // PriorityTag
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
		["LeftLeg", "Feet", "Legs"], // PriorityTag
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
			AngleMax: 0.3,
			AngleMin: -0.3,
			TranslateXPos: 3,
			TranslateYPos: -5,
			TranslateXNeg: -3,
			TranslateYNeg: -5,
		}));

	skelly.assignParents();

}


function generateSideOutfit(skelly) {

	//... outfits go here

	skelly.assignParents();
}