var Ctx3d = {
  context: null,
  fillStyle: "black",
  strokeStyle: "black",
  perspective: 700,
  invertedY: false,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  applyrotation: function(x, y, z, rotX, rotY, rotZ) {
    var cosa = Math.cos(rotZ);
    var sina = Math.sin(rotZ);
    var cosb = Math.cos(rotY);
    var sinb = Math.sin(rotY);
    var cosc = Math.cos(rotX);
    var sinc = Math.sin(rotX);
    var Axx = cosa*cosb;
    var Axy = cosa*sinb*sinc - sina*cosc;
    var Axz = cosa*sinb*cosc + sina*sinc;
    var Ayx = sina*cosb;
    var Ayy = sina*sinb*sinc + cosa*cosc;
    var Ayz = sina*sinb*cosc - cosa*sinc;
    var Azx = -sinb;
    var Azy = cosb*sinc;
    var Azz = cosb*cosc;
    newx = Axx*x + Axy*y + Axz*z;
    newy = Ayx*x + Ayy*y + Ayz*z;
    newz = Azx*x + Azy*y + Azz*z;
    return([newx, newy, newz]);
  },
  convert3dto2d: function(x, y, z) {
    newcoords = this.applyrotation(x, y * (this.invertedY ? -1 : 1), z, this.rotationX, this.rotationY, this.rotationZ);

    var middle = [this.context.canvas.clientWidth / 2, this.context.canvas.clientHeight / 2];
    var pers = this.perspective / (this.perspective - newcoords[2])
    if (newcoords[2] > this.perspective) {
      pers = 1000000;
    }
    var newx = ((newcoords[0]) * pers) + middle[0];
    var newy = ((newcoords[1]) * pers) + middle[1];

    return([newx, newy]);
  },
  beginPath: function() {
    this.context.beginPath();
  },
  closePath: function() {
    this.context.closePath();
  },
  moveTo: function(x, y, z) {
    newpos = this.convert3dto2d(x, y, z);
    this.context.moveTo(newpos[0], newpos[1]);
  },
  lineTo: function(x, y, z) {
    newpos = this.convert3dto2d(x, y, z);
    this.context.lineTo(newpos[0], newpos[1]);
  },
  fill: function() {
    this.context.fillStyle = this.fillStyle;
    this.context.fill();
  },
  stroke: function() {
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke();
  },
  clearRect: function(x, y, w, h) {
    this.context.clearRect(x, y, w, h);
  },
  rect: function(x, y, z, width, height, rotX, rotY, rotZ) {
    //4 points
    coords = [[x, y, z], [x + width, y, z], [x + width, y + height, z], [x, y + height, z]];
    var v1 = this.applyrotation(0, 0, 0, rotX, rotY, rotZ);
    var v2 = this.applyrotation(width, 0, 0, rotX, rotY, rotZ);
    var v3 = this.applyrotation(width, height, 0, rotX, rotY, rotZ);
    var v4 = this.applyrotation(0, height, 0, rotX, rotY, rotZ);
    this.moveTo(v1[0] + x, v1[1] + y, v1[2] + z);
    this.lineTo(v2[0] + x, v2[1] + y, v2[2] + z);
    this.lineTo(v3[0] + x, v3[1] + y, v3[2] + z);
    this.lineTo(v4[0] + x, v4[1] + y, v4[2] + z);
    this.lineTo(v1[0] + x, v1[1] + y, v1[2] + z);
  },
  rect3d: function(x, y, z, width, height, depth, rotX, rotY, rotZ) {
    //4 points
    coords = [[x, y, z], [x + width, y, z], [x + width, y + height, z], [x, y + height, z], [x, y, z + depth], [x + width, y, z + depth], [x + width, y + height, z + depth], [x, y + height, z + depth]];
    var v1 = this.applyrotation(0, 0, 0, rotX, rotY, rotZ);
    var v2 = this.applyrotation(width, 0, 0, rotX, rotY, rotZ);
    var v3 = this.applyrotation(width, height, 0, rotX, rotY, rotZ);
    var v4 = this.applyrotation(0, height, 0, rotX, rotY, rotZ);
    var v5 = this.applyrotation(0, 0, depth, rotX, rotY, rotZ);
    var v6 = this.applyrotation(width, 0, depth, rotX, rotY, rotZ);
    var v7 = this.applyrotation(width, height, depth, rotX, rotY, rotZ);
    var v8 = this.applyrotation(0, height, depth, rotX, rotY, rotZ);
    //moveto 1, 2, 3, 4, 1, 5, 6, 7, 8, 5, moveto 2, 6, moveto 4, 8, moveto 3, 7
    this.moveTo(v1[0] + x, v1[1] + y, v1[2] + z);
    this.lineTo(v2[0] + x, v2[1] + y, v2[2] + z);
    this.lineTo(v3[0] + x, v3[1] + y, v3[2] + z);
    this.lineTo(v4[0] + x, v4[1] + y, v4[2] + z);
    this.lineTo(v1[0] + x, v1[1] + y, v1[2] + z);
    this.lineTo(v5[0] + x, v5[1] + y, v5[2] + z);
    this.lineTo(v6[0] + x, v6[1] + y, v6[2] + z);
    this.lineTo(v7[0] + x, v7[1] + y, v7[2] + z);
    this.lineTo(v8[0] + x, v8[1] + y, v8[2] + z);
    this.lineTo(v5[0] + x, v5[1] + y, v5[2] + z);
    this.moveTo(v2[0] + x, v2[1] + y, v2[2] + z);
    this.lineTo(v6[0] + x, v6[1] + y, v6[2] + z);
    this.moveTo(v4[0] + x, v4[1] + y, v4[2] + z);
    this.lineTo(v8[0] + x, v8[1] + y, v8[2] + z);
    this.moveTo(v3[0] + x, v3[1] + y, v3[2] + z);
    this.lineTo(v7[0] + x, v7[1] + y, v7[2] + z);
  },
  arc: function(x, y, z, rotX, rotY, rotZ, radius, startAngle, endAngle, counterclockwise=false) {
    //make 10 points
    if (counterclockwise) {
      tmp = startAngle;
      startAngle = endAngle;
      endAngle = tmp;
    }
    startAngle = startAngle % (2 * Math.PI);
    if (startAngle > endAngle) {
      endAngle += 2 * Math.PI;
    }

    var arcp = 100;
    var points = [];
    //first point math
    var thisx = Math.cos(a * (2 * Math.PI / arcp)) * radius;
    var thisy = Math.sin(a * (2 * Math.PI / arcp)) * radius;
    var rpoints = this.applyrotation(thisx, thisy, z, rotX, rotY, rotZ);
    this.moveTo(rpoints[0] + x, rpoints[1] + y, rpoints[2] + z);
    for (var a = Math.floor((startAngle / (2 * Math.PI)) * arcp); a <= Math.ceil((endAngle / (2 * Math.PI)) * arcp); a++) {
      var thisx = Math.cos(a * (2 * Math.PI / arcp)) * radius;
      var thisy = Math.sin(a * (2 * Math.PI / arcp)) * radius;
      var rpoints = this.applyrotation(thisx, thisy, z, rotX, rotY, rotZ);
      this.lineTo(rpoints[0] + x, rpoints[1] + y, rpoints[2] + z);
    }
  }
}