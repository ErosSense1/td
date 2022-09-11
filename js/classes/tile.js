class Tile
{
    constructor ( { pos = { x: 0, y: 0 } } )
    {
        this.pos = pos;
        this.color = 'rgba(255,255,255, 0.15)'
        this.live = false
    }
    draw ()
    {
        ctx.fillStyle = this.color
        ctx.fillRect( this.pos.x, this.pos.y, 64, 64 )
    }
    update ( mouse )
    {
        this.draw()
        if ( mouse.x > this.pos.x &&
            mouse.x < this.pos.x + 64 &&
            mouse.y > this.pos.y &&
            mouse.y < this.pos.y + 64 )
        {
            this.color = "white"
        } else
        {
            this.color = 'rgba(255,255,255, 0.15)'
        }
    }
}