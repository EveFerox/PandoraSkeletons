import * as PIXI from 'pixi.js';
import { GenerateStandardBody, GenerateStandardOutfit } from './presets_front';
import { GenerateSideBody, GenerateSideOutfit } from './presets_side';
import { BodySkeleton, PoseTag, SkeletonContainer } from './skeleton';

let app: PIXI.Application;

let skelly: BodySkeleton;
let skelly2: BodySkeleton;

const skellies: { skeleton: BodySkeleton, graphics: SkeletonContainer; }[] = [];
let animation = true;

export function LauncherLaunchGame(width: number, height: number): void {
	// Creates the document
	app = new PIXI.Application({
		width, height, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
	});
	document.body.appendChild(app.view);

	// Creates a new skeleton and adds it to the skeleton list
	skelly = new BodySkeleton();
	GenerateStandardBody(skelly);
	GenerateStandardOutfit(skelly);
	skellies.push({ skeleton: skelly, graphics: new SkeletonContainer(skelly) });

	// Moves the skeleton and adds it to the screen
	let containerBody = skellies[0].graphics.container;
	app.stage.addChild(containerBody);
	containerBody.x = app.screen.width * .4;
	containerBody.y = app.screen.height / 2;

	// Creates a new skeleton and adds it to the skeleton list
	skelly2 = new BodySkeleton();
	GenerateSideBody(skelly2);
	GenerateSideOutfit(skelly2);
	skellies.push({ skeleton: skelly2, graphics: new SkeletonContainer(skelly2) });

	// Moves the skeleton and adds it to the screen
	containerBody = skellies[1].graphics.container;
	app.stage.addChild(containerBody);
	containerBody.x = app.screen.width * .75;
	containerBody.y = app.screen.height / 2 - 170;

	// Generate UI
	createTestButtons(); // Creates buttons to test thge skeleton

	// Everything after this is the screen update function
	let currentMode = false;
	let currentMode2 = false;
	let currentMode3 = false;
	let currentMode4 = false;
	let currentMode5 = false;

	// Listen for animate update
	app.ticker.add((delta) => {
		if (animation) {
			// Make changes to the skeleton
			let change = 0.005;
			if (currentMode) change = -0.005;
			let extension = 0;

			extension = skelly.get('ArmL').extension;
			skelly.get('ArmL').setExtension(extension + change * delta);
			skelly2.get('ArmL').setExtension(extension + change * delta);
			extension = skelly.get('ArmR').extension;
			skelly.get('ArmR').setExtension(extension + change * delta);

			if (extension >= 1) currentMode = true;
			if (extension <= -1) currentMode = false;

			change = 0.0025;
			if (currentMode3) change = -0.0025;

			extension = skelly.get('ForeArmL').extension;
			skelly.get('ForeArmL').setExtension(extension - change * delta);
			extension = skelly2.get('ShinR').extension;
			skelly2.get('ShinR').setExtension(extension - change * delta);
			extension = skelly.get('ForeArmR').extension;
			skelly.get('ForeArmR').setExtension(extension + change * delta);
			skelly2.get('ShinL').setExtension(extension + change * delta);

			if (extension >= 1) currentMode3 = true;
			if (extension <= -1) currentMode3 = false;

			// Make changes to the skeleton
			change = 0.004;
			if (currentMode2) change = -0.004;
			extension = 0;

			extension = skelly.get('LegL').extension;
			skelly.get('LegL').setExtension(extension + change * delta);
			extension = skelly2.get('ThighR').extension;
			skelly2.get('ThighR').setExtension(extension + change * delta);
			extension = skelly.get('LegR').extension;
			skelly.get('LegR').setExtension(extension + change * delta);
			skelly2.get('ArmR').setExtension(extension + change * delta);
			if (extension >= 1) currentMode2 = true;
			if (extension <= -1) currentMode2 = false;

			// Make changes to the skeleton
			change = 0.001;
			if (currentMode4) change = -0.001;
			extension = 0;

			extension = skelly.get('Head').extension;
			skelly.get('Head').setExtension(extension + change * delta);
			skelly2.get('Head').setExtension(extension + change * delta);
			if (extension >= 1) currentMode4 = true;
			if (extension <= -1) currentMode4 = false;

			// Make changes to the skeleton
			change = 0.002;
			if (currentMode5) change = -0.002;
			extension = 0;

			extension = skelly.get('Chest').extension;
			skelly.get('Chest').setExtension(extension + change * delta);
			skelly2.get('Chest').setExtension(extension + change * delta);
			if (extension >= 1) currentMode5 = true;
			if (extension <= -1) currentMode5 = false;
		}

		// update all graphics to represent changes to skeletons
		for (const s of skellies) {
			s.graphics.update();
		}
	});
}

