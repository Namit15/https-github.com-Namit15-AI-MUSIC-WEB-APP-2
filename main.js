song = "";
song1 = "";

songStatus = "";
songStatus1 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelloadded);
    poseNet.on("pose", gotPoses);
}

function modelloadded()
{
    console.log("Your model is lodded")
}


function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist  : " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("Left Wrist X :" + leftWristX + "Left Wrist Y :" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Right Wrist X :" + rightWristX + "Right Wrist Y :" + rightWristY);
    }
}

function preload()
{
    song = loadSound("music.mp3");
    song1 = loadSound("music2.mp3")
}

function draw()
{
    image(video,0,0,600,500);

    songStatus = song.isPlaying();
    songStatus1 = song1.isPlaying();

    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song.stop();

        if(songStatus1 == false)
        {
            song1.play();
        }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}