/* 
OPTION 0 = FIXED ASPECT RATIO
OPTION 1 = ONLY LANDSCAPE FLEXIBLE ASPECT RATIO
OPTION 2 = ONLY PORTRAIT FLEXIBLE ASPECT RATIO
OPTION 3 = LANDSCAPE AND PORTRAIT FLEXIBLE ASPECT RATIO
OPTION 4 = MAXIMIZE TO WINDOW
*/

var option = 3;

var maxAspectRatioWidth = 16;
var maxAspectRatioHeight = 9;

var minAspectRatioWidth = 20;
var minAspectRatioHeight = 9;

var maxAspectRatioWidthPortrait = 9;
var maxAspectRatioHeightPortrait = 20;

var minAspectRatioWidthPortrait = 9;
var minAspectRatioHeightPortrait = 16;

var fixedAspectRatioWidth = 16;
var fixedAspectRatioHeight = 9;

var maximize = false;

var portraitMode = false;
var landscapeMode = false;

var gameBackground = document.querySelector(".gameBackground");
var gameCanvas = document.querySelector(".gameCanvas");

var lastWidth = 0;
var lastHeight = 0;

var width2 = 0;
var height2 = 0;

var deviceOrientation = "";

checkOrientationMode();

resizeCanvas();

window.addEventListener('resize', resizeCanvas);
window.addEventListener('resize', checkOrientationMode);


function checkOrientationMode() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (deviceOrientation != "landscape") {
            deviceOrientation = "landscape";
            resizeCanvas();
        }
    }
    else if (window.matchMedia("(orientation: portrait)").matches) {
        if (deviceOrientation != "portrait") {
            deviceOrientation = "portrait";
            resizeCanvas();
        }
    }
}

function resizeCanvas() {
    if (((window.innerHeight / window.innerWidth) >= (maxAspectRatioHeight / maxAspectRatioWidth)) && option == 1) {

        width = maxAspectRatioWidth;
        height = maxAspectRatioHeight;

        maximize = false;
    }
    else if (((window.innerHeight / window.innerWidth) < (minAspectRatioHeight / minAspectRatioWidth)) && option == 1) {

        width = minAspectRatioWidth;
        height = minAspectRatioHeight;

        maximize = false;
    }
    else if (((window.innerHeight / window.innerWidth) >= (maxAspectRatioHeightPortrait / maxAspectRatioWidthPortrait)) && option == 2) {

        width = maxAspectRatioWidthPortrait;
        height = maxAspectRatioHeightPortrait;

        maximize = false;
    }
    else if (((window.innerHeight / window.innerWidth) < (minAspectRatioHeightPortrait / minAspectRatioWidthPortrait)) && option == 2) {

        width = minAspectRatioWidthPortrait;
        height = minAspectRatioHeightPortrait;

        maximize = false;
    }
    else if(deviceOrientation == "landscape" && option == 3)
    {
        if (((window.innerHeight / window.innerWidth) >= (maxAspectRatioHeight / maxAspectRatioWidth))) {

            width = maxAspectRatioWidth;
            height = maxAspectRatioHeight;
    
            maximize = false;
        }
        else if (((window.innerHeight / window.innerWidth) < (minAspectRatioHeight / minAspectRatioWidth))) {
    
            width = minAspectRatioWidth;
            height = minAspectRatioHeight;
    
            maximize = false;
        }        
        else
        {
            maximize = true;
            gameBackground.style.height = "100%";
            gameBackground.style.width = "100%";
            gameCanvas.style.width = "100%";
            gameCanvas.style.height = "100%";
        }
    }
    else if(deviceOrientation == "portrait" && option == 3)
    {

        if (((window.innerHeight / window.innerWidth) >= (maxAspectRatioHeightPortrait / maxAspectRatioWidthPortrait))) {

            width = maxAspectRatioWidthPortrait;
            height = maxAspectRatioHeightPortrait;
    
            maximize = false;
        }
        else if (((window.innerHeight / window.innerWidth) < (minAspectRatioHeightPortrait / minAspectRatioWidthPortrait))) {
    
            width = minAspectRatioWidthPortrait;
            height = minAspectRatioHeightPortrait;
    
            maximize = false;
        }
        else
        {
            maximize = true;
            gameBackground.style.height = "100%";
            gameBackground.style.width = "100%";
            gameCanvas.style.width = "100%";
            gameCanvas.style.height = "100%";
        }
    }
    else if (option == 0) {

        width = fixedAspectRatioWidth;
        height = fixedAspectRatioHeight;

        maximize = false;
    }
    else {

        maximize = true;
        gameBackground.style.height = "100%";
        gameBackground.style.width = "100%";
        gameCanvas.style.width = "100%";
        gameCanvas.style.height = "100%";
    }

    if (!maximize) {
        resize();
    }

    if ((gameBackground.style.height / gameBackground.style.width) > 1) {
        if (!portraitMode) {
            portraitMode = true;
            landscapeMode = false;
        }
    }
    else {
        if (!landscapeMode) {
            landscapeMode = true;
            portraitMode = false;
        }
    }
}

function getCanvasScale() {
    var widthScale = window.innerWidth / width;
    var heightScale = window.innerHeight / height;
    return Math.min(widthScale, heightScale);
};

function resize() {
    var scale = getCanvasScale();

    gameBackground.style.height = height * scale + "px";
    gameBackground.style.width = width * scale + "px";

    gameCanvas.style.height = height * scale + "px";
    gameCanvas.style.width = width * scale + "px";
}