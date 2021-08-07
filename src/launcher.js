"use strict";

var app = null;
var circleDraw = null;
var skelly = null;
var skellyContainer = null;
var skellies = [];
var animation = true;

function LauncherLaunchGame(width, height) {

	app = new PIXI.Application({
		width: width, height: height, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
	});
	document.body.appendChild(app.view);

	skelly = new BodySkeleton();
	generateStandardBody(skelly);
	generateStandardOutfit(skelly);

	skellies.push({skeleton: skelly, graphics: new SkeletonContainer(skelly)})

	const container_body = skellies[0].graphics.container;
	app.stage.addChild(container_body);

	container_body.x = app.screen.width / 2;
	container_body.y = app.screen.height / 2;

	createTestButtons(); // Creates buttons to test thge skeleton

	var currentMode = false;
	var currentMode2 = false;
	var currentMode3 = false;

	// Listen for animate update
	app.ticker.add((delta) => {
		if (animation) {
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
		}

		// update all graphics to represent changes to skeletons
		for (let L = 0; L < skellies.length; L++) {
			skellies[L].graphics.update();
		}
	});
}

function createTestButtons() {
	let i = 100;

	button = new PIXI.Text('Toggle Animation');
	button.x = 50;
	button.y = i; i += 50;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fntoggleAnimation);

	app.stage.addChild(button);


	button = new PIXI.Text('Toggle Kneel Left');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fntoggleKneelLeft);

	app.stage.addChild(button);

	button = new PIXI.Text('Toggle Kneel Right');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fntoggleKneelRight);

	app.stage.addChild(button);


	button = new PIXI.Text('Toggle Tiptoes');
	button.x = 50;
	button.y = i; i += 50;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fntoggleTiptoes);

	app.stage.addChild(button);


	button = new PIXI.Text('Toggle Fist Left');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fntoggleFistLeft);

	app.stage.addChild(button);


	button = new PIXI.Text('Toggle Fist Right');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fntoggleFistRight);

	app.stage.addChild(button);


	button = new PIXI.Text('Toggle Hands behind back');
	button.x = 50;
	button.y = i; i += 50;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fntoggleBehindBack);

	app.stage.addChild(button);

	button = new PIXI.Text('Arms in boxtie');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnboxtie);

	app.stage.addChild(button);

	button = new PIXI.Text('T-pose');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnarmst);

	app.stage.addChild(button);

	button = new PIXI.Text('Arms at sides');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnarmsside);

	app.stage.addChild(button);

	button = new PIXI.Text('Arms in front');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnarmsfront);

	app.stage.addChild(button);

	button = new PIXI.Text('Arms yoked');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnarmsyoked);

	app.stage.addChild(button);

	button = new PIXI.Text('Arms over head');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnarmsoverhead);

	app.stage.addChild(button);

	button = new PIXI.Text('Arms behind back');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnarmsbehindback);

	app.stage.addChild(button);

	button = new PIXI.Text('Arms elbow bound');
	button.x = 50;
	button.y = i; i += 50;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnarmsbehindbacktight);

	app.stage.addChild(button);

	var button = new PIXI.Text('Legs Spread');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnlegsspread);

	app.stage.addChild(button);

	var button = new PIXI.Text('Legs Wide');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnlegswide);

	app.stage.addChild(button);


	var button = new PIXI.Text('Legs Closed');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnlegsclosed);

	app.stage.addChild(button);


	var button = new PIXI.Text('Legs Normal');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnlegsnormal);

	app.stage.addChild(button);


	var button = new PIXI.Text('Legs Tight');
	button.x = 50;
	button.y = i; i += 25;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', fnlegstight);

	app.stage.addChild(button);

}
function fntoggleAnimation() {animation = !animation;}
function fntoggleKneelLeft() {if (!skelly.removePose([PoseTag.KNEEL_LEFT])) skelly.addPose([PoseTag.KNEEL_LEFT]);}
function fntoggleKneelRight() {if (!skelly.removePose([PoseTag.KNEEL_RIGHT])) skelly.addPose([PoseTag.KNEEL_RIGHT]);}
function fntoggleTiptoes() {if (!skelly.removePose([PoseTag.TIPTOE_LEFT, PoseTag.TIPTOE_RIGHT])) skelly.addPose([PoseTag.TIPTOE_LEFT, PoseTag.TIPTOE_RIGHT]);}
function fntoggleFistLeft() {if (!skelly.removePose([PoseTag.FIST_LEFT])) skelly.addPose([PoseTag.FIST_LEFT]);}
function fntoggleFistRight() {if (!skelly.removePose([PoseTag.FIST_RIGHT])) skelly.addPose([PoseTag.FIST_RIGHT]);}
function fntoggleBehindBack() {if (!skelly.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT])) skelly.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);}


