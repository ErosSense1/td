let speed = 2;
class Enemy extends Sprite {
  static sp = speed;
  constructor({ pos = { x: 0, y: 0 } }) {
    super({
      pos,
      src: "./assets/orc.png",
      frames: { max: 6 },
      maxH: 100,
      maxW: 550,
    });
    this.box = 64;
    this.index = 0;
    this.center = {
      x: this.pos.x + this.box / 2,
      y: this.pos.y + this.box / 2,
    };
    this.rad = 50;
    this.health = 100;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.speed = 2;
  }
  draw() {
    super.draw();

    //health bar
    ctx.fillStyle = "black";
    ctx.fillRect(this.pos.x - 1, this.pos.y - 50, this.box + 2, 10);
    ctx.fillStyle = "red";
    ctx.fillRect(this.pos.x, this.pos.y - 50, this.box, 10);

    ctx.fillStyle = "green";
    ctx.fillRect(
      this.pos.x,
      this.pos.y - 50,
      (this.box * this.health) / 100,
      10
    );
  }
  update() {
    this.draw();

    const waypoint = waypoints[this.index];
    const yDist = waypoint.y - this.center.y;
    const xDist = waypoint.x - this.center.x;
    const angle = Math.atan2(yDist, xDist);

    const speed = this.speed;

    this.velocity.x = Math.cos(angle) * speed;
    this.velocity.y = Math.sin(angle) * speed;

    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
    this.center = {
      x: this.pos.x + this.box / 2,
      y: this.pos.y + this.box / 2,
    };

    if (
      Math.abs(Math.round(this.center.x) - waypoint.x) <
        Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.center.y) - waypoint.y) <
        Math.abs(this.velocity.y) &&
      this.index < waypoints.length - 1
    ) {
      this.index++;
    }
  }
}
