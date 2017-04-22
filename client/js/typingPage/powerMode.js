const canvas = $('#canvas');
const w = canvas.width();
const h = canvas.height();
canvas.attr('width', w);
canvas.attr('height', h);
//
// const ctx = document.getElementById('canvas').getContext('2d');
// ctx.fillRect(10, 10, 100, 100);

App = (function () {
    const bind = function (fn, me) {
        return function () {
            return fn.apply(me, arguments);
        };
    };

    function App() {
        this.particles = [];
        this.lastDraw = 0;
        this.draw = bind(this.draw, this);
        this.canvas = $('#canvas');
        this.canvasH = this.canvas.height();
        this.canvasW = this.canvas.width();
        this.ctx = document.getElementById('canvas').getContext('2d');
        this.cursor = $('#caret');
        this.particlePointer = 0;

        // $('#')
        // test only
        // console.log(this.cursor[0].getBoundingClientRect().left);
        // this.powermode.push(this.createParticle(this.cursor.position().left - this.canvas.position().left, this.cursor.position().top - this.canvas.position().top, 'green'));
        // this.powermode.push(this.createParticle(this.cursor.position().left - this.canvas.position().left, this.cursor.position().top - this.canvas.position().top, 'blue'));
    }

    App.prototype.PARTICLE_VELOCITY_RANGE = {
        x: [-2.5, 2.5],
        y: [-7, -3.5]
    };
    App.prototype.PARTICLE_GRAVITY = 0.12;

    App.prototype.PARTICLE_SIZE = 4;

    App.prototype.PARTICLE_ALPHA_FADEOUT = 0.96;

    App.prototype.maxParticleNum = 10;
    App.prototype.maxSpawnParticleNum = 4;

    // functions
    App.prototype.spawnParticles = function () {
        console.log(this.cursor[0].getBoundingClientRect().left);
        const curPosX = this.cursor.position().left - this.canvas.position().left;
        const curPoxY = this.cursor.position().top - this.canvas.position().top;
        for (let i = 0; i != this.maxSpawnParticleNum; ++i) {
            this.particlePointer = (i + this.particlePointer) % this.maxParticleNum;
            const color = [
                Math.round(255 * Math.random()),
                Math.round(255 * Math.random()),
                Math.round(255 * Math.random())
            ];
            this.particles[this.particlePointer] = this.createParticle(curPosX, curPoxY, color);
        }
        // this.powermode.push(this.createParticle(this.cursor.position().left - this.canvas.position().left, this.cursor.position().top - this.canvas.position().top, 'blue'));
    };
    App.prototype.createParticle = function (x, y, color) {
        return {
            x: x,
            y: y + 10,
            alpha: 1,
            color: color,
            velocity: {
                x: this.PARTICLE_VELOCITY_RANGE.x[0] + Math.random() * (this.PARTICLE_VELOCITY_RANGE.x[1] - this.PARTICLE_VELOCITY_RANGE.x[0]),
                y: this.PARTICLE_VELOCITY_RANGE.y[0] + Math.random() * (this.PARTICLE_VELOCITY_RANGE.y[1] - this.PARTICLE_VELOCITY_RANGE.y[0])
            }
        };
    };
    App.prototype.draw = function (time) {
        this.drawParticles(time - this.lastDraw);
        this.lastDraw = time;
        return window.requestAnimationFrame(this.draw);
    };
    App.prototype.drawParticles = function () {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);

        for (let i = 0; i != this.particles.length; ++i) {
            const particle = this.particles[i];
            if (!particle || particle.alpha <= 0.1) {
                continue;
            }
            particle.velocity.y += this.PARTICLE_GRAVITY;
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            particle.alpha *= this.PARTICLE_ALPHA_FADEOUT;
            this.ctx.fillStyle = "rgba(" + (particle.color.join(", ")) + ", " + particle.alpha + ")";
            this.ctx.fillRect(Math.round(particle.x - this.PARTICLE_SIZE / 2), Math.round(particle.y - this.PARTICLE_SIZE / 2), this.PARTICLE_SIZE, this.PARTICLE_SIZE)
        }
        // this.powermode.forEach(function (particle) {
        //
        //
        // })
    };

    return App;
})();
module.exports = function () {
    app = new App();
    app.draw();
};
