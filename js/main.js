/**@type {HTMLCanvasElement} */

const canvas = document.getElementById( "canvas" );
const ctx = canvas.getContext( "2d" );
canvas.width = 1280;
canvas.height = 768;

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
console.log( placementTiles )
/*class*/

/*class*/

let enemies = [];

for ( let i = 0; i < 10; i++ )
{
    const offSet = i * 150;
    enemies.push( new Enemy( {
        pos: {
            x: waypoints[ 0 ].x - offSet,
            y: waypoints[ 0 ].y
        }
    } ) )
}

function play ()
{
    requestAnimationFrame( play );
    ctx.drawImage( backGround, 0, 0, canvas.width, canvas.height )/*background*/

    enemies.forEach( enemy =>
    {
        ctx.fillStyle = "red"
        enemy.update()
    } )
    placementTiles.forEach( tile =>
    {
        tile.update( mouse )
    } )
}

window.onload = play
const mouse = {
    x: undefined,
    y: undefined,

}
window.addEventListener( "mousemove", e =>
{
    mouse.x = e.clientX
    mouse.y = e.clientY
} )