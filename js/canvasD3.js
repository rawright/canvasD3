/**
canvasD3.js provides 3D simulation for sever canvas line and curve
drawing functions. It also adds a few shortcut functions to replace
repetitive calls.
@author <a href="mailto:rich@ghostdeveloper.com">Rich Wright</a>
*/

/**
Instatiate canvasD3 by passing in the id of the canvas element
@function {}
@param {string} canvas element id
@returns CanvasD3 instance or undefined if not a canvas element
*/
var CanvasD3 = function(id) {
    this.canvas = document.getElementById(id);
    this.context = null;
    this.width = 0;
    this.height = 0;
    this.unit = 1;
    this.cartesian = false;
    this.origin = {'x' : 0, 'y' : 0, 'z' : 0};
    this.current = {'x' : 0, 'y' : 0, 'z' : 0};

    if(this.canvas.getContext) {
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.setCartesian(true);
        this.setUnit(1);
        this.setOrigin(0, 0, 0);
        this.moveTo(0, 0, 0);        
        return this;
    }
};

/**
Sets the x, y, z unit size. Any value of x, y, z is multiplied
by unit.
@function
@param {number} unit - new unit value
@returns {object} current position x, y, z
*/    
CanvasD3.prototype.setUnit = function(unit) {
    this.unit = unit;
    return this.moveTo(this.current.x, this.current.y, this.current.z);
};

/**
Sets point of origin for x, y, z. Origin will be adjusted at execution
time by multiplying each coordinte times the unit value.
@function
@param {number} x - x coordinate origin
@param {number} y - y coordinate origin
@param {number} z - z coordinate origin
@returns {object} current position x, y, z (0, 0, 0)
*/
CanvasD3.prototype.setOrigin = function(x, y, z) {
    this.origin.x = x;
    this.origin.y = y;
    this.origin.z = z;
    return this.moveTo(0, 0, 0);
};

/**
Sets the coordinate system to Cartesian (if true) or the normal canvase 
coordinate system (if false). If Cartesian, the y coordinate increases
from the bottom of the canvas upward. If not Cartesian, the y coordinate
increases from the top of the canvas downward.
@function
@param {boolean} cartesian - true sets to Cartesian coordinates. True is
the default when canvasD3 is instatiated.
@returns {object} current position x, y, z
*/
CanvasD3.prototype.setCartesian = function(cartesian) {
    this.cartesian = cartesian;
    return this.current;
};

/**
Sets the value of current position to x, y, z
@function
@param {number} x - x coordinate
@param {number} y - y coordinate
@param {number} z - z coordinate
@returns {object} current position x, y, z (x, y, z)
*/
CanvasD3.prototype.setCurrent = function(x, y, z) {
    this.current.x = x;
    this.current.y = y;
    this.current.z = z;
    return this.current;
};

/**
Positions the drawing tool to a point on the canvas.
@function
@param {number} x - x coordinate
@param {number} y - y coordinate
@param {number} z - z coordinate
@returns {object} current position x, y, z (x, y, z)
*/
CanvasD3.prototype.moveTo = function(x, y, z) {
    var p = this.getPoint(x, y, z);
    this.context.moveTo(p.x, p.y);
    return this.setCurrent(x, y, z);
};

/**
Draws a line from the current canvas position to the point referenced
by x, y, z.
@function
@param {number} x - x coordinate
@param {number} y - y coordinate
@param {number} z - z coordinate
@returns {object} current position x, y, z (x, y, z)
*/
CanvasD3.prototype.lineTo = function(x, y, z) {
    var p = this.getPoint(x, y, z);
    this.context.lineTo(p.x, p.y);
    return this.setCurrent(x, y, z);
};

/**
Draws an arc of radius r from the center point referenced
by x, y, z from radian start to radian end in the direction indicated
@function
@param {number} x - x coordinate of center
@param {number} y - y coordinate of center
@param {number} z - z coordinate of center
@param {number} start - starting position of arc in radians
@param {number} end - ending position of arc in radians
@param {boolean} counterclockwise - direction to draw the arc
@returns {object} current position x, y, z (x, y, z)
*/
CanvasD3.prototype.arc = function(x, y, z, r, start, end, counterclockwise) {
    var p = this.getPoint(x, y, z, r);
    this.context.arc(p.x, p.y, p.r, start, end, counterclockwise);
    return this.moveTo(x, y, z);
};

/**
Clears a rectagular area of the canvas as defined by the two 
opposit corners x1, y1, z1 and x2, y2, z2
@function
@param {number} x1 - x1 coordinate
@param {number} y1 - y1 coordinate
@param {number} z1 - z1 coordinate
@returns {object} current position x, y, z (x1, y1, z1)
*/
CanvasD3.prototype.clearRect = function(x1, y1, z1, x2, y2, z2) {
    var p1 = this.getPoint(x1, y1, z1),
        p2 = this.getPoint(x2, y2, z2);
    this.context.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    return this.moveTo(x1, y1, z1);
};

