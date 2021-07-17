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
```


## 3D space
All coordinates originate from the middle of the canvas
(2d Graph)

A positive z-index moves towards the camera, and away if negative.
(3D graph)

The y-index may be flipped using `Ctx3d.invertedY = true;` if that space is more comfortable.

## Functions

#### moveTo(x, y, z)
#### lineTo(x, y, z)


Example:
```
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
```

#### rect(x, y, z, width, height, rotX, rotY, rotZ)


Example:
```
Ctx3d.beginPath();
Ctx3d.rect(-100, -50, 50, 200, 100, 0, 0, 0)
Ctx3d.rect(-100, -50, 50, 200, 100, 0, Math.PI * 0.5, 0)
Ctx3d.fill();
Ctx3d.stroke();
```

#### rect3d(x, y, z, width, height, depth, rotX, rotY, rotZ)
> Not reccomended - only draws edges, NOT 6 faces. Use rect() for that
```
var i = 0;
setInterval(spin, 10);
function spin() {
  Ctx3d.beginPath();
  Ctx3d.rect3d(0, 0, 0, 300, 300, 100, index * 0.01, index * 0.02, index * 0.03)
  Ctx3d.stroke();
  i++;
}
```
