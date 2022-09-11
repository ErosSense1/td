/**@type {HTMLCanvasElement} */

const canvas = document.getElementById( "canvas" );
const ctx = canvas.getContext( "2d" );
canvas.width = 1280;
canvas.height = 768;
let hearth = document.getElementById( "hearts" )
const over = document.getElementById( "xd" )
/*utils*/
function img ( src ) { let img = new Image(); img.src = src; return img; }
let backGround = img( "./assets/towerDefense.png" );
const place2d = []
for ( let i = 0; i < place.length; i += 20 )
{
    place2d.push( place.slice( i, i + 20 ) )
}
let placementTiles = []
place2d.forEach( ( row, y ) =>
{
    row.forEach( ( sym, x ) =>
    {
        if ( sym === 30 )
        {
            // add placement tile
            placementTiles.push( new Tile( { pos: { x: x * 64, y: y * 64 } } ) )
        }
    } )
} )
/*utils*/
/*class*/

/*class*/

let enemies = [];
let buildings = [];
let activeTile = undefined;

let wave = 2
function spawn ()
{
    for ( let i = 0; i < wave; i++ )
    {
        const offSet = i * 150;
        enemies.push( new Enemy( {
            pos: {
                x: waypoints[ 0 ].x - offSet,
                y: waypoints[ 0 ].y
            }
        } ) )
    }
}
let health = 5
let id
hearth.innerText = health
spawn()

function play ()
{
    id = requestAnimationFrame( play );
    ctx.drawImage( backGround, 0, 0, canvas.width, canvas.height )/*background*/
    hearth.innerText = health

    for ( let i = enemies.length - 1; i >= 0; i-- )
    {
        const enemy = enemies[ i ]
        ctx.fillStyle = "red"
        enemy.update()
        enemy.speed = speed
        if ( enemy.pos.x > canvas.width )
        {
            enemies.shift()
            health--
            hearth.innerText = health
            if ( enemies.length === 0 )
            {
                wave += 2;
                spawn()
            }
            if ( health === 0 )
            {
                gameOver()
            }
        }
    }
    placementTiles.forEach( tile =>
    {
        tile.update( mouse )
    } )
    buildings.forEach( build =>
    {
        build.update()
        build.target = null

        const closeEnemies = enemies.filter( enemy =>
        {
            const xDiff = enemy.center.x - build.center.x
            const yDiff = enemy.center.y - build.center.y
            const Dist = Math.hypot( xDiff, yDiff )
            return Dist < enemy.rad + build.rad
        } )
        build.target = closeEnemies[ 0 ]
        for ( let i = build.projectiles.length - 1; i >= 0; i-- )
        {
            const bullet = build.projectiles[ i ]
            bullet.update()

            const xDiff = bullet.enemy.center.x - bullet.pos.x
            const yDiff = bullet.enemy.center.y - bullet.pos.y
            const Dist = Math.hypot( xDiff, yDiff )

            //hit
            if ( Dist < bullet.enemy.rad + bullet.rad )
            {
                bullet.enemy.health -= 20
                if ( bullet.enemy.health <= 0 )
                {
                    const index = enemies.findIndex( ( enemy ) =>
                    {
                        return bullet.enemy === enemy
                    } )
                    if ( index > -1 )
                    {
                        enemies.splice( index, 1 )
                    }
                    if ( enemies.length === 0 )
                    {
                        speed += 0.5
                        wave += 2;
                        spawn()
                    }
                }
                build.projectiles.splice( i, 1 )
            }
        }
    } )
}

window.onload = function ()
{
    console.log( hearth )
    play()
}
const mouse = {
    x: undefined,
    y: undefined,

}
function gameOver ()
{
    cancelAnimationFrame( id )

    over.style.visibility = "visible"
}
canvas.addEventListener( "click", e =>
{
    if ( activeTile && !activeTile.live )
    {
        buildings.push( new Building( {
            pos: {
                x: activeTile.pos.x,
                y: activeTile.pos.y
            }
        } ) )
        activeTile.live = true
    }
} )

window.addEventListener( "mousemove", e =>
{
    mouse.x = e.clientX
    mouse.y = e.clientY

    activeTile = null
    for ( let i = 0; i < placementTiles.length; i++ )
    {
        const tile = placementTiles[ i ]
        if ( mouse.x > tile.pos.x &&
            mouse.x < tile.pos.x + 64 &&
            mouse.y > tile.pos.y &&
            mouse.y < tile.pos.y + 64 )
        {
            activeTile = tile
            break
        }
    }
} )
window.addEventListener( "mouseleave", e =>
{
    mouse.x = 0
    mouse.y = 0
} )

window.addEventListener( "keypress", e =>
{
    switch ( e.key )
    {
        case "º":
            gameOver()
            break;
    }
} )