// JavaScript Document

var body = [
    ['c', 0, 7.5, 0, .5],              // Head
    ['l', 0, 7, 0, 0, 6.75, 0],     // Neck
    ['l', 0, 6.75, 0, -1, 4, 0],    // Right arm
    ['l', 0, 6.75, 0, 1, 4, 0],     // Left arm
    ['l', 0, 6.75, 0, 0, 4, 0],     // Spine
    ['l', 0, 4, 0, -1, 0, 0],       // Right leg
    ['l', -1, 0, 0, -1, 0, -1],     // Right foot
    ['l', 0, 4, 0, 1, 0, 0],        // Left Leg
    ['l', 1, 0, 0, 1, 0, -1]        // Right foot
];

var walk = [
    
];

var grads = 50;

(function(id) {
    var c = null,
        i;
    var init = function() {
        c = new CanvasD3(id),
        rotate = (Math.PI * 2) * grads / 400;
        console.log(rotate);
        x1 = c;
        c.setUnit(15);
        c.setCartesian(true);
        c.setOrigin(30, 1, 0);
        c.clearCanvas();
        for(i = 0; i < body.length; i++) {
            if(body[i][0] === 'l') {
                c.drawLine(
                    body[i][1] * Math.cos(rotate),
                    body[i][2],
                    body[i][3] * Math.sin(rotate),
                    body[i][4] * Math.cos(rotate),
                    body[i][5],
                    body[i][6] * Math.sin(rotate)
                    );
            } else if(body[i][0] === 'c') {
                c.drawCircle(
                    body[i][1],
                    body[i][2],
                    body[i][3],
                    body[i][4]
                );
            }
        }
        c.stroke();
        console.log(c.width, c.height);
    };
    
    addEvent(window, 'load', init);
})('annimation2');
