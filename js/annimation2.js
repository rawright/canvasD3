// annimation2.js
var x1;
(function(id) {
    var c = null;
    var init = function() {
        c = new CanvasD3(id);
        x1 = c;
        c.setUnit(5);
        c.setCartesian(true);
        c.setOrigin(0, 0, 0);
        for(var i = 0, x = 0, y = 0; i < 20; i += 1) {
            c.drawCube(x, y, 0, 3);
            x += 6;
            y += 1.4;
        }
        c.stroke();
        console.log(c.width, c.height);
    };
    
    addEvent(window, 'load', init);
})('annimation2');
