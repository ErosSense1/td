/**@type {HTMLCanvasElement} */

const canvas = document.getElementById( "canvas" );
const ctx = canvas.getContext( "2d" );
canvas.width = 1280;
canvas.height = 768;
function img ( src ) { let img = new Image(); img.src = src; return img; }
let backGround = img( "./assets/towerDefense.png" );
function play ()
{
    requestAnimationFrame( play );
    ctx.drawImage( backGround, 0, 0, canvas.width, canvas.height )/*background*/
}

window.onload = play