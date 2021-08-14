import * as PIXI from 'pixi.js';
import { GenerateStandardBody, GenerateStandardOutfit } from './presets_front';
import { GenerateSideBody, GenerateSideOutfit } from './presets_side';
import { BodySkeleton, PoseTag, SkeletonContainer } from './skeleton';

let app: PIXI.Application;

const skeletonContainers: SkeletonContainer[] = [];

let skellyFront: BodySkeleton;
let skellySide: BodySkeleton;

let animation = true;

export function LauncherLaunchGame(width: number, height: number): void {
	// Creates the document
	app = new PIXI.Application({
		width, height,
		backgroundColor: 0x1099bb,
		resolution: window.devicePixelRatio || 1,
	});
	document.body.appendChild(app.view);

	// Creates a new skeleton and adds it to the skeleton list
	skellyFront = new BodySkeleton();
	GenerateStandardBody(skellyFront);
	GenerateStandardOutfit(skellyFront);
	const skellyFrontContainer = new SkeletonContainer(skellyFront);
	skeletonContainers.push(skellyFrontContainer);

	// Moves the skeleton and adds it to the screen
	let containerBody = skellyFrontContainer.container;
	app.stage.addChild(containerBody);
	containerBody.x = app.screen.width * .4;
	containerBody.y = app.screen.height / 2;

	// Creates a new skeleton and adds it to the skeleton list
	skellySide = new BodySkeleton();
	GenerateSideBody(skellySide);
	GenerateSideOutfit(skellySide);
	const skellySideContainer = new SkeletonContainer(skellySide);
	skeletonContainers.push(skellySideContainer);

	// Moves the skeleton and adds it to the screen
	containerBody = skellySideContainer.container;
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

			extension = skellyFront.get('ArmL').extension;
			skellyFront.get('ArmL').setExtension(extension + change * delta);
			skellySide.get('ArmL').setExtension(extension + change * delta);
			extension = skellyFront.get('ArmR').extension;
			skellyFront.get('ArmR').setExtension(extension + change * delta);

			if (extension >= 1) currentMode = true;
			if (extension <= -1) currentMode = false;

			change = 0.0025;
			if (currentMode3) change = -0.0025;

			extension = skellyFront.get('ForeArmL').extension;
			skellyFront.get('ForeArmL').setExtension(extension - change * delta);
			extension = skellySide.get('ShinR').extension;
			skellySide.get('ShinR').setExtension(extension - change * delta);
			extension = skellyFront.get('ForeArmR').extension;
			skellyFront.get('ForeArmR').setExtension(extension + change * delta);
			skellySide.get('ShinL').setExtension(extension + change * delta);

			if (extension >= 1) currentMode3 = true;
			if (extension <= -1) currentMode3 = false;

			// Make changes to the skeleton
			change = 0.004;
			if (currentMode2) change = -0.004;
			extension = 0;

			extension = skellyFront.get('LegL').extension;
			skellyFront.get('LegL').setExtension(extension + change * delta);
			extension = skellySide.get('ThighR').extension;
			skellySide.get('ThighR').setExtension(extension + change * delta);
			extension = skellyFront.get('LegR').extension;
			skellyFront.get('LegR').setExtension(extension + change * delta);
			skellySide.get('ArmR').setExtension(extension + change * delta);
			if (extension >= 1) currentMode2 = true;
			if (extension <= -1) currentMode2 = false;

			// Make changes to the skeleton
			change = 0.001;
			if (currentMode4) change = -0.001;
			extension = 0;

			extension = skellyFront.get('Head').extension;
			skellyFront.get('Head').setExtension(extension + change * delta);
			skellySide.get('Head').setExtension(extension + change * delta);
			if (extension >= 1) currentMode4 = true;
			if (extension <= -1) currentMode4 = false;

			// Make changes to the skeleton
			change = 0.002;
			if (currentMode5) change = -0.002;
			extension = 0;

			extension = skellyFront.get('Chest').extension;
			skellyFront.get('Chest').setExtension(extension + change * delta);
			skellySide.get('Chest').setExtension(extension + change * delta);
			if (extension >= 1) currentMode5 = true;
			if (extension <= -1) currentMode5 = false;
		}

		// update all graphics to represent changes to skeletons
		for (const s of skeletonContainers) {
			s.update();
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
	if (!skellyFront.removePose([PoseTag.KNEEL_LEFT])) skellyFront.addPose([PoseTag.KNEEL_LEFT]);
	if (!skellySide.removePose([PoseTag.KNEEL_LEFT])) skellySide.addPose([PoseTag.KNEEL_LEFT]);
}
function fntoggleKneelRight() {
	if (!skellyFront.removePose([PoseTag.KNEEL_RIGHT])) skellyFront.addPose([PoseTag.KNEEL_RIGHT]);
	if (!skellySide.removePose([PoseTag.KNEEL_RIGHT])) skellySide.addPose([PoseTag.KNEEL_RIGHT]);
}
function fntoggleTiptoes() {
	if (!skellyFront.removePose([PoseTag.TIPTOE_LEFT, PoseTag.TIPTOE_RIGHT])) skellyFront.addPose([PoseTag.TIPTOE_LEFT, PoseTag.TIPTOE_RIGHT]);
	if (!skellySide.removePose([PoseTag.TIPTOE_LEFT, PoseTag.TIPTOE_RIGHT])) skellySide.addPose([PoseTag.TIPTOE_LEFT, PoseTag.TIPTOE_RIGHT]);
}
function fntoggleFistLeft() {
	if (!skellyFront.removePose([PoseTag.FIST_LEFT])) skellyFront.addPose([PoseTag.FIST_LEFT]);
	if (!skellySide.removePose([PoseTag.FIST_LEFT])) skellySide.addPose([PoseTag.FIST_LEFT]);
}
function fntoggleFistRight() {
	if (!skellyFront.removePose([PoseTag.FIST_RIGHT])) skellyFront.addPose([PoseTag.FIST_RIGHT]);
	if (!skellySide.removePose([PoseTag.FIST_RIGHT])) skellySide.addPose([PoseTag.FIST_RIGHT]);
}
function fntoggleBehindBack() {
	if (!skellyFront.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT])) skellyFront.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);
	if (!skellySide.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT])) skellySide.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);
}

