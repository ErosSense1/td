class Building extends Sprite {
  constructor({ pos = { x: 0, y: 0 }, dm, color }) {
    super({
      pos,
      src: "./assets/towe.png",
      frames: {
        max: 19,
      },
      maxH: 150,
      maxW: 3000,
      frameSpeed: 2,
      offset: {
        x: 0,
        y: -110,
      },
    });
    this.size = 64 * 2;
    this.center = {
      x: this.pos.x + this.size / 2,
      y: this.pos.y + this.size / 4,
    };
    this.projectiles = [];
    this.rad = 300;
    this.target;
    this.spawnTime = 0;
    this.dm = dm;
    this.color = color;
    this.life = 50;
    this.live = 50;
    this.level = 1;
  }
  draw() {
    super.draw();
  }
  update() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, 64 * 2, 64);

    this.draw();
    if ((this.spawnTime % 60) / 60 === 0 && this.target) {
      this.projectiles.push(
        new Projectile({
          pos: {
            x: this.center.x,
            y: this.center.y,
          },
          enemy: this.target,
        })
      );
    }
    this.spawnTime++;
  }
}
