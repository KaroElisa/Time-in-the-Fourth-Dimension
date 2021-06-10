//POSENET VARIABLES

//documentation
//https://github.com/tensorflow/tfjs-models/tree/master/posenet

let video;
let poseNet;
let pose;
let skeleton;
let imageCount = 318;


// the atlantianCycle image sequence
let atlantianCycle = [];

// The current frame of the walk cycle we want to see
let currentFrame = 0;

//preloading all the images and giving them an index in the array
function preload() {

  //LOAD ALL IMAGES  
  for (i = 0; i < imageCount; i++) {
    atlantianCycle[i] = loadImage(i + '.png');
  }
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  //original size 853, 480

  imageMode(CENTER);

  frameRate(24);

  video = createCapture(VIDEO);
  video.size(displayWidth, displayHeight);
  video.hide();

  //POSENET Definitions and Functions  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses)

}


function gotPoses(poses) {

  if (poses.length > 0) {
    pose = poses[0].pose
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {}

function draw() {

  background(0);
    
  fill(255);
  textSize(width/50);
        text('It is said that here, time is cyclical and instantaneous. There is no beginning and no end.', width/8, height/8);
        text('There are only the moments you choose to focus on.', width/8, (height/8)+height/19);
  
    text('Please turn on your webcam and stand away from your laptop.', width/8, height/4+(height/19))
  text('Raise your hands and watch as you move slowly side to side around the room.',width/8, (height/4)+height/19+(height/19)+ (height/19));
    text('You have the control to turn time backwards and forwards to experience any moment.', width/8, (height/4)+height/19+(height/19));
  
  fill(200, 200, 0)
  text('Welcome to the Fourth Dimension.', width/8, height/1.5);
  
  //Always check if there is a valid pose to draw off of first
  if (pose) {
  
    
    push();
    translate(displayWidth/2, displayHeight/2);
    atlantianCycle[currentFrame].resize(0, displayHeight)
    image(atlantianCycle[currentFrame], 0, 0);
    pop();

    //currentFrame++;
    console.log(currentFrame);

    //SCRUB FORWARD OR BACKWARDS BASED ON HAND MOVEMENT

    if (pose.leftWrist.x > width / 2 && pose.rightWrist.x > width / 2  && pose.rightElbow.x > width / 2) {
      currentFrame += 1;
    } else if (pose.leftWrist.x < width / 2 && pose.rightWrist.x < width / 2 && pose.leftElbow.x < width/2) {
      currentFrame -= 1;
    } else if (pose.leftWrist.x < width / 2 && pose.rightWrist.x > width / 2)  {
      currentFrame = currentFrame;
      
    } else if (pose.leftWrist.x > width / 2 && pose.rightWrist.x < width / 2  && pose.leftElbow.x < width/2 && pose.rightElbow.x > width/2)  {
      currentFrame = currentFrame;
    }

    //RESETS

    if (currentFrame >= atlantianCycle.length) {
      currentFrame = 0;
    }

    //if we get to the end of the animation and we want to move backwards
    if (currentFrame > imageCount && pose.leftWrist.x > width / 2) {
      currentFrame = 0;
    }
    if (currentFrame > imageCount && pose.rightWrist.x > width / 2) {
      currentFrame = 0;
    }

    //if we get to the beginning and want to go backwards
    if (currentFrame < 0 && pose.leftWrist.x < width / 2) {
      currentFrame = imageCount-1;
      
    }
    if (currentFrame < 0 && pose.rightWrist.x < width / 2) {
      currentFrame = imageCount-1;
    }

  }
}



//SOME HELPFUL LINKS ABOUT VIDEO PLAYBACK IN P5

//https://forums.tumult.com/t/playing-video-in-reverse/17928/3
//https://www.w3schools.com/Tags/av_prop_playbackrate.asp
//https://molleindustria.github.io/p5.play/docs/classes/Animation.html
//https://openprocessing.org/sketch/87384/
//https://www.geeksforgeeks.org/p5-js-reverse-function/
//https://www.geeksforgeeks.org/p5-mediaelement-speed-method/