// annimation2.js
(function(id) {
var c = null,
    man1 = null,
    man2 = null,
    man3 = null,
    util = ghostdeveloper.util,
    init = function() {
        c = new CanvasD3(id);
        c.clearCanvas();
        c.context.beginPath();
        man1 = new Stickman(1);
        man2 = new Stickman(.75);
        man3 = new Stickman(1.1);
        c.setUnit(20);
        c.setCartesian(true);
        c.setOrigin(5, 1, 0);
        c.setRotation(0, 0, 0, 0, 0, 0);
        man1.stand(c);
        c.setOrigin(10, 1, 0);
        c.setRotation(0, 0, 0, 0, 50, 0);
        man2.stand(c);
        c.setOrigin(15, 1, 0);
        c.setRotation(0, 0, 0, 0, 130, 0);
        man3.stand(c);
        c.stroke();
    };

util.addEvent(window, 'load', init);

})('annimation1');
