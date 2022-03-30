let availableColors = [
  'rgba(254, 148, 255, 0.5)', 
  'rgba(45, 250, 176, 0.5)', 
  'rgba(255, 92, 121, 0.5)', 
  'rgba(130, 128, 255, 0.5)'
];

let availableShapes = ['rectangle', 'circle', 'square'];


class Particle {
	constructor(parent) {
		this.parent = parent;
		this.gravity = parent.gravity;
		this.angle = random(parent.angle + 0.2, parent.angle - 0.2);
		this.init();
		this.shape = random(availableShapes);
		this.spinningSpeed = 0;
	}

	init() {
		this.position = this.parent.position.copy();
		this.position.x = this.parent.position.x;
		this.position.y = random(height, height + 200);
		this.velocity = random(10, 15);
		this.friction = .992;
		this.size = random(15, 30);
		this.half = this.size / 2;
		this.color = random(availableColors);
	}

	addMotion() {
		this.spinningSpeed = 0.5 + Math.sin(this.velocity * 10) * 0.5;

		translate(this.position.x, this.position.y);
		scale(1, this.spinningSpeed)
		rotate(this.velocity / 2);

		noStroke();
		fill(this.color);

		this.pickShape();

		resetMatrix();
	}

	update() {

		this.position.x += Math.cos(this.angle) * this.velocity;
		this.position.y -= Math.sin(this.angle) * this.velocity;
		this.velocity *= this.friction;

		this.position.add(this.gravity);

		if (this.position.y > height) {
			this.init();
		}
	}

	render() {
		this.update();
		this.addMotion();
	}

	pickShape() {
		if (this.shape === 'rectangle') {
	      this.rectangleShape(-this.half, -this.half, this.size * 2, this.size, 4);
	    } else if (this.shape === 'triangle') {
	      this.triangleShape(0, 0, 15, 0, 7, 15);
	    } else if (this.shape === 'circle') {
	      this.circleShape(0, 0, this.size, this.size);
	    } else if (this.shape === 'square') {
	      this.squareShape(0, 0, this.size, 5);

	    }
	}

	rectangleShape(x, y, width, height, radius) {
    	rect(x, y, width, height, radius);
	}

	circleShape(x, y, width, height) {
		ellipse(x, y, width, height);
    }

	triangleShape(x1, y1, x2, y2, x3, y3) {
    triangle(x1, y1, x2, y2, x3, y3);
	}

	squareShape(x, y, size, radius) {
		square(x, y, size, radius);
	}

}

class ConfettiCannon {
	constructor(particleAmount, position, angle) {
		this.position = position.copy();
		this.angle = angle;
		this.particleAmount = particleAmount;
		this.gravity = createVector(0, 5);
		this.particles = [];

		for (let i = 0; i < this.particleAmount; i++) {
			this.particles.push(new Particle(this));
		}
	}

	render() {
		this.particles.forEach(particle => particle.render())
	}
}
let confettiLeft;
let confettiRight;
function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(60);
	confettiLeft = new ConfettiCannon(100, createVector(0, height), 1.3);
	confettiRight = new ConfettiCannon(100, createVector(width, height), 2);
	
}

function draw() {
	background(color('#111'));
	confettiLeft.render();
	confettiRight.render();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	confettis.position = createVector(width / 2, -40);
}

function launchConfetti() {
	setup();
}