function fnboxtie() {
	animation = false;

	skellyFront.get('ArmL').setExtension(0.825);
	skellyFront.get('ArmR').setExtension(0.825);
	skellyFront.get('ForeArmL').setExtension(0.7);
	skellyFront.get('ForeArmR').setExtension(0.7);

	skellySide.get('ArmL').setExtension(0.635);
	skellySide.get('ArmR').setExtension(0.635);

	skellyFront.removePose([PoseTag.YOKED]);
	skellySide.removePose([PoseTag.YOKED]);
	skellyFront.removePose([PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT]);
	skellySide.removePose([PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT]);
	skellyFront.addPose([PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.BOXTIE]);
	skellySide.addPose([PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.BOXTIE]);
}
function fnarmsbehindback() {
	animation = false;

	skellyFront.get('ArmL').setExtension(0.925);
	skellyFront.get('ArmR').setExtension(0.925);
	skellyFront.get('ForeArmL').setExtension(0);
	skellyFront.get('ForeArmR').setExtension(0);

	skellySide.get('ArmL').setExtension(.72);
	skellySide.get('ForeArmL').setExtension(-0.1);
	skellySide.get('ArmR').setExtension(0.7);
	skellySide.get('ForeArmR').setExtension(-0.05);

	skellyFront.removePose([PoseTag.YOKED]);
	skellySide.removePose([PoseTag.YOKED]);
	skellyFront.removePose([PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skellySide.removePose([PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skellyFront.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);
	skellySide.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);
}
function fnarmsbehindbacktight() {
	animation = false;

	skellyFront.get('ArmL').setExtension(1);
	skellyFront.get('ArmR').setExtension(1);
	skellyFront.get('ForeArmL').setExtension(0.075);
	skellyFront.get('ForeArmR').setExtension(0.075);

	skellySide.get('ArmL').setExtension(.67);
	skellySide.get('ForeArmL').setExtension(-0.02);
	skellySide.get('ArmR').setExtension(0.67);
	skellySide.get('ForeArmR').setExtension(-0.02);

	skellyFront.removePose([PoseTag.YOKED]);
	skellySide.removePose([PoseTag.YOKED]);
	skellyFront.removePose([PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skellySide.removePose([PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skellyFront.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);
	skellySide.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT]);
}
function fnarmst() {
	animation = false;

	skellyFront.get('ArmL').setExtension(.9);
	skellyFront.get('ArmR').setExtension(.9);
	skellyFront.get('ForeArmL').setExtension(0.74);
	skellyFront.get('ForeArmR').setExtension(0.74);

	skellySide.get('ArmL').setExtension(0.7);
	skellySide.get('ForeArmL').setExtension(-1);
	skellySide.get('ArmR').setExtension(0.7);
	skellySide.get('ForeArmR').setExtension(-1);

	skellyFront.removePose([PoseTag.YOKED]);
	skellySide.removePose([PoseTag.YOKED]);
	skellyFront.removePose([PoseTag.BOXTIE]);
	skellySide.removePose([PoseTag.BOXTIE]);
	skellyFront.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT]);
	skellySide.addPose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT]);
}
function fnarmsfront() {
	animation = false;

	skellyFront.get('ArmL').setExtension(.8);
	skellyFront.get('ArmR').setExtension(.8);
	skellyFront.get('ForeArmL').setExtension(0.26);
	skellyFront.get('ForeArmR').setExtension(0.26);

	skellySide.get('ArmL').setExtension(.475);
	skellySide.get('ForeArmL').setExtension(-.1);
	skellySide.get('ArmR').setExtension(0.5);
	skellySide.get('ForeArmR').setExtension(-.125);

	skellyFront.removePose([PoseTag.YOKED]);
	skellySide.removePose([PoseTag.YOKED]);
	skellyFront.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skellySide.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
}
function fnarmsfiddle() {
	animation = false;

	skellyFront.get('ArmL').setExtension(1);
	skellyFront.get('ArmR').setExtension(1);
	skellyFront.get('ForeArmL').setExtension(1);
	skellyFront.get('ForeArmR').setExtension(1);

	skellySide.get('ArmL').setExtension(0.2);
	skellySide.get('ForeArmL').setExtension(-.5);
	skellySide.get('ArmR').setExtension(0.225);
	skellySide.get('ForeArmR').setExtension(-.525);

	skellyFront.removePose([PoseTag.YOKED]);
	skellySide.removePose([PoseTag.YOKED]);
	skellyFront.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skellySide.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
}
function fnarmsoverhead() {
	animation = false;

	skellyFront.get('ArmL').setExtension(-0.7);
	skellyFront.get('ArmR').setExtension(-0.7);
	skellyFront.get('ForeArmL').setExtension(-0.7);
	skellyFront.get('ForeArmR').setExtension(-0.7);

	skellySide.get('ArmL').setExtension(-.325);
	skellySide.get('ForeArmL').setExtension(-.525);
	skellySide.get('ArmR').setExtension(-.3);
	skellySide.get('ForeArmR').setExtension(-.5);

	skellyFront.removePose([PoseTag.YOKED]);
	skellySide.removePose([PoseTag.YOKED]);
	skellyFront.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skellySide.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
}
function fnarmsside() {
	animation = false;

	skellyFront.get('ArmL').setExtension(.8);
	skellyFront.get('ArmR').setExtension(.8);
	skellyFront.get('ForeArmL').setExtension(-0.1);
	skellyFront.get('ForeArmR').setExtension(-0.1);

	skellySide.get('ArmL').setExtension(.525);
	skellySide.get('ForeArmL').setExtension(-.0);
	skellySide.get('ArmR').setExtension(0.525);
	skellySide.get('ForeArmR').setExtension(-.025);

	skellyFront.removePose([PoseTag.YOKED]);
	skellySide.removePose([PoseTag.YOKED]);
	skellyFront.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skellySide.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.FIST_LEFT, PoseTag.FIST_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
}
function fnarmsyoked() {
	animation = false;

	skellyFront.get('ArmL').setExtension(.15);
	skellyFront.get('ArmR').setExtension(.15);
	skellyFront.get('ForeArmL').setExtension(-0.95);
	skellyFront.get('ForeArmR').setExtension(-0.95);

	skellySide.get('ArmL').setExtension(.5);
	skellySide.get('ForeArmL').setExtension(1);
	skellySide.get('ArmR').setExtension(0.5);
	skellySide.get('ForeArmR').setExtension(1);

	skellyFront.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skellySide.removePose([PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT, PoseTag.REVERSEPRAYER_LEFT, PoseTag.REVERSEPRAYER_RIGHT, PoseTag.BOXTIE]);
	skellyFront.addPose([PoseTag.YOKED]);
	skellySide.addPose([PoseTag.YOKED]);
}
function fnlegsspread() {
	animation = false;

	skellyFront.get('LegL').setExtension(-0.5);
	skellyFront.get('LegR').setExtension(-0.5);

	skellySide.get('ThighL').setExtension(-0.7);
	skellySide.get('ShinL').setExtension(0.03);
	skellySide.get('FootL').setExtension(1);
	skellySide.get('ThighR').setExtension(0.5);
	skellySide.get('ShinR').setExtension(-0.05);
	skellySide.get('FootR').setExtension(-1);
}
function fnlegswide() {
	animation = false;

	skellyFront.get('LegL').setExtension(-0.3);
	skellyFront.get('LegR').setExtension(-0.3);

	skellySide.get('ThighL').setExtension(-0.4);
	skellySide.get('ShinL').setExtension(-0.0);
	skellySide.get('FootL').setExtension(.6);
	skellySide.get('ThighR').setExtension(0.3);
	skellySide.get('ShinR').setExtension(-0.05);
	skellySide.get('FootR').setExtension(-.6);
}
function fnlegsclosed() {
	animation = false;

	skellyFront.get('LegL').setExtension(0);
	skellyFront.get('LegR').setExtension(0);

	skellySide.get('ThighL').setExtension(-0.02);
	skellySide.get('ShinL').setExtension(-0.0);
	skellySide.get('FootL').setExtension(-0);
	skellySide.get('ThighR').setExtension(0.15);
	skellySide.get('ShinR').setExtension(-0.05);
	skellySide.get('FootR').setExtension(-0.1);
}
function fnlegsnormal() {
	animation = false;

	skellyFront.get('LegL').setExtension(-0.1);
	skellyFront.get('LegR').setExtension(-0.1);

	skellySide.get('ThighL').setExtension(-0.08);
	skellySide.get('ShinL').setExtension(-0.0);
	skellySide.get('FootL').setExtension(0.13);
	skellySide.get('ThighR').setExtension(0.23);
	skellySide.get('ShinR').setExtension(-0);
	skellySide.get('FootR').setExtension(-0.17);
}
function fnlegstight() {
	animation = false;

	skellyFront.get('LegL').setExtension(1);
	skellyFront.get('LegR').setExtension(1);

	skellySide.get('ThighL').setExtension(0);
	skellySide.get('ShinL').setExtension(0);
	skellySide.get('FootL').setExtension(0);
	skellySide.get('ThighR').setExtension(0);
	skellySide.get('ShinR').setExtension(0);
	skellySide.get('FootR').setExtension(0);
}
function fnresethead() {
	skellyFront.get('Head').setExtension(0);
	skellySide.get('Head').setExtension(0);
}
function fnresettorso() {
	skellyFront.get('Chest').setExtension(0);
	skellySide.get('Chest').setExtension(0);
}
