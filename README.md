# Ctx3d
HTML5 Canvas library adding a z-index and 3D rotations to the basic draw functions


## Initialization
#### HTML:
```
<script src="myurltoctx3d.js"></script>
<canvas id="myCanvas"></canvas>
```
#### JavaScript:
```
var c = document.getElementById("myCanvas");
Ctx3d.context = c.getContext("2d");

Ctx3d.fillStyle = "white";
Ctx3d.strokeStyle = "red";
```


## 3D space
All coordinates originate from the middle of the canvas

(2d Graph)

A positive z-index moves towards the camera, and away if negative. The scale of this can be changed with `Ctx3d.perspective`. The default is 700.
A positive y-index moves downwards and negative moves upwards.

(3D graph)

The y-index may be flipped using `Ctx3d.invertedY = true;` if that space is more comfortable.

`Ctx3d.rotationX`, `Ctx3d.rotationY`, and `Ctx3d.rotationZ` apply rotations to the entire stage around the middle.


## All Properties and Methods
* context=null
* fillStyle="black"
* strokeStyle="black"
* perspective=700
* invertedY=false
* rotationX=0
* rotationY=0
* rotationZ=0
* beginPath()
* closePath()
* fill()
* stroke()
* moveTo(x, y, z)
* lineTo(x, y, z)
* clearRect(x, y, width, height)
* rect(x, y, z, width, height, rotX, rotY, rotZ)
* rect3d(x, y, z, width, height, depth, rotX, rotY, rotZ)
* arc(x, y, z, rotX, rotY, rotZ, radius, startAngle, endAngle, counterclockwise=false)
* applyrotation(x, y, z, rotX, rotY, rotZ)
* convert3dto2d(x, y, z)

## Draw Functions

#### moveTo(x, y, z)
#### lineTo(x, y, z)


Example:
```
setInterval(draw, 10);
function draw() {
  Ctx3d.clearRect(0, 0, c.width, c.height);
  Ctx3d.beginPath();
  Ctx3d.moveTo(-50, 0, -50);
  Ctx3d.lineTo(50, 0, -50);
  Ctx3d.lineTo(0, 0, 50);
  Ctx3d.lineTo(-50, 0, -50);
  Ctx3d.lineTo(0, -75, 0);
  Ctx3d.lineTo(50, 0, -50);
  Ctx3d.moveTo(0, -75, 0);
  Ctx3d.lineTo(0, 0, 50);
  Ctx3d.stroke();
}

document.addEventListener("mousemove", function() {
  Ctx3d.rotationY = (event.clientX - c.width / 2) * 0.01;
  Ctx3d.rotationX = (event.clientY - c.height / 2) * -0.01;
});
```
![ezgif-2-4689ae5cbaeb](https://user-images.githubusercontent.com/66077830/126022867-2edfb166-9ea1-43b1-a639-b2db7bcd8243.gif)


#### rect(x, y, z, width, height, rotX, rotY, rotZ)


Example:
```
setInterval(draw, 10);
function draw() {
  Ctx3d.clearRect(0, 0, c.width, c.height);
  Ctx3d.beginPath();
  Ctx3d.rect(-100, -50, 50, 200, 100, 0, 0, 0)
  Ctx3d.rect(-100, -50, 50, 200, 100, 0, Math.PI * 0.5, 0)
  Ctx3d.fill();
  Ctx3d.stroke();
}

document.addEventListener("mousemove", function() {
  Ctx3d.rotationY = (event.clientX - c.width / 2) * 0.01;
  Ctx3d.rotationX = (event.clientY - c.height / 2) * -0.01;
});
```
![ezgif-2-aaffee67261d](https://user-images.githubusercontent.com/66077830/126022874-56f7ab0d-7d19-4300-9b49-b41f5550fae9.gif)


#### rect3d(x, y, z, width, height, depth, rotX, rotY, rotZ)
> Not reccomended - only draws edges, NOT 6 faces. Use rect() for that
```
setInterval(draw, 10);
function draw() {
  Ctx3d.clearRect(0, 0, c.width, c.height);
  Ctx3d.beginPath();
  Ctx3d.rect3d(0, 0, 0, 50, 50, 30, 0, 0, 0)
  Ctx3d.stroke();
}

document.addEventListener("mousemove", function() {
  Ctx3d.rotationY = (event.clientX - c.width / 2) * 0.01;
  Ctx3d.rotationX = (event.clientY - c.height / 2) * -0.01;
});
```
![ezgif-2-c91507f101e2](https://user-images.githubusercontent.com/66077830/126022876-3efd6bdd-1364-4693-be79-d0b6d937902c.gif)


#### arc(x, y, z, rotX, rotY, rotZ, radius, startAngle, endAngle, counterclockwise=false)
```
setInterval(draw, 10);
function draw() {
  Ctx3d.clearRect(0, 0, c.width, c.height);
  Ctx3d.beginPath();
  Ctx3d.arc(0, 0, 0, 0, 0, 0, 50, 0, Math.PI);
  Ctx3d.closePath();
  Ctx3d.fill();
  Ctx3d.stroke();
}

document.addEventListener("mousemove", function() {
  Ctx3d.rotationY = (event.clientX - c.width / 2) * 0.01;
  Ctx3d.rotationX = (event.clientY - c.height / 2) * -0.01;
});
```
![ezgif-2-d82106ec5769](https://user-images.githubusercontent.com/66077830/126022880-58ec2cf8-e6ad-4678-b71d-286a8588fcbd.gif)


## Additional Functions

#### applyrotation(x, y, z, rotX, rotY, rotZ)
Applies specified rotations to a 3D vector, and returns the new coordinates in 3D space

#### convert3dto2d(x, y, z)
Applies stage rotation to the 3D vector, and returns the projected 2D coordinates

**Other Canvas properties or 2D methods can be accessed through `Ctx3d.context`**
```
Ctx3d.context.lineWidth = 5;
Ctx3d.context.moveTo(50, 50);
Ctx3d.context.drawImage("image.png", 0, 0);
```
