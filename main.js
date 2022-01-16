song = "";
song2 = "";
leftWristy = 0;
leftWristx = 0;
rightWristx = 0;
rightWristy = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function setup()
{
    canvas = createCanvas(900,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('Posenet is initialised');
}

function gotPoses( results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log( "scoreLeftWrist = " + scoreLeftWrist);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("left wrist x =" + leftWristx + "left wrist y=" + leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("right wrist x =" + rightWristx + "right wrist y=" + rightWristy);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
     
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristx, leftWristy, 20);
        InNumberleftWristY = Number(leftWristy);
        remove_decimals = floor(InNumberleftWristY);
        probability = remove_decimals/500;
        document.getElementById("song").innerHTML = "song = " + song2;
        song2.play();
        song.stop();
    
        if( "status" == false)
    {
        song2.play();
        document.getElementById("status").innerHTML= "song = " + song;    
    }
}
    }
   
    

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("Musical.mp3")
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