function createTestButtons() {
	let x = 50;
	let i = 100;

	x += 0;

	const createText = (
		text: string,
		fn: PIXI.utils.EventEmitter.ListenerFn
	) => {
		const button = new PIXI.Text(text);
		button.x = x;
		button.y = i;
		button.interactive = true;
		button.buttonMode = true;
		button.on('pointerdown', fn);
		app.stage.addChild(button);
	};

	createText('Toggle Animation', fntoggleAnimation); i += 50;
	createText('Toggle Kneel Left', fntoggleKneelLeft); i += 25;
	createText('Toggle Kneel Right', fntoggleKneelRight); i += 25;
	createText('Toggle Tiptoes', fntoggleTiptoes); i += 50;
	createText('Toggle Fist Left', fntoggleFistLeft); i += 25;
	createText('Toggle Fist Right', fntoggleFistRight); i += 25;
	createText('Toggle Hands behind back', fntoggleBehindBack); i += 50;
	createText('Arms in boxtie', fnboxtie); i += 25;
	createText('Reverse prayer', fnarmst); i += 25;
	createText('Arms in fiddle', fnarmsfiddle); i += 25;
	createText('Arms at sides', fnarmsside); i += 25;
	createText('Arms in front', fnarmsfront); i += 25;
	createText('Arms yoked', fnarmsyoked); i += 25;
	createText('Arms over head', fnarmsoverhead); i += 25;
	createText('Arms behind back', fnarmsbehindback); i += 25;
	createText('Arms elbow bound', fnarmsbehindbacktight); i += 50;
	createText('Legs Spread', fnlegsspread); i += 25;
	createText('Legs Wide', fnlegswide); i += 25;
	createText('Legs Closed', fnlegsclosed); i += 25;
	createText('Legs Normal', fnlegsnormal); i += 25;
	createText('Legs Tight', fnlegstight); i += 50;
	createText('Reset head tilt', fnresethead); i += 25;
	createText('Reset torso tilt', fnresettorso); i += 50;
}
function fntoggleAnimation() {
	animation = !animation;
}
function fntoggleKneelLeft() {
	if (!skelly.removePose([PoseTag.KNEEL_LEFT])) skelly.addPose([PoseTag.KNEEL_LEFT]);
	if (!skelly2.removePose([PoseTag.KNEEL_LEFT])) skelly2.addPose([PoseTag.KNEEL_LEFT]);
}
function fntoggleKneelRight() {
	if (!skelly.removePose([PoseTag.KNEEL_RIGHT])) skelly.addPose([PoseTag.KNEEL_RIGHT]);
	if (!skelly2.removePose([PoseTag.KNEEL_RIGHT])) skelly2.addPose([PoseTag.KNEEL_RIGHT]);
}
function fntoggleTiptoes() {
	if (!skelly.removePose([PoseTag.TIPTOE_LEFT, PoseTag.TIPTOE_RIGHT])) skelly.addPose([PoseTag.TIPTOE_LEFT, PoseTag.TIPTOE_RIGHT]);
	if (!skelly2.removePose([PoseTag.TIPTOE_LEFT, PoseTag.TIPTOE_RIGHT])) skelly2.addPose([PoseTag.TIPTOE_LEFT, PoseTag.TIPTOE_RIGHT]);
}
function fntoggleFistLeft() {
	if (!skelly.removePose([PoseTag.FIST_LEFT])) skelly.addPose([PoseTag.FIST_LEFT]);
	if (!skelly2.removePose([PoseTag.FIST_LEFT])) skelly2.addPose([PoseTag.FIST_LEFT]);
}
function fntoggleFistRight() {
	if (!skelly.removePose([PoseTag.FIST_RIGHT])) skelly.addPose([PoseTag.FIST_RIGHT]);
	if (!skelly2.removePose([PoseTag.FIST_RIGHT])) skelly2.addPose([PoseTag.FIST_RIGHT]);
}
function fntoggleBehindBack() {
	if (!skelly.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT])) skelly.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);
	if (!skelly2.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT])) skelly2.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);
}

