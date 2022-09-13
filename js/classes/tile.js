class Tile {
  constructor({ pos = { x: 0, y: 0 } }) {
    this.pos = pos;
    this.color = "rgba(255,255,255, 0.15)";
    this.live = false;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, 64, 64);
  }
  update(mouse) {
    this.draw();
    if (
      mouse.x > this.pos.x &&
      mouse.x < this.pos.x + 64 &&
      mouse.y > this.pos.y &&
      mouse.y < this.pos.y + 64
    ) {
      this.color = "white";
      ctx.fillStyle = "rgba(237, 38, 78,0.2)";
      ctx.beginPath();
      ctx.arc(this.pos.x + 64, this.pos.y + 32, 300, 0, Math.PI * 2);
      ctx.fill();
    } else {
      this.color = "rgba(255,255,255, 0.15)";
    }
  }
}
