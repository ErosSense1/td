/**@type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pause = document.getElementById("pause");
const unpause = document.getElementById("play");
canvas.width = 1280;
canvas.height = 768;
let hearth = document.getElementById("hearts");
const over = document.getElementById("xd");
let coins = document.getElementById("coins");

function img(src) {
  let img = new Image();
  img.src = src;
  return img;
}
let backGround = img("./assets/towerDefense.png");
const place2d = [];
for (let i = 0; i < place.length; i += 20) {
  place2d.push(place.slice(i, i + 20));
}
let placementTiles = [];
place2d.forEach((row, y) => {
  row.forEach((sym, x) => {
    if (sym === 30) {
      // add placement tile
      placementTiles.push(new Tile({ pos: { x: x * 64, y: y * 64 } }));
    }
  });
});
let enemies = [];
let buildings = [];
let activeTile = undefined;
let wave = 3;
function spawn() {
  for (let i = 1; i < wave; i++) {
    const offSet = i * 150;
    enemies.push(
      new Enemy({
        pos: {
          x: waypoints[0].x - offSet,
          y: waypoints[0].y,
        },
      })
    );
  }
}
let health = 10;
let id;
let currency = 100;
let damage = 0;
hearth.innerText = health;
spawn();
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  activeTile = null;
  for (let i = 0; i < placementTiles.length; i++) {
    const tile = placementTiles[i];
    if (
      mouse.x > tile.pos.x &&
      mouse.x < tile.pos.x + 64 &&
      mouse.y > tile.pos.y &&
      mouse.y < tile.pos.y + 64
    ) {
      activeTile = tile;
      break;
    }
  }
});
function play() {
  id = requestAnimationFrame(play);
  ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height); /*background*/
  hearth.innerText = health;
  coins.innerText = currency;
  damage = 50 / speed;
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    ctx.fillStyle = "red";
    enemy.update();
    enemy.speed = speed;
    if (enemy.pos.x > canvas.width) {
      enemies.shift();
      health--;
      hearth.innerText = health;
      if (enemies.length === 0) {
        wave += 2;
        spawn();
      }
      if (health === 0) {
        gameOver();
      }
    }
  }
  placementTiles.forEach((tile) => {
    tile.update(mouse);
  });
  buildings.forEach((build) => {
    build.update();
    build.target = null;

    const closeEnemies = enemies.filter((enemy) => {
      const xDiff = enemy.center.x - build.center.x;
      const yDiff = enemy.center.y - build.center.y;
      const Dist = Math.hypot(xDiff, yDiff);
      return Dist < enemy.rad + build.rad;
    });
    build.target = closeEnemies[0];
    if (build.life > 0) {
      for (let i = build.projectiles.length - 1; i >= 0; i--) {
        const bullet = build.projectiles[i];
        bullet.update();

        const xDiff = bullet.enemy.center.x - bullet.pos.x;
        const yDiff = bullet.enemy.center.y - bullet.pos.y;
        const Dist = Math.hypot(xDiff, yDiff);

        //hit
        if (Dist < bullet.enemy.rad + bullet.rad) {
          build.life -= 0.5;
          bullet.enemy.health -= build.dm;
          if (bullet.enemy.health <= 0) {
            const index = enemies.findIndex((enemy) => {
              return bullet.enemy === enemy;
            });
            if (index > -1) {
              enemies.splice(index, 1);
              currency += 25;
            }
            if (enemies.length === 0) {
              speed += 0.5;
              wave += 2;
              spawn();
            }
          }
          build.projectiles.splice(i, 1);
        }
      }
    } else {
      build.projectiles = [];
    }
  });
}
window.onload = function () {
  play();
  buildLife();
};
const mouse = {
  x: undefined,
  y: undefined,
};
function gameOver() {
  cancelAnimationFrame(id);

  over.style.visibility = "visible";
}

window.addEventListener("mouseleave", (e) => {
  mouse.x = 0;
  mouse.y = 0;
});
pause.addEventListener("click", (e) => {
  pause.style.visibility = "hidden";
  unpause.style.visibility = "visible";
  over.innerText = "PAUSE";
  over.style.visibility = "visible";
  cancelAnimationFrame(id);
});
unpause.addEventListener("click", (e) => {
  unpause.style.visibility = "hidden";
  pause.style.visibility = "visible";
  over.innerText = "Game Over";
  over.style.visibility = "hidden";
  requestAnimationFrame(play);
  requestAnimationFrame(buildLife);
});
function buildLife() {
  requestAnimationFrame(buildLife);
  buildings.forEach((build) => {
    if (build.life > 0) {
      ctx.fillStyle = "black";
      ctx.fillRect(
        build.pos.x + build.live / 10 - 1,
        build.pos.y + 31,
        build.live / 2 + 2,
        12
      );
      ctx.fillStyle = "white";
      ctx.fillRect(
        build.pos.x + build.live / 10,
        build.pos.y + 32,
        build.live / 2,
        10
      );
      ctx.fillStyle = build.color;
      ctx.fillRect(
        build.pos.x + build.live / 10,
        build.pos.y + 32,
        build.life / 2,
        10
      );
    }
  });
}
canvas.addEventListener("click", (e) => {
  if (activeTile && activeTile.live && currency >= 500) {
    currency -= 500;
    for (let i = 0; i < buildings.length; i++) {
      const build = buildings[i];
      if (
        mouse.x > build.pos.x &&
        mouse.x < build.pos.x + 64 &&
        mouse.y > build.pos.y &&
        mouse.y < build.pos.y + 64
      ) {
        build.dm = damage * 5;
        build.color = "green";
        build.life = 200;
        build.live = 200;
      }
    }
  } else if (activeTile && activeTile.live && currency >= 300) {
    currency -= 300;
    for (let i = 0; i < buildings.length; i++) {
      const build = buildings[i];
      if (
        mouse.x > build.pos.x &&
        mouse.x < build.pos.x + 64 &&
        mouse.y > build.pos.y &&
        mouse.y < build.pos.y + 64
      ) {
        build.dm = damage * 3.5;
        build.color = "purple";
        build.life = 150;
        build.live = 150;
      }
    }
  } else if (activeTile && activeTile.live && currency >= 200) {
    currency -= 200;
    for (let i = 0; i < buildings.length; i++) {
      const build = buildings[i];
      if (
        mouse.x > build.pos.x &&
        mouse.x < build.pos.x + 64 &&
        mouse.y > build.pos.y &&
        mouse.y < build.pos.y + 64
      ) {
        build.dm = damage * 2;
        build.color = "red";
        build.life = 100;
        build.live = 100;
      }
    }
  }
  if (activeTile && !activeTile.live && currency >= 100) {
    currency -= 100;
    buildings.push(
      new Building({
        pos: {
          x: activeTile.pos.x,
          y: activeTile.pos.y,
        },
        dm: damage,
        color: "blue",
      })
    );
    activeTile.live = true;
  }
});
