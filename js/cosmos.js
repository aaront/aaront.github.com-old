var canvas = document.getElementById("canvas"),
	loop,
	ie = new Image(),
	ctx = canvas.getContext("2d"),
	cWidth = window.innerWidth,
	cHeight = window.innerHeight,
	INTERVAL = 150,
	stars = [],
	initCanvas = function() {
		canvas.height = cHeight;
		canvas.width = cWidth;
		ctx.globalCompositeOperation = 'destination-over';
	},
	initStars = function() {
		for(var i = 0; i < 150; i++) {
	        stars[i] = new Star();
	        stars[i].reset();
	    }
	},
	draw = function() {
		ctx.clearRect(0, 0, cWidth, cHeight);
		for(var i = 0; i < stars.length; i++) {
	        stars[i].fade();
	        stars[i].draw();
	    }
	};


function Star() {
    this.origRt = 1;
    this.reset = function() {
        this.x = (cWidth - 5) * Math.random();
        this.y = (cHeight - 5) * Math.random();
        this.r = (4 * Math.random()) + 1;
        this.hl = (12000 / INTERVAL) * (this.r / 4);
        this.rt = Math.random() * this.hl;
        this.origRt = Math.random() + 1;
        this.stop = Math.random() * .2 + .4;
    }
    this.fade = function() {
        this.rt += this.origRt;
    }
    this.draw = function() {
        if (this.rt <= 0 || this.rt >= this.hl) this.origRt = this.origRt * -1;
        var new_opacity = 1 - (this.rt/this.hl);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.closePath();
        var cr = this.r * new_opacity;
		g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        g.addColorStop(0.0, 'rgba(255,255,255,' + new_opacity +')');
        g.addColorStop(this.stop, 'rgba(77,101,181,' + (new_opacity*.6) + ')');
        g.addColorStop(1.0, 'rgba(77,101,181,0)');
        ctx.fillStyle = g;
        ctx.fill();
    }
}

snack.ready(function() {
	initCanvas();
	initStars();
	loop = setInterval(draw, INTERVAL);

	snack.listener({node: window, event: "resize"}, function() {
		clearInterval(loop);
		cWidth = window.innerWidth;
		cHeight = window.innerHeight;
		initCanvas();
		initStars();
		loop = setInterval(draw, INTERVAL);
	});
});