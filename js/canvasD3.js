// CanvasD3.js - 3d canvas
//  @author <a href="mailto:rich@ghostdeveloper.com">Rich Wright</a>
//  The canvasD3 object allows the simulation of 3D when outputting
//  lines and arcs to a canvas element

var CanvasD3 = function(id) {
    this.canvas = null;
    this.context = null;
    this.width = 0;
    this.height = 0;
    this.unit = 1;
    this.cartesian = false;
    this.origin = {'x' : 0, 'y' : 0, 'z' : 0};
    this.horizon = {'x' : 0, 'y' : 0, 'z' : 0};
    return this.getCanvas(id);
};
    
    
// Initialize the object with the getCanvas method
// id should be the id of a canvas-type element
// If a canvas is supported, a pointer to this object will be returned,
// else the return will be undefined
CanvasD3.prototype.getCanvas = function(id) {
    this.canvas = document.getElementById(id);
    if(this.canvas.getContext) {
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Flip coordinate system to Cartesian with the origin
        // at the bottom left corner of the canvas
        //this.context.scale(1, -1);
        //this.context.translate(0, this.height * -1);
        this.cartesian = true;
        
        // Set origin to lower left corner
        this.origin.x = 0;
        this.origin.y = 0;
        this.origin.z = 0;
        
        // Set initial horizon position
        // Position is relative to origin
        this.horizon.x = this.width / 2;
        this.horizon.y = this.height / 4;
        this.horizon.z = -100; // toward viewer
        
        // Save current settings and return
        //this.context.save();
        return this;
    }          
};

// @param {float} unit Unit value
CanvasD3.prototype.setUnit = function(unit) {
    this.unit = unit;
};

// Set the origin relative to the bottom left corner of the canvas
CanvasD3.prototype.setOrigin = function(x, y, z) {
    this.origin.x = x;
    this.origin.y = y;
    this.origin.z = z;
};

// Set the coordinate system to Cartesian
// @param {boolean} cartesian Set to true for cartesian coordinates
CanvasD3.prototype.setCartesian = function(cartesian) {
    this.cartesian = cartesian;
};

// Move to a location on the canvas relative to the origin
// getPoint adjusts x and y for the value of z in 2D
CanvasD3.prototype.moveTo = function(x, y, z) {
    var p = this.getPoint(x, y, z);
    this.context.moveTo(p.x, p.y);
};

// Draw a line from the current location
CanvasD3.prototype.lineTo = function(x, y, z) {
    var p = this.getPoint(x, y, z);
    this.context.lineTo(p.x, p.y);
};

// Draw an arc (if the current location is not on the arc,
// this method will draw a line to the arc's beginning location)
// x, y, z are the center of the circle
// r is the radius of the circle
// start and end are the radian begin and end points
// counterclockwize is a boolean indicating which direction
// to draw the arc (counter clockwise if true and clockwise if false)
CanvasD3.prototype.arc = function(x, y, z, r, start, end, counterclockwise) {
    var p = this.getPoint(x, y, z, r);
    this.context.arc(p.x, p.y, p.r, start, end, counterclockwise);
};

// Clear a rectangular area
CanvasD3.prototype.clearRect = function(x1, y1, z1, x2, y2, z2) {
    var p1 = this.getPoint(x1, y1, z1),
        p2 = this.getPoint(x2, y2, z2);
    this.context.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
};

// Clear the entire canvas
CanvasD3.prototype.clearCanvas = function() {
    this.context.clearRect(-this.origin.x, -this.origin.y,
        this.width, this.height);
};

// Move to starting coordinates and draw line to ending coordinates
CanvasD3.prototype.drawLine = function(x1, y1, z1, x2, y2, z2) {
    this.moveTo(x1, y1, z1);
    this.lineTo(x2, y2, z2);
};

// Draw a cube with front lower corner at x, y, z
// and width equal to width
CanvasD3.prototype.drawCube = function(x, y, z, l) {
    this.drawRect(x, y, z, x + l, y + l, z);
    this.drawRect(x, y, z + l, x + l, y + l, z + l);
    this.drawLine(x, y, z, x, y, z + l);
    this.drawLine(x + l, y, z, x + l, y, z + l);
    this.drawLine(x, y + l, z, x, y + l, z + l);
    this.drawLine(x + l, y + l, z, x + l, y + l, z + l);

};

// Draw a rectangle
CanvasD3.prototype.drawRect = function(x1, y1, z1, x2, y2, z2) {
    this.moveTo(x1, y1, z1);
    this.lineTo(x2, y1, z1);
    this.lineTo(x2, y2, z2);
    this.lineTo(x1, y2, z2);
    this.lineTo(x1, y1, z1);
};

// Move to a point on the circle and then draw the circle
CanvasD3.prototype.drawCircle = function(x, y, z, r) {
    this.moveTo(x + r, y, z);
    this.arc(x, y, z, r, 0, Math.PI * 2, true);
};

// stroke actual draws the lines and arcs previously defined
CanvasD3.prototype.stroke = function() {
    this.context.stroke();
};

// getPoint adjusts coordinates x, y, z based upon z and
// the horizon relative to the origin
// x and y will be pulled closer to the origin if z is not zero
// The amount of the pull will be propotional to the distance
// of x and y from the origin
// @param {Float} x coordinate
// @param {Float} y coordinate
// @param {Float} z coordinate
// @param {Float} r radius (optional)
// @returns {Object} x, y, z, r (float)
CanvasD3.prototype.getPoint = function(x, y, z, r) {
    var dx, dy, dz,
        hx = this.width / 2,
        hy = this.height / 2,
        hz = 400,
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
    