function fnboxtie() {
	animation = false;

	skelly.get('ArmL').setExtension(0.825);
	skelly.get('ArmR').setExtension(0.825);
	skelly.get('ForeArmL').setExtension(0.7);
	skelly.get('ForeArmR').setExtension(0.7);

	skelly2.get('ArmL').setExtension(0.635);
	skelly2.get('ArmR').setExtension(0.635);

	skelly.removePose([PoseTag.YOKED]);
	skelly2.removePose([PoseTag.YOKED]);
	skelly.removePose([PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT]);
	skelly2.removePose([PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT]);
	skelly.addPose([PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.BOXTIE]);
	skelly2.addPose([PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.BOXTIE]);
}
function fnarmsbehindback() {
	animation = false;

	skelly.get('ArmL').setExtension(0.925);
	skelly.get('ArmR').setExtension(0.925);
	skelly.get('ForeArmL').setExtension(0);
	skelly.get('ForeArmR').setExtension(0);

	skelly2.get('ArmL').setExtension(.72);
	skelly2.get('ForeArmL').setExtension(-0.1);
	skelly2.get('ArmR').setExtension(0.7);
	skelly2.get('ForeArmR').setExtension(-0.05);

	skelly.removePose([PoseTag.YOKED]);
	skelly2.removePose([PoseTag.YOKED]);
	skelly.removePose([PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skelly2.removePose([PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skelly.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);
	skelly2.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);
}
function fnarmsbehindbacktight() {
	animation = false;

	skelly.get('ArmL').setExtension(1);
	skelly.get('ArmR').setExtension(1);
	skelly.get('ForeArmL').setExtension(0.075);
	skelly.get('ForeArmR').setExtension(0.075);

	skelly2.get('ArmL').setExtension(.67);
	skelly2.get('ForeArmL').setExtension(-0.02);
	skelly2.get('ArmR').setExtension(0.67);
	skelly2.get('ForeArmR').setExtension(-0.02);

	skelly.removePose([PoseTag.YOKED]);
	skelly2.removePose([PoseTag.YOKED]);
	skelly.removePose([PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skelly2.removePose([PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skelly.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);
	skelly2.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);
}
function fnarmst() {
	animation = false;

	skelly.get('ArmL').setExtension(.9);
	skelly.get('ArmR').setExtension(.9);
	skelly.get('ForeArmL').setExtension(0.74);
	skelly.get('ForeArmR').setExtension(0.74);

	skelly2.get('ArmL').setExtension(0.7);
	skelly2.get('ForeArmL').setExtension(-1);
	skelly2.get('ArmR').setExtension(0.7);
	skelly2.get('ForeArmR').setExtension(-1);

	skelly.removePose([PoseTag.YOKED]);
	skelly2.removePose([PoseTag.YOKED]);
	skelly.removePose([PoseTag.BOXTIE]);
	skelly2.removePose([PoseTag.BOXTIE]);
	skelly.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT]);
	skelly2.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT]);
}
function fnarmsfront() {
	animation = false;

	skelly.get('ArmL').setExtension(.8);
	skelly.get('ArmR').setExtension(.8);
	skelly.get('ForeArmL').setExtension(0.26);
	skelly.get('ForeArmR').setExtension(0.26);

	skelly2.get('ArmL').setExtension(.475);
	skelly2.get('ForeArmL').setExtension(-.1);
	skelly2.get('ArmR').setExtension(0.5);
	skelly2.get('ForeArmR').setExtension(-.125);

	skelly.removePose([PoseTag.YOKED]);
	skelly2.removePose([PoseTag.YOKED]);
	skelly.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skelly2.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
}
function fnarmsfiddle() {
	animation = false;

	skelly.get('ArmL').setExtension(1);
	skelly.get('ArmR').setExtension(1);
	skelly.get('ForeArmL').setExtension(1);
	skelly.get('ForeArmR').setExtension(1);

	skelly2.get('ArmL').setExtension(0.2);
	skelly2.get('ForeArmL').setExtension(-.5);
	skelly2.get('ArmR').setExtension(0.225);
	skelly2.get('ForeArmR').setExtension(-.525);

	skelly.removePose([PoseTag.YOKED]);
	skelly2.removePose([PoseTag.YOKED]);
	skelly.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skelly2.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
}
function fnarmsoverhead() {
	animation = false;

	skelly.get('ArmL').setExtension(-0.7);
	skelly.get('ArmR').setExtension(-0.7);
	skelly.get('ForeArmL').setExtension(-0.7);
	skelly.get('ForeArmR').setExtension(-0.7);

	skelly2.get('ArmL').setExtension(-.325);
	skelly2.get('ForeArmL').setExtension(-.525);
	skelly2.get('ArmR').setExtension(-.3);
	skelly2.get('ForeArmR').setExtension(-.5);

	skelly.removePose([PoseTag.YOKED]);
	skelly2.removePose([PoseTag.YOKED]);
	skelly.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skelly2.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
}
function fnarmsside() {
	animation = false;

	skelly.get('ArmL').setExtension(.8);
	skelly.get('ArmR').setExtension(.8);
	skelly.get('ForeArmL').setExtension(-0.1);
	skelly.get('ForeArmR').setExtension(-0.1);

	skelly2.get('ArmL').setExtension(.525);
	skelly2.get('ForeArmL').setExtension(-.0);
	skelly2.get('ArmR').setExtension(0.525);
	skelly2.get('ForeArmR').setExtension(-.025);

	skelly.removePose([PoseTag.YOKED]);
	skelly2.removePose([PoseTag.YOKED]);
	skelly.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skelly2.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
}
function fnarmsyoked() {
	animation = false;

	skelly.get('ArmL').setExtension(.15);
	skelly.get('ArmR').setExtension(.15);
	skelly.get('ForeArmL').setExtension(-0.95);
	skelly.get('ForeArmR').setExtension(-0.95);

	skelly2.get('ArmL').setExtension(.5);
	skelly2.get('ForeArmL').setExtension(1);
	skelly2.get('ArmR').setExtension(0.5);
	skelly2.get('ForeArmR').setExtension(1);

	skelly.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skelly2.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skelly.addPose([PoseTag.YOKED]);
	skelly2.addPose([PoseTag.YOKED]);
}

