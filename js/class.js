class Tile
{
    constructor ( { pos = { x: 0, y: 0 } } )
    {
        this.pos = pos;
        this.color = 'rgba(255,255,255, 0.15)'
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

class Enemy
{
    constructor ( { pos = { x: 0, y: 0 } } )
    {
        this.pos = pos;
        this.box = 64;
        this.index = 0;
        this.center = {
            x: this.pos.x + this.box / 2,
            y: this.pos.y + this.box / 2
        }
    }
    draw ()
    {
        ctx.fillRect( this.pos.x, this.pos.y, this.box, this.box );
    }
    update ()
    {
        this.draw()

        const waypoint = waypoints[ this.index ];
        const yDist = waypoint.y - this.center.y;
        const xDist = waypoint.x - this.center.x;
        const angle = Math.atan2( yDist, xDist );
        this.pos.x += Math.cos( angle );
        this.pos.y += Math.sin( angle );
        this.center = {
            x: this.pos.x + this.box / 2,
            y: this.pos.y + this.box / 2
        }

        if ( Math.round( this.center.x ) === waypoint.x &&
            Math.round( this.center.y ) === waypoint.y &&
            this.index < waypoints.length - 1
        )
        {
            this.index++
        }
    }

}