function Starfield() {
    this.fps = 60;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
    this.minVelocity = 0.5;
    this.maxVelocity = 1;
    this.stars = 200;
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
        var direction_rad = Math.atan2(y - (this.height/2), x - (this.width/2));
        var direction_vec = [Math.cos(direction_rad), Math.sin(direction_rad)];
        stars[i] = new Star(x, 
            y, Math.random()*3+1,
            (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity,
            direction_vec);
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
        var middle_x = this.width/2
        var middle_y = this.height/2
        var dist = Math.sqrt(Math.pow(star.x - middle_x, 2) + Math.pow(star.y - middle_y, 2));
        star.x += dt * (star.velocity * (dist/2)) * star.direction[0];
        star.y += dt * (star.velocity * (dist/2)) * star.direction[1];
        if (star.y > this.height || star.y < 0 || star.x < 0 || star.x > this.width) {
            var x = getRandomArbitrary((this.width/2)-(this.width/10), (this.width/2)+(this.width/10))
            var y = getRandomArbitrary((this.height/2)-(this.height/10), (this.height/2)+(this.height/10))
            var direction_rad = Math.atan2(y - (this.height/2), x - (this.width/2));
            var direction_vec = [Math.cos(direction_rad), Math.sin(direction_rad)];
            this.stars[i] = new Star(x, y,
                Math.random()*3+1,
                (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity,
                direction_vec);
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

function getRandomArbitrary(min, max) {
    return Math.random() * (max-min)+min;
}