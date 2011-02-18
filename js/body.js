// body.js

var parts = {

    head : [0, 8, 0, 1, 200],
    neck : [0, 7, 0, .25, 200],
    shoulder: [-1, 6.75, 0, 2, 0],
    rArm : [-1, 7,]
    'head' : {'x1' : 0, 'y1' : 0, 'len' : 0, 'grads' : 100 },
    'neck' : {'x1' : 0, 'y1' : 0, 'len' : 0, 'grads' : 300 },
    'spine' : {'x1' : 0, 'y1' : 0, 'len' : 0, 'grads' : 300 },
    'rArm' : {'x1' : 0, 'y1' : 0, 'len' : 0, 'grads' : 280 },
    'lArm' : {'x1' : 0, 'y1' : 0, 'len' : 0, 'grads' : 320 },
    'rLeg' : {'x1' : 0, 'y1' : 0, 'len' : 0, 'grads' : 280 },
    'lLeg' : {'x1' : 0, 'y1' : 0, 'len' : 0, 'grads' : 320 },
    'rFoot' : {'x1' : 0, 'y1' : 0, 'len' : 0, 'grads' : -80 },
    'lFoot' : {'x1' : 0, 'y1' : 0, 'len' : 0, 'grads' : 80 }
};

var body = {
    'assemble' : function(x, y, z) {
        parts.head.x1 = x;
        parts.head.x2 = y;
        
    }  
};