function fnlegsspread() {
	animation = false;

	skelly.get('LegL').setExtension(-0.5);
	skelly.get('LegR').setExtension(-0.5);

	skelly2.get('ThighL').setExtension(-0.7);
	skelly2.get('ShinL').setExtension(0.03);
	skelly2.get('FootL').setExtension(1);
	skelly2.get('ThighR').setExtension(0.5);
	skelly2.get('ShinR').setExtension(-0.05);
	skelly2.get('FootR').setExtension(-1);

}
function fnlegswide() {
	animation = false;

	skelly.get('LegL').setExtension(-0.3);
	skelly.get('LegR').setExtension(-0.3);

	skelly2.get('ThighL').setExtension(-0.4);
	skelly2.get('ShinL').setExtension(-0.0);
	skelly2.get('FootL').setExtension(.6);
	skelly2.get('ThighR').setExtension(0.3);
	skelly2.get('ShinR').setExtension(-0.05);
	skelly2.get('FootR').setExtension(-.6);

}
function fnlegsclosed() {
	animation = false;

	skelly.get('LegL').setExtension(0);
	skelly.get('LegR').setExtension(0);

	skelly2.get('ThighL').setExtension(-0.02);
	skelly2.get('ShinL').setExtension(-0.0);
	skelly2.get('FootL').setExtension(-0);
	skelly2.get('ThighR').setExtension(0.15);
	skelly2.get('ShinR').setExtension(-0.05);
	skelly2.get('FootR').setExtension(-0.1);
}

function fnlegsnormal() {
	animation = false;

	skelly.get('LegL').setExtension(-0.1);
	skelly.get('LegR').setExtension(-0.1);

	skelly2.get('ThighL').setExtension(-0.08);
	skelly2.get('ShinL').setExtension(-0.0);
	skelly2.get('FootL').setExtension(0.13);
	skelly2.get('ThighR').setExtension(0.23);
	skelly2.get('ShinR').setExtension(-0);
	skelly2.get('FootR').setExtension(-0.17);
}
function fnlegstight() {
	animation = false;

	skelly.get('LegL').setExtension(1);
	skelly.get('LegR').setExtension(1);

	skelly2.get('ThighL').setExtension(0);
	skelly2.get('ShinL').setExtension(0);
	skelly2.get('FootL').setExtension(0);
	skelly2.get('ThighR').setExtension(0);
	skelly2.get('ShinR').setExtension(0);
	skelly2.get('FootR').setExtension(0);

}
function fnresethead() {
	skelly.get('Head').setExtension(0);
	skelly2.get('Head').setExtension(0);

}
function fnresettorso() {
	skelly.get('Chest').setExtension(0);
	skelly2.get('Chest').setExtension(0);

}
