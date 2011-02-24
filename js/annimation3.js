// annimation3.js

(function(id) { // id = canvas element id
    var self = {
        'util' : ghostdeveloper.util,
        'c' : null,
        'timer' : null,
        'grads' : 0,
        'count' : 0,
        'body' : [ // 'c', x, y, z, radius (c=circle)
                   // 'l', x1, y1, z1, x2, y2, z2 (l=line)
            ['c', 0, 7.5, 0, 0.5],       // Head
            ['l', 0, 7, 0, 0, 6.75, 0],  // Neck
            ['l', 0, 6.75, 0, -1, 4, 0], // Right arm
            ['l', 0, 6.75, 0, 1, 3, 0],  // Left arm
            ['l', 0, 6.75, 0, 0, 4, 0],  // Spine
            ['l', 0, 4, 0, -1, 0, 0],    // Right leg
            ['l', -1, 0, 0, -1, 0, -1],  // Right foot
            ['l', 0, 4, 0, 1, 0, 0],     // Left Leg
            ['l', 1, 0, 0, 1, 0, -4],     // Left foot
            ['l', -3,3,0,-1,3,0],
            ['l', -2, 2, 0, -2, 4, 0]
            ],
        
        'init' : function() {
            self.c = new CanvasD3(id);
            self.c.setUnit(15);
            self.c.setCartesian(true);
            self.c.setOrigin(30, 1, 0);
            self.util.addEvent(document.getElementById('walk2'),
                'click',annimation.drawBody);
            self.drawBody();
        },
        
        'drawBody' : function() {
            var i, ii;
            self.c.clearCanvas();
            self.c.context.beginPath();
            self.c.setRotation(0, 0, 0, 0, self.grads, 0);
            for(i = 0, ii = self.body.length; i < ii; i++) {
                if(self.body[i][0] === 'l') {
                    self.c.drawLine(
                        self.body[i][1],
                        self.body[i][2],
                        self.body[i][3],
                        self.body[i][4],
                        self.body[i][5],
                        self.body[i][6]
                        );
                } else if(self.body[i][0] === 'c') {
                    self.c.drawCircle(
                        self.body[i][1],
                        self.body[i][2],
                        self.body[i][3],
                        self.body[i][4]
                    );
                }
            }
            self.c.stroke();
            self.grads += 10;
            if(self.count < 20) {
                self.count += 1;
                self.grads += 10;
                self.timer = 
                    setTimeout(annimation.drawBody,(1000/5));
            }
        }
        
    };
    window.annimation = self;
    
    self.util.addEvent(window, 'load', self.init);
}('annimation2'));