/**
Clears the entire canvas
@function
@returns {object} current position x, y, z (0, 0, 0)
*/
CanvasD3.prototype.clearCanvas = function() {
    this.context.clearRect(-this.origin.x,
        -this.origin.y,
        this.width,
        this.height);
    return this.moveTo(0, 0, 0);
};

/**
Draws a line from coordinates x1, y1, z1 to x2, y2, z2 
@function
@param {number} x1 - x1 coordinate
@param {number} y1 - y1 coordinate
@param {number} z1 - z1 coordinate
@returns {object} current position x, y, z (x2, y2, z2)
*/
CanvasD3.prototype.drawLine = function(x1, y1, z1, x2, y2, z2) {
    this.moveTo(x1, y1, z1);
    return this.lineTo(x2, y2, z2);
};

/**
Draws a line from coordinates x, y, z of width l
Cube begins at the lower, left, front corner
@function
@param {number} x - x coordinate
@param {number} y - y coordinate
@param {number} z - z coordinate
@returns {object} current position x, y, z (x, y, z)
*/
CanvasD3.prototype.drawCube = function(x, y, z, l) {
    this.drawRect(x, y, z, x + l, y + l, z);
    this.drawRect(x, y, z + l, x + l, y + l, z + l);
    this.drawLine(x, y, z, x, y, z + l);
    this.drawLine(x + l, y, z, x + l, y, z + l);
    this.drawLine(x, y + l, z, x, y + l, z + l);
    this.drawLine(x + l, y + l, z, x + l, y + l, z + l);
    return this.moveTo(x, y, z);
};

/**
Draws a rectangle from coordinates x1, y1, z1 through opposite
corner x2, y2, z2 
@function
@param {number} x1 - x1 coordinate
@param {number} y1 - y1 coordinate
@param {number} z1 - z1 coordinate
@returns {object} current position x, y, z (x1, y1, z1)
*/
CanvasD3.prototype.drawRect = function(x1, y1, z1, x2, y2, z2) {
    this.moveTo(x1, y1, z1);
    this.lineTo(x2, y1, z1);
    this.lineTo(x2, y2, z2);
    this.lineTo(x1, y2, z2);
    return this.lineTo(x1, y1, z1);
};

/**
Draws a circle with center coordinates x, y, z and radius r
@function
@param {number} x - x coordinate
@param {number} y - y coordinate
@param {number} z - z coordinate
@returns {object} current position x, y, z (x, y, z the center point)
*/
CanvasD3.prototype.drawCircle = function(x, y, z, r) {
    this.moveTo(x + r, y, z);
    return this.arc(x, y, z, r, 0, Math.PI * 2, true);
};

/**
Draws a circle with center coordinates x, y, z and radius r
@function
@param {number} x - x coordinate
@param {number} y - y coordinate
@param {number} z - z coordinate
@returns {object} current position x, y, z (x, y, z the center point)
*/
CanvasD3.prototype.stroke = function() {
    this.context.stroke();
    return this.current;
};

/**
Calculates the screen coordintes that should replace the logical
coordinates x, y, z. If r (radius) is present, it will return an adjusted
value for that as well.
Adjustments are for unit, the origin, the coordinate type, and for 
the 3D effect. The 3D effect tends to skew points back toward the
center of the screen. This skewing increases with the distance of the
point from the front of the screen. All drawing functions execute this
function to replace logical coordinates with physical coordinates.
@function
@param {number} x - x logical coordinate
@param {number} y - y logical coordinate
@param {number} z - z logical coordinate
@param {number} r - radius (optional)
@returns {object} current physical coordinates x, y, z and r for radius
*/
CanvasD3.prototype.getPoint = function(x, y, z, r) {
    var dx, dy, dz,
        hx = this.width / 2,
        hy = this.height / 2,
        hz = 800,
        p = {
            'x' : x === undefined ? 0 : x,
            'y' : y === undefined ? 0 : y,
            'z' : z === undefined ? 0 : z,
            'r' : r === undefined ? 0 : r
            };

    // Adjust coordinates for unit value and coordinate system
    p.x = p.x * this.unit + this.origin.x * this.unit;
    p.y = p.y * this.unit + this.origin.y * this.unit;
    p.y = this.cartesian ? this.height - p.y : p.y;
    p.z = p.z * this.unit - this.origin.z * this.unit;
    p.r *= this.unit;
    
    // Adjust coordinates for 3D effect
    dx = p.x - hx;
    dy = p.y - hy;
    dz = p.z - this.origin.z * this.unit;
    p.x = p.x - (dz * dx / (hz + dz));        
    p.y = p.y - (dz * dy / (hz + dz));
    p.r -= dz * p.r / (hz + dz);        
        
    return p;
};
    