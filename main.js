img="";
status ="";
objects = [];

function preload() {
img = loadImage("baby-found.jpg");
}

function setup() {

    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('Cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "status : Detecting object";  
}

function modelLoaded() {

    console.log("Model loaded!")
    status =true;
}

function gotResult(error,results) {

    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}



function draw() {
    image(video,0, 0, 380, 380);

    if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status : Object Dectected";
            document.getElementById("number_of_objects").innerHTML = "Baby found " + objects,length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}