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
	generateStandardBody(skelly);
	generateStandardOutfit(skelly);

	skellies.push({skeleton: skelly, graphics: new SkeletonContainer(skelly)})

	const container_body = skellies[0].graphics.container;
	app.stage.addChild(container_body);

	container_body.x = app.screen.width / 2;
	container_body.y = app.screen.height / 2;

	var currentMode = false;
	var currentMode2 = false;
	var currentMode3 = false;
	let switchtimer = 0;
	let switchtimerMax = 60;

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

		/*switchtimer += delta;
		if (switchtimer > switchtimerMax) {
			switchtimer = 0;
			if (Math.random() < 0.25) {
				skelly.PoseTags = [PoseTag.HANDBEHINDBACK_LEFT, PoseTag.HANDBEHINDBACK_RIGHT];
			} else if (Math.random() < 0.33) {
				skelly.PoseTags = [PoseTag.FIST_RIGHT, PoseTag.FIST_LEFT];
			} else if (Math.random() < 0.5) {
				skelly.PoseTags = [PoseTag.KNEEL_RIGHT, PoseTag.KNEEL_LEFT];
			} else {
				skelly.PoseTags = [];
			}
		}*/


		// update all graphics to represent changes to skeletons
		for (let L = 0; L < skellies.length; L++) {
			skellies[L].graphics.updateExtension();
		}
	});
}