function fnboxtie() {
	animation = false;

	skelly.get("ArmL").setExtension(0.825);
	skelly.get("ArmR").setExtension(0.825);
	skelly.get("ForeArmL").setExtension(0.95);
	skelly.get("ForeArmR").setExtension(0.95);

	skelly.addPose([PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT])
}
function fnarmsbehindback() {
	animation = false;

	skelly.get("ArmL").setExtension(0.925);
	skelly.get("ArmR").setExtension(0.925);
	skelly.get("ForeArmL").setExtension(0);
	skelly.get("ForeArmR").setExtension(0);

	skelly.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT])
}
function fnarmsbehindbacktight() {
	animation = false;

	skelly.get("ArmL").setExtension(1);
	skelly.get("ArmR").setExtension(1);
	skelly.get("ForeArmL").setExtension(0.1);
	skelly.get("ForeArmR").setExtension(0.1);

	skelly.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT])
}
function fnarmst() {
	animation = false;

	skelly.get("ArmL").setExtension(0);
	skelly.get("ArmR").setExtension(0);
	skelly.get("ForeArmL").setExtension(0);
	skelly.get("ForeArmR").setExtension(0);

	skelly.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT])
}
function fnarmsfront() {
	animation = false;

	skelly.get("ArmL").setExtension(.8);
	skelly.get("ArmR").setExtension(.8);
	skelly.get("ForeArmL").setExtension(0.35);
	skelly.get("ForeArmR").setExtension(0.35);

	skelly.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT])
}
function fnarmsoverhead() {
	animation = false;

	skelly.get("ArmL").setExtension(-0.7);
	skelly.get("ArmR").setExtension(-0.7);
	skelly.get("ForeArmL").setExtension(-0.7);
	skelly.get("ForeArmR").setExtension(-0.7);

	skelly.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT])
}
function fnarmsside() {
	animation = false;

	skelly.get("ArmL").setExtension(.8);
	skelly.get("ArmR").setExtension(.8);
	skelly.get("ForeArmL").setExtension(-0.1);
	skelly.get("ForeArmR").setExtension(-0.1);

	skelly.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT])
}
function fnarmsyoked() {
	animation = false;

	skelly.get("ArmL").setExtension(.15);
	skelly.get("ArmR").setExtension(.15);
	skelly.get("ForeArmL").setExtension(-0.95);
	skelly.get("ForeArmR").setExtension(-0.95);

	skelly.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT])
}


function fnlegsspread() {
	animation = false;

	skelly.get("LegL").setExtension(-0.5);
	skelly.get("LegR").setExtension(-0.5);

}
function fnlegswide() {
	animation = false;

	skelly.get("LegL").setExtension(-0.3);
	skelly.get("LegR").setExtension(-0.3);

}
function fnlegsclosed() {
	animation = false;

	skelly.get("LegL").setExtension(0);
	skelly.get("LegR").setExtension(0);

}
function fnlegsnormal() {
	animation = false;

	skelly.get("LegL").setExtension(-0.1);
	skelly.get("LegR").setExtension(-0.1);

}
function fnlegstight() {
	animation = false;

	skelly.get("LegL").setExtension(1);
	skelly.get("LegR").setExtension(1);

}