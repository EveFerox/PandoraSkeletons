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
	skelly.segments.push(new BodySegment("Torso", 0, 'img/Body.png', "", false,
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
	skelly.segments.push(new BodySegment("ShoulderL", 100, 'img/ShoulderL.png', "Torso", false,
		{
			PivotX: 70,
			PivotY: 70,
			ParentX: 58,
			ParentY: -255,
		}, {
			AngleMax: 1.05,
			AngleMin: -0.75,
			TranslateXPos: 10,
			TranslateYPos: 0,
			TranslateXNeg: -7,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		}, {
			Parent: "ArmR",
			Mult: 0.75,
		}));
	skelly.segments.push(new BodySegment("ShoulderR", 100, 'img/ShoulderR.png', "Torso", true,
		{
			PivotX: 70,
			PivotY: 70,
			ParentX: 58,
			ParentY: -255,
		}, {
			AngleMax: 1.05,
			AngleMin: -0.75,
			TranslateXPos: 0,
			TranslateYPos: 0,
			TranslateXNeg: 0,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,
		}, {
			Parent: "ArmR",
			Mult: 0.75,
		}));
	skelly.segments.push(new BodySegment("ArmL", 200, 'img/ArmL.png', "Torso", false,
		{
			PivotX: 0,
			PivotY: 30,
			ParentX: 70,
			ParentY: -275,
		}, {
			AngleMax: 1.4,
			AngleMin: -1,
			TranslateXPos: 10,
			TranslateYPos: 0,
			TranslateXNeg: -7,
			TranslateYNeg: 0,
			SquashXPos: 0,
			SquashYPos: 0,
			SquashXNeg: 0,
			SquashYNeg: 0,}));
	skelly.segments.push(new BodySegment("ArmR", 200, 'img/ArmR.png', "Torso", true,
		{
			PivotX: 340,
			PivotY: 30,
			ParentX: 70,
			ParentY: -275,
		}, {
			AngleMax: 1.4,
			AngleMin: -1,
			TranslateXPos: 10,
			TranslateYPos: 0,
			TranslateXNeg: -7,
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
	
	// Listen for animate update
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
}
