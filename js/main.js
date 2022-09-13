/**@type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pause = document.getElementById("pause");
const unpause = document.getElementById("play");
const retry = document.getElementById("retry");
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
function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
function play() {
  id = requestAnimationFrame(play);
  if (
    buildings.length === 48 &&
    buildings[0].level === 5 &&
    buildings[1].level === 5 &&
    buildings[2].level === 5 &&
    buildings[3].level === 5 &&
    buildings[4].level === 5 &&
    buildings[5].level === 5 &&
    buildings[6].level === 5 &&
    buildings[7].level === 5 &&
    buildings[8].level === 5 &&
    buildings[9].level === 5 &&
    buildings[10].level === 5 &&
    buildings[11].level === 5 &&
    buildings[12].level === 5 &&
    buildings[13].level === 5 &&
    buildings[14].level === 5 &&
    buildings[15].level === 5 &&
    buildings[16].level === 5 &&
    buildings[17].level === 5 &&
    buildings[18].level === 5 &&
    buildings[19].level === 5 &&
    buildings[20].level === 5 &&
    buildings[31].level === 5 &&
    buildings[32].level === 5 &&
    buildings[33].level === 5 &&
    buildings[34].level === 5 &&
    buildings[35].level === 5 &&
    buildings[36].level === 5 &&
    buildings[37].level === 5 &&
    buildings[38].level === 5 &&
    buildings[39].level === 5 &&
    buildings[40].level === 5 &&
    buildings[41].level === 5 &&
    buildings[42].level === 5 &&
    buildings[43].level === 5 &&
    buildings[44].level === 5 &&
    buildings[45].level === 5 &&
    buildings[46].level === 5 &&
    buildings[47].level === 5
  ) {
    cancelAnimationFrame(id);
    over.innerText = "You win";
    over.style.visibility = "visible";
    setTimeout(() => {
      let x = confirm("continue?");
      alert(x);
      if (x) {
        window.location.reload();
      } else {
        window.close();
      }
    }, 5000);
  }

  ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height); /*background*/
  hearth.innerText = health;
  coins.innerText = currency;
  damage = 50 / (speed - 1);
  buildings.forEach((build) => {
    if (build.level === 1) {
      build.dm = damage;
    } else if (build.level === 2) {
      build.dm = damage * 2;
    } else if (build.level === 3) {
      build.dm = damage * 3.5;
    } else if (build.level === 4) {
      build.dm = damage * 5;
    } else if (build.level === 5) {
      build.dm = damage * 10;
    }
  });
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
        wave += 1;
        spawn();
      }
      if (health === 0) {
        gameOver();
        pause.style.visibility = "hidden";
        unpause.style.visibility = "hidden";
        retry.style.visibility = "hidden";
        setTimeout((x) => {
          window.location.reload();
        }, 5000);
      }
    }
  }
  placementTiles.forEach((tile) => {
    tile.update(mouse);
  });
  enemies.forEach((enemy) => {
    ctx.fillStyle = "white";
    ctx.fillText(Math.floor(enemy.health), enemy.pos.x, enemy.pos.y - 42);
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
              wave += 1;
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
  buildings.forEach((build) => {
    if (build.life > 0 && build.level === 1) {
      ctx.fillStyle = "black";
      ctx.fillRect(build.pos.x + 10, build.pos.y + 31, build.live * 2 + 2, 12);
      ctx.fillStyle = "white";
      ctx.fillRect(build.pos.x + 11, build.pos.y + 32, build.live * 2, 10);
      ctx.fillStyle = build.color;
      ctx.fillRect(build.pos.x + 11, build.pos.y + 32, build.life * 2, 10);
    } else if (build.life > 0 && build.level === 2) {
      ctx.fillStyle = "black";
      ctx.fillRect(build.pos.x + 10, build.pos.y + 31, build.live + 2, 12);
      ctx.fillStyle = "white";
      ctx.fillRect(build.pos.x + 11, build.pos.y + 32, build.live, 10);
      ctx.fillStyle = build.color;
      ctx.fillRect(build.pos.x + 11, build.pos.y + 32, build.life, 10);
    } else if (build.life > 0 && build.level === 3) {
      ctx.fillStyle = "black";
      ctx.fillRect(build.pos.x + 10, build.pos.y + 31, build.live - 50 + 2, 12);
      ctx.fillStyle = "white";
      ctx.fillRect(build.pos.x + 11, build.pos.y + 32, build.live - 50, 10);
      ctx.fillStyle = build.color;
      ctx.fillRect(build.pos.x + 11, build.pos.y + 32, build.life - 50, 10);
    } else if (build.life > 0 && build.level === 4) {
      ctx.fillStyle = "black";
      ctx.fillRect(build.pos.x + 10, build.pos.y + 31, build.live / 2 + 2, 12);
      ctx.fillStyle = "white";
      ctx.fillRect(build.pos.x + 11, build.pos.y + 32, build.live / 2, 10);
      ctx.fillStyle = build.color;
      ctx.fillRect(build.pos.x + 11, build.pos.y + 32, build.life / 2, 10);
    } else if (build.life > 0 && build.level === 5) {
      ctx.fillStyle = "black";
      ctx.fillRect(build.pos.x + 10, build.pos.y + 31, build.live - 198, 12);
      ctx.fillStyle = "white";
      ctx.fillRect(build.pos.x + 11, build.pos.y + 32, build.live - 200, 10);
      ctx.fillStyle = build.color;
      ctx.fillRect(build.pos.x + 11, build.pos.y + 32, build.life - 200, 10);
    }

    ctx.fillStyle = "white";
    ctx.fillText(
      "damage: " + Math.floor(build.dm),
      build.pos.x + 40,
      build.pos.y + 32 + 18
    );
    ctx.fillStyle = "white";
    ctx.fillText(
      "shots: " + Math.floor(build.life * 2),
      build.pos.x + 40,
      build.pos.y + 32 + 28
    );
  });
}
window.onload = function () {
  play();
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
});
retry.addEventListener("click", (e) => {
  window.location.reload();
});
canvas.addEventListener("click", (e) => {
  buildings.forEach((xd) => {
    if (activeTile && activeTile.live && currency >= 300 && xd.level === 4) {
      currency -= 300;
      for (let i = 0; i < buildings.length; i++) {
        const build = buildings[i];
        if (
          mouse.x > build.pos.x &&
          mouse.x < build.pos.x + 64 &&
          mouse.y > build.pos.y &&
          mouse.y < build.pos.y + 64
        ) {
          build.dm = damage * 10;
          build.color = "#ff8000";
          build.life = 300;
          build.live = 300;
          build.level = 5;
        }
      }
    } else if (
      activeTile &&
      activeTile.live &&
      currency >= 250 &&
      xd.level === 3
    ) {
      currency -= 250;
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
          build.level = 4;
        }
      }
    } else if (
      activeTile &&
      activeTile.live &&
      currency >= 200 &&
      xd.level === 2
    ) {
      currency -= 200;
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
          build.level = 3;
        }
      }
    } else if (
      activeTile &&
      activeTile.live &&
      currency >= 150 &&
      xd.level === 1
    ) {
      currency -= 150;
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
          build.level = 2;
        }
      }
    }
  });
  if (activeTile && !activeTile.live && currency >= 100) {
    currency -= 100;
    buildings.push(
      new Building({
        pos: {
          x: activeTile.pos.x,
          y: activeTile.pos.y,
        },
        dm: damage,
        color: "#03c4ff",
      })
    );
    activeTile.live = true;
  }
});

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "º":
      currency += 100;
      break;
  }
});
