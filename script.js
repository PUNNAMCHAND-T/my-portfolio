const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = Math.max(document.body.scrollHeight, window.innerHeight); // Ensure canvas height covers the full page
canvas.width = width;
canvas.height = height;

const particles = [];
const numParticles = 180;
const particleAlpha = 0.7;
const lineColorBase = { r: 0, g: 100, b: 200 };
const lineAlpha = 0.3;
const maxSpeed = 2;
const minDistance = 150;
const particleMaxSize = 3;
const particleMinSize = 1;

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * maxSpeed;
        this.vy = (Math.random() - 0.5) * maxSpeed;
        this.radius = Math.random() * (particleMaxSize - particleMinSize) + particleMinSize;
        this.baseHue = Math.random() * 360;
        this.hueVariation = Math.random() * 30 - 15;
    }

    draw() {
        ctx.beginPath();
        const hue = this.baseHue + this.hueVariation;
        const color = `hsla(${hue}, 70%, 50%, ${particleAlpha})`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        const dampingFactor = 0.98;
        if (this.x < 0 || this.x > width) {
            this.vx *= -dampingFactor;
            this.x = this.x < 0 ? 0 : width;
        }
        if (this.y < 0 || this.y > height) {
            this.vy *= -dampingFactor;
            this.y = this.y < 0 ? 0 : height;
        }

        this.draw();
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                const alpha = 1 - (distance / minDistance);
                const lineColor = `rgba(${lineColorBase.r}, ${lineColorBase.g}, ${lineColorBase.b}, ${lineAlpha * alpha})`;
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = 0.8 * alpha;
                ctx.globalAlpha = alpha;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }
}

function animate() {
    // Dark background for better contrast
    ctx.fillStyle = '#0d1b2a'; // Deep navy blue
    ctx.fillRect(0, 0, width, height);

    for (const particle of particles) {
        particle.update();
    }
    connectParticles();
    requestAnimationFrame(animate);
}

function init() {
    particles.length = 0;
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
    animate();
}

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = Math.max(document.body.scrollHeight, window.innerHeight); // Adjust canvas height on resize
    canvas.width = width;
    canvas.height = height;
    init();
});

init();
