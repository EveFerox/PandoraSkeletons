"use strict";

var app = null;
var circleDraw = null;
var skelly = null;
var skellies = [];

function LauncherLaunchGame(width, height) {

	const app = new PIXI.Application({
		width: width, height: height, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
	});
	document.body.appendChild(app.view);

	skelly = new BodySkeleton();
	skelly.segments.push(new BodySegment(
		"Torso", // Name
		[], // Priority
		["Torso"], // PriorityTag
		100, // PriorityFallback
		'img/Body.png', // Path
		"", // Parent
		false, // Invert
		{
			PivotX: 500,
			PivotY: 500,
			ParentX: 0,
			ParentY: 0,
		}, {
			AngleMax: 0,
			AngleMin: 0,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,}));


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
			{rule: PriorityRule.BELOW, seg: "Torso"},
		], // Priority
		["Arms", "UpperArms"], // PriorityTag
		100, // PriorityFallback
		'img/ShoulderL.png', // Path
		"Torso", // Parent
		false, // Invert
		{
			PivotX: 70,
			PivotY: 70,
			ParentX: 58,
			ParentY: -255,
		}, {
			AngleMax: 1.45,
			AngleMin: -0.75,
			TranslateXPos: -5,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: -5,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		}, null, {
			Parent: "ArmL",
			Mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		"ShoulderR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
		], // Priority
		["Arms", "UpperArms"], // PriorityTag
		100, // PriorityFallback
		'img/ShoulderR.png', // Path
		"Torso", // Parent
		true, // Invert
		{
			PivotX: 70,
			PivotY: 70,
			ParentX: 58,
			ParentY: -255,
		}, {
			AngleMax: 1.45,
			AngleMin: -0.75,
			TranslateXPos: -5,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: -5,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		}, null, {
			Parent: "ArmR",
			Mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		"ArmL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
			{rule: PriorityRule.ABOVE, seg: "ShoulderL"},
		], // Priority
		["Arms", "UpperArms"], // PriorityTag
		100, // PriorityFallback
		'img/ArmL.png', // Path
		"Torso", // Parent
		false, // Invert
		{
			PivotX: 0,
			PivotY: 30,
			ParentX: 60,
			ParentY: -275,
		}, {
			AngleMax: 1.65,
			AngleMin: -1,
			TranslateXPos: 15,
			TranslateYPos: 0,
			TranslateXNeg: -10,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,}));
	skelly.segments.push(new BodySegment(
		"ArmR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
			{rule: PriorityRule.ABOVE, seg: "ShoulderR"},
		], // Priority
		["Arms", "UpperArms"], // PriorityTag
		100, // PriorityFallback
		'img/ArmR.png', // Path
		"Torso", // Parent
		true, // Invert
		{
			PivotX: 340,
			PivotY: 30,
			ParentX: 60,
			ParentY: -275,
		}, {
			AngleMax: 1.65,
			AngleMin: -1,
			TranslateXPos: 15,
			TranslateYPos: 0,
			TranslateXNeg: -10,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,}));
	skelly.segments.push(new BodySegment(
		"ForeArmL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
			{rule: PriorityRule.BELOW, seg: "Legs"},
			{rule: PriorityRule.ABOVE, seg: "ArmL"},
		], // Priority
		["Arms", "ForeArms"], // PriorityTag
		100, // PriorityFallback
		'img/ForeArmL.png', // Path
		"ArmL", // Parent
		false, // Invert
		{
			PivotX: 4,
			PivotY: 16,
			ParentX: 132,
			ParentY: -17,
		}, {
			AngleMax: 1.7,
			AngleMin: -2,
			TranslateXPos: 21,
			TranslateYPos: 7,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
			hideExtAbove: 0.3,
			hideExtBelow: -0.1,}));
	skelly.segments.push(new BodySegment(
		"ForeArmR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
			{rule: PriorityRule.BELOW, seg: "Legs"},
			{rule: PriorityRule.ABOVE, seg: "ArmR"},
		], // Priority
		["Arms", "ForeArms"], // PriorityTag
		100, // PriorityFallback
		'img/ForeArmR.png', // Path
		"ArmR", // Parent
		true, // Invert
		{
			PivotX: 236,
			PivotY: 16,
			ParentX: 132,
			ParentY: -17,
		}, {
			AngleMax: 1.7,
			AngleMin: -2,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
			hideExtAbove: 0.3,
			hideExtBelow: -0.1,}));

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
			{rule: PriorityRule.ABOVE, seg: "Torso", condition: (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_LEFT);}},
			{rule: PriorityRule.ABOVE, seg: "ArmL"},
		], // Priority
		["Arms", "ForeArms"], // PriorityTag
		100, // PriorityFallback
		'img/ForeArmL_back.png', // Path
		"ArmL", // Parent
		false, // Invert
		{
			PivotX: 4,
			PivotY: 61,
			ParentX: 132,
			ParentY: -17,
		}, {
			AngleMax: 1.7,
			AngleMin: 0,
			TranslateXPos: 21,
			TranslateYPos: 7,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
			hideExtBelow: 0.3
		}, null, {
			Parent: "ForeArmL",
			Mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		"ForeArmR_back", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Legs", condition: (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
			{rule: PriorityRule.ABOVE, seg: "Torso", condition: (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
			{rule: PriorityRule.ABOVE, seg: "ArmR"},
		], // Priority
		["Arms", "ForeArms"], // PriorityTag
		100, // PriorityFallback
		'img/ForeArmR_back.png', // Path
		"ArmR", // Parent
		true, // Invert
		{
			PivotX: 196,
			PivotY: 61,
			ParentX: 135,
			ParentY: -20,
		}, {
			AngleMax: 1.7,
			AngleMin: 0,
			TranslateXPos: 21,
			TranslateYPos: 7,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
			hideExtBelow: 0.3,
		}, null, {
			Parent: "ForeArmR",
			Mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		"ForeArmL_front", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Legs", condition: (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_LEFT);}},
			{rule: PriorityRule.ABOVE, seg: "Torso", condition: (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_LEFT);}},
			{rule: PriorityRule.ABOVE, seg: "ArmL"},
		], // Priority
		["Arms", "ForeArms"], // PriorityTag
		100, // PriorityFallback
		'img/ForeArmL_front.png', // Path
		"ArmL", // Parent
		false, // Invert
		{
			PivotX: 4,
			PivotY: 61,
			ParentX: 132,
			ParentY: -13,
		}, {
			AngleMax: 0,
			AngleMin: -2,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 14,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
			hideExtAbove: -0.1,
		}, null, {
			Parent: "ForeArmL",
			Mult: 1,
		}));
	skelly.segments.push(new BodySegment(
		"ForeArmR_front", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Legs", condition: (Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
			{rule: PriorityRule.ABOVE, seg: "Torso", condition: (Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.HANDBEHINDBACK_RIGHT);}},
			{rule: PriorityRule.ABOVE, seg: "ArmR"},
		], // Priority
		["Arms", "ForeArms"], // PriorityTag
		100, // PriorityFallback
		'img/ForeArmR_front.png', // Path
		"ArmR", // Parent
		true, // Invert
		{
			PivotX: 196,
			PivotY: 61,
			ParentX: 132,
			ParentY: -13,
		}, {
			AngleMax: 0,
			AngleMin: -2,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 14,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
			hideExtAbove: -0.1,
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
			{rule: PriorityRule.BELOW, seg: "Torso"},
			{rule: PriorityRule.BELOW, seg: "Legs"},
			{rule: PriorityRule.ABOVE, seg: "ForeArmL"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/HandSideL.png', // Path
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
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL") && Skeleton.get("ForeArmL").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandSideR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
			{rule: PriorityRule.BELOW, seg: "Legs"},
			{rule: PriorityRule.ABOVE, seg: "ForeArmR"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/HandSideR.png', // Path
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
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.FIST_RIGHT) || !(Skeleton.get("ForeArmR") && Skeleton.get("ForeArmR").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandSideFistL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
			{rule: PriorityRule.BELOW, seg: "Legs"},
			{rule: PriorityRule.ABOVE, seg: "ForeArmL"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/HandSideFistL.png', // Path
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
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		},
		(Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL") && Skeleton.get("ForeArmL").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandSideFistR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
			{rule: PriorityRule.BELOW, seg: "Legs"},
			{rule: PriorityRule.ABOVE, seg: "ForeArmR"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/HandSideFistR.png', // Path
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
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
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
		'img/HandBackFistL.png', // Path
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
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		},
		(Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL_back") && Skeleton.get("ForeArmL_back").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandBackFistR", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmR_back"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/HandBackFistR.png', // Path
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
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
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
		'img/HandFrontFistL.png', // Path
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
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		},
		(Skeleton) => {return !Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL_front") && Skeleton.get("ForeArmL_front").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandFrontFistR", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmR_front"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/HandFrontFistR.png', // Path
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
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
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
		'img/HandBackOpenL.png', // Path
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
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL_back") && Skeleton.get("ForeArmL_back").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandBackOpenR", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmR_back"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/HandBackOpenR.png', // Path
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
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
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
		'img/HandFrontOpenL.png', // Path
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
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		},
		(Skeleton) => {return Skeleton.PoseTags.includes(PoseTag.FIST_LEFT) || !(Skeleton.get("ForeArmL_front") && Skeleton.get("ForeArmL_front").visible)},
		));
	skelly.segments.push(new BodySegment(
		"HandFrontOpenR", // Name
		[
			{rule: PriorityRule.ABOVE, seg: "ForeArmR_back"},
		], // Priority
		["Arms", "Hands"], // PriorityTag
		100, // PriorityFallback
		'img/HandFrontOpenR.png', // Path
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
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
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
			{rule: PriorityRule.BELOW, seg: "Torso"},
		], // Priority
		["Legs", "Thighs"], // PriorityTag
		100, // PriorityFallback
		'img/HipL.png', // Path
		"Torso", // Parent
		false, // Invert
		{
			PivotX: 51,
			PivotY: 60,
			ParentX: 8,
			ParentY: -50,
		}, {
			AngleMax: 0.04,
			AngleMin: -1.4,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		}, null, {
			Parent: "LegL",
			Mult: 0.15,
		}));
	skelly.segments.push(new BodySegment(
		"HipR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
		], // Priority
		["Legs", "Thighs"], // PriorityTag
		100, // PriorityFallback
		'img/HipR.png', // Path
		"Torso", // Parent
		true, // Invert
		{
			PivotX: 99,
			PivotY: 60,
			ParentX: 8,
			ParentY: -50,
		}, {
			AngleMax: 0.04,
			AngleMin: -1.4,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		}, null, {
			Parent: "LegR",
			Mult: 0.15,
		}));
	skelly.segments.push(new BodySegment(
		"LegL", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
			{rule: PriorityRule.ABOVE, seg: "HipL"},
		], // Priority
		["Legs", "Thighs"], // PriorityTag
		100, // PriorityFallback
		'img/LegL.png', // Path
		"Torso", // Parent
		false, // Invert
		{
			PivotX: 2,
			PivotY: 0,
			ParentX: 8,
			ParentY: -20,
		}, {
			AngleMax: 0.04,
			AngleMin: -1,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,}));
	skelly.segments.push(new BodySegment(
		"LegR", // Name
		[
			{rule: PriorityRule.BELOW, seg: "Torso"},
			{rule: PriorityRule.ABOVE, seg: "HipR"},
		], // Priority
		["Legs", "Thighs"], // PriorityTag
		100, // PriorityFallback
		'img/LegR.png', // Path
		"Torso", // Parent
		true, // Invert
		{
			PivotX: 92,
			PivotY: 0,
			ParentX: 8,
			ParentY: -20,
		}, {
			AngleMax: 0.04,
			AngleMin: -1,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,}));

	skelly.assignParents();
	skellies.push({skeleton: skelly, graphics: new SkeletonContainer(skelly)})

	const container_body = skellies[0].graphics.container;
	app.stage.addChild(container_body);

	container_body.x = app.screen.width / 2;
	container_body.y = app.screen.height / 2;

	/*
	// Create a new texture
	const texture_body = PIXI.Texture.from('img/Body.png');
	const texture_shoulderR = PIXI.Texture.from('img/ShoulderR.png');
	const texture_armR = PIXI.Texture.from('img/ArmR.png');
	const texture_shoulderL = PIXI.Texture.from('img/ShoulderL.png');
	const texture_armL = PIXI.Texture.from('img/ArmL.png');

	// Create the body
	const body = new PIXI.Sprite(texture_body);
	body.anchor.set(0.5);
	body.x = 0;
	body.y = 0;
	container_body.addChild(container_shoulderL);
	container_body.addChild(container_armL);
	container_body.addChild(container_shoulderR);
	container_body.addChild(container_armR);
	container_body.addChild(body);

	const shoulderL = new PIXI.Sprite(texture_shoulderL);
	//shoulder.anchor.set(0.5);
	shoulderL.x = -70;
	shoulderL.y = -70;
	container_shoulderL.addChild(shoulderL);

	const armL = new PIXI.Sprite(texture_armL);
	//arm.anchor.set(0.5);
	armL.x = 0;
	armL.y = -30;
	container_armL.addChild(armL);

	const shoulderR = new PIXI.Sprite(texture_shoulderR);
	//shoulder.anchor.set(0.5);
	shoulderR.x = -70;
	shoulderR.y = -70;
	container_shoulderR.addChild(shoulderR);

	const armR = new PIXI.Sprite(texture_armR);
	//arm.anchor.set(0.5);
	armR.x = -340;
	armR.y = -30;
	container_armR.addChild(armR);

	// Move container to the center
	container_body.x = app.screen.width / 2;
	container_body.y = app.screen.height / 2;
	container_shoulderL.x = 58;
	container_shoulderL.y = -255;
	container_armL.x = 70;
	container_armL.y = -275;
	container_shoulderR.x = -58;
	container_shoulderR.y = -255;
	container_armR.x = -70;
	container_armR.y = -275;


	// Center bunny sprite in local container coordinates
	//container_body.pivot.x = container_body.width / 2;
	//container_body.pivot.y = container_body.height / 2;

	var amountmax = 1.4;
	var amountmin = -1;
	var currentMode = false;

	app.ticker.add((delta) => {
		// rotate the container!
		// use delta to create frame-independent transform
		if (currentMode) {
			container_armL.rotation -= 0.01 * delta;
		} else {
			container_armL.rotation += 0.01 * delta;
		}
		if (container_armL.rotation > amountmax) currentMode = !currentMode;
		if (container_armL.rotation < amountmin) currentMode = !currentMode;

		container_shoulderL.rotation = container_armL.rotation*.75;
		container_armL.x = 60 + 15*(container_armL.rotation/amountmax);

		container_armR.rotation = -container_armL.rotation;
		container_shoulderR.rotation = container_armR.rotation*.75;
		container_armR.x = -60 - 15*(-container_armR.rotation/amountmax);
	});
	*/

	var currentMode = false;
	var currentMode2 = false;
	var currentMode3 = false;

	// Listen for animate update
	app.ticker.add((delta) => {
		// Make changes to the skeleton
		let change = 0.005;
		if (currentMode) change = -0.005;
		let extension = 0;

		extension = skelly.get("ArmL").extension;
		skelly.get("ArmL").setExtension(extension + change * delta);
		extension = skelly.get("ArmR").extension;
		skelly.get("ArmR").setExtension(extension + change * delta);

		if (extension >= 1) currentMode = true;
		if (extension <= -1) currentMode = false;

		change = 0.0025;
		if (currentMode3) change = -0.0025;


		extension = skelly.get("ForeArmL").extension;
		skelly.get("ForeArmL").setExtension(extension - change * delta);
		extension = skelly.get("ForeArmR").extension;
		skelly.get("ForeArmR").setExtension(extension + change * delta);

		if (extension >= 1) currentMode3 = true;
		if (extension <= -1) currentMode3 = false;


		// Make changes to the skeleton
		change = 0.005;
		if (currentMode2) change = -0.005;
		extension = 0;

		extension = skelly.get("LegL").extension;
		skelly.get("LegL").setExtension(extension + change * delta);
		extension = skelly.get("LegR").extension;
		skelly.get("LegR").setExtension(extension + change * delta);
		if (extension >= 1) currentMode2 = true;
		if (extension <= -1) currentMode2 = false;




		// update all graphics to represent changes to skeletons
		for (let L = 0; L < skellies.length; L++) {
			skellies[L].graphics.updateExtension();
		}
	});
}
