"use strict";

let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}

LauncherLaunchGame(1440, 1080);