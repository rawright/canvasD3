/**
stickman.js - stick man
*/

var Stickman = function(scale) {
    if(!(this instanceof Stickman)) {
        return new Stickman(scale);
    }
    this.scale = scale;
    this.head = scale * 1;
    this.neck = scale * 0.25;
    this.arm = scale * 3.5;
    this.spine = scale * 2.75;
    this.leg = scale * 4;
    this.foot = scale * 1;
    this.shoulder = {'x' : 0, 'y' : 6.75 * scale, 'z' : 0};
};

Stickman.prototype.stand = function(c) {
    var p, shd = this.shoulder, hip = {};
    shd.x = 0;
    shd.y = 6.75 * this.scale;
    shd.z = 0;
    p = this.drawLine(c, this.neck, shd.x, shd.y, shd.z, 100);
    this.drawCircle(c, this.head, p.x, p.y, p.z, 100);
    this.drawLine(c, this.arm, shd.x, shd.y, shd.z, 285);
    this.drawLine(c, this.arm, shd.x, shd.y, shd.z, 315);
    p = this.drawLine(c, this.spine, shd.x, shd.y, shd.z, 300);
    hip.x = p.x;
    hip.y = p.y;
    hip.z = p.z;
    p = this.drawLine(c, this.leg, hip.x, hip.y, hip.z, 285);
    this.drawLine(c, this.foot, p.x, p.y, p.z, 0);
    p = this.drawLine(c, this.leg, hip.x, hip.y, hip.z, 315);
    this.drawLine(c, this.foot, p.x, p.y, p.z, 0);
};

Stickman.prototype.drawLine = function(c, part, x, y, z, grads) {
    var p;
    
    p = c.drawLine(x, y, z,
        x + this.x(part, grads),
        y + this.y(part, grads),
        z);
    return p;
};

Stickman.prototype.drawCircle = function(c, part, x, y, z, grads) {
    var p;
    
    p = c.drawCircle(
        x + this.x(part / 2, grads),
        y + this.y(part / 2, grads),
        z,
        part / 2);
    return p;
};

Stickman.prototype.x = function (l, grads) {
    return Math.cos(Math.PI * 2 * grads / 400) * l;
};

Stickman.prototype.y = function(l, grads) {
    return Math.sin(Math.PI * 2 * grads / 400) * l;
};
