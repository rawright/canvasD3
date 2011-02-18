// annimation1.js

var a3 = {
    'x' : -20,
    'y' : 4,
    'z' : 0,
    'unit' : 1,
    'timer' : null,
    'canvas' : null,
    'count' : 0,
    'walk' : null,
    
    'init' : function() {
        var c;        
    
        a3.canvas = new CanvasD3('annimation1');
        c = a3.canvas;
        //c.getCanvas('annimation');
        c.setUnit(10);
        c.setCartesian(true);
        c.setOrigin(20, -3, 0);
        a3.walk = document.getElementById('walk');
        //document.getElementById(id)
        addEvent(a3.walk, 'click', a3.drawMan);
        a3.drawMan(1);
    },
    
    'drawMan' : function(direction) {
        var c = a3.canvas,
            unit = a3.unit,
            headX = a3.x,
            headY = a3.y + 15 * unit,
            spineY = headY - 1.0 * unit,
            armY = spineY - 0.5 * unit,
            legY = spineY - 6.0 * unit,
            z = a3.z,
            rightFoot,
            leftFoot,
            foot = [[-2, -1, 0, 1, 2, 1, 0, -1],
                    [2, 1, 0, -1, -2, -1, 0, 1]];
        rightFoot = foot[0][a3.count % 8] * unit;
        leftFoot = foot[1][a3.count % 8] * unit;
        a3.count += 1;
        c.clearCanvas();
        c.context.fillStyle = 'rgb(0,0,200)';
        c.context.beginPath();
        direction = direction === 1 ? 1 : -1;
        a3.x += unit * direction;
        //a3.y += .2;
        //a3.z += 1;
        c.drawCircle(headX, headY, z, unit);
        c.drawLine(headX, spineY, z, headX, spineY-unit*6, z); // Spine
        c.drawLine(headX, armY, z, headX + rightFoot, armY-unit*6, z);
        c.drawLine(headX, armY, z, headX + leftFoot, armY-unit*5.5, z);
        c.drawLine(headX, legY, z, headX + rightFoot, legY-unit*8, z); // Right leg
        c.drawLine(headX, legY, z, headX + leftFoot, legY-unit*7.5, z); // Left leg
        c.drawLine(headX + rightFoot, legY-unit*8, z, headX + rightFoot + unit*1, legY-unit*8, z); // Right foot
        c.drawLine(headX + leftFoot, legY-unit*7.5, z, headX + leftFoot + unit*1, legY-unit*7.5, z); // Left foot
        
        c.drawCube(a3.x + 5, a3.y, a3.z, 5);
        c.stroke();
        if(a3.count < 25) {
            a3.timer = 
                setTimeout("a3.drawMan(1)",(1000/15));
        }
        
    }
};

window.onload=a3.init;
