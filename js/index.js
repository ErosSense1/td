/**@type {HTMLCanvasElement} */

const canvas = document.getElementById( "canvas" );
const ctx = canvas.getContext( "2d" );

canvas.width = 1280;
canvas.height = 728;

let map = img( "./assets/map.png" )

function img ( source )
{
    let img = new Image()
    img.src = source

    return img;
}

//clases
class Enemy
{
    constructor ()
    {
        this.pos = {
            x: 0,
            y: 0
        }
        this.box = 25
        this.color = "red"
        this.move = {
            x: 0,
            y: 0
        }
    }

    draw ()
    {
        ctx.fillStyle = this.color
        ctx.fillRect( this.pos.x, this.pos.y, this.box, this.box )
    }

    update ()
    {

        this.draw()
        this.pos.x += this.move.x
        this.pos.y += this.move.y
    }
}

function play ()
{
    requestAnimationFrame( play )
    ctx.drawImage( map, 0, 0, canvas.width, canvas.height )
}

window.onload = play