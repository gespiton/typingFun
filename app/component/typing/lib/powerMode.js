// require('jquery');
const App = (function () {
  const bind = function (fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  function App() {
    const canvas = $('#canvas');
    canvas.width($('#stage').width());
    const w = canvas.width();
    const h = canvas.height();
    canvas.attr('width', w);
    canvas.attr('height', h);

    this.particles = [];
    this.lastDraw = 0;
    this.draw = bind(this.draw, this);
    this.canvas = canvas;

    this.canvasH = this.canvas.height();
    this.canvasW = this.canvas.width();
    this.ctx = document.getElementById('canvas').getContext('2d');
    this.particlePointer = 0;
    this.lastDrawnParticles = [];

    // $('#')
    // __tests__ only
    // console.log(this.cursor[0].getBoundingClientRect().left);
    // this.powermode.push(this.createParticle(this.cursor.position().left - this.canvas.position().left, this.cursor.position().top - this.canvas.position().top, 'green'));
    // this.powermode.push(this.createParticle(this.cursor.position().left - this.canvas.position().left, this.cursor.position().top - this.canvas.position().top, 'blue'));
  }

  App.prototype.PARTICLE_VELOCITY_RANGE = {
    x: [-3.5, 0],
    y: [-7, -3.5]
  };
  App.prototype.PARTICLE_GRAVITY = 0.32;

  App.prototype.PARTICLE_SIZE = 4;

  App.prototype.PARTICLE_ALPHA_FADEOUT = 0.96;

  App.prototype.maxParticleNum = 100;
  App.prototype.maxSpawnParticleNum = 5;

  // functions
  App.prototype.spawnParticles = function (pos) {
    for (let i = 0; i !== this.maxSpawnParticleNum; ++i) {
      this.particlePointer = (i + this.particlePointer) % this.maxParticleNum;
      // const color = [
      //   Math.round(255 * Math.random() + 50),
      //   Math.round(255 * Math.random()),
      //   Math.round(255 * Math.random() + 50)
      // ];
      const color = [199, 29, 55];
      this.particles[this.particlePointer] = this.createParticle(pos.X, pos.Y, color);
    }
    // this.powermode.push(this.createParticle(this.cursor.position().left - this.canvas.position().left, this.cursor.position().top - this.canvas.position().top, 'blue'));
  };
  App.prototype.createParticle = function (x, y, color) {
    return {
      x: x - this.canvas.position().left,
      y: y + 10 - this.canvas.position().top,
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

    if (this.lastDrawnParticles.length > 0) {
      for (let i in this.lastDrawnParticles) {
        const particle = this.lastDrawnParticles[i];
        this.ctx.clearRect(particle.x, particle.y, particle.size, particle.size);
      }

      this.lastDrawnParticles = [];
    }

    for (let i = 0; i !== this.particles.length; ++i) {
      const particle = this.particles[i];
      if (!particle || particle.alpha <= 0.1) {
        continue;
      }
      particle.velocity.y += this.PARTICLE_GRAVITY;
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.alpha *= this.PARTICLE_ALPHA_FADEOUT;
      this.ctx.fillStyle = "rgba(" + (particle.color.join(", ")) + ", " + particle.alpha + ")";


      const x = Math.floor(particle.x - this.PARTICLE_SIZE / 2);
      const y = Math.floor(particle.y - this.PARTICLE_SIZE / 2);
      const size = this.PARTICLE_SIZE;

      this.ctx.fillRect(x, y, size, size);
      this.lastDrawnParticles.push({
        x, y, size
      });
    }
  };

  return App;
})();

export default App;
