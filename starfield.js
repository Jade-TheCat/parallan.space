function Starfield() {
    this.fps = 30;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
    this.minVelocity = 15;
    this.maxVelocity = 30;
    this.stars = 100;
    this.intervalId = 0;
}

function Star(x, y, size, velocity, direction) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = velocity;
    this.direction = direction;
}

Starfield.prototype.initialise = function(div) {
    var self = this;
    this.containerDiv = div;
    self.width = window.innerWidth;
    self.height = window.innerHeight;
    window.addEventListener('resize', function resize(event) {
        self.width = window.innerWidth;
        self.height = window.innerHeight;
        self.canvas.height = self.height;
        self.canvas.width = self.width;
        self.draw();
    });

    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
}

Starfield.prototype.start = function() {
    var stars = [];
    for (var i=0; i<this.stars; i++) {
        var x = Math.random()*this.width;
        var y = Math.random()*this.height;
        stars[i] = new Star(x, 
            y, Math.random()*3+1,
            (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity,
            [Math.random()*(x > (this.width/2) ? 1 : -1), Math.random()*(y > (this.height/2) ? 1 : -1)]);
    }
    this.stars = stars;
    var self = this;
    this.intervalId = setInterval(function() {
        self.update();
        self.draw();
    }, 1000/this.fps);
};

Starfield.prototype.update = function() {
    var dt = 1 / this.fps;
    for (var i=0; i<this.stars.length; i++) {
        var star = this.stars[i];
        star.x += dt * star.velocity * star.direction[0];
        star.y += dt * star.velocity * star.direction[1];
        if (star.y > this.height || star.y < 0 || star.x < 0 || star.x > this.width) {
            var x = Math.random() * (((this.width/2)+2) - ((this.width/2)-2)) + ((this.width/2)-2)
            var y = Math.random() * (((this.height/2)+2) - ((this.height/2)-2)) + ((this.height/2)-2)
            this.stars[i] = new Star(x, y,
                Math.random()*3+1,
                (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity,
                [Math.random()*(x > (this.width/2) ? 1 : -1), Math.random()*(y > (this.height/2) ? 1 : -1)]);
        }
    }
}

Starfield.prototype.draw = function() {
    var ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fillStyle = '#ffffff';
    for (var i=0; i<this.stars.length; i++) {
        var star = this.stars[i];
        ctx.fillRect(star.x, star.y, star.size, star.size);
    }
};