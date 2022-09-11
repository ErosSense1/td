class Building
{
    constructor ( { pos = { x: 0, y: 0 } } )
    {
        this.pos = pos
        this.size = 64 * 2
        this.center = {
            x: this.pos.x + this.size / 2,
            y: this.pos.y + this.size / 4
        }
        this.projectiles = []
        this.rad = 300
        this.target
        this.frames = 0
    }
    draw ()
    {
        ctx.fillStyle = "blue"
        ctx.fillRect( this.pos.x, this.pos.y, this.size, this.size / 2 )

        ctx.fillStyle = "rgba(0,0,255,0.1)"
        ctx.beginPath()
        ctx.arc( this.pos.x + this.size / 2, this.pos.y + this.size / 4, this.rad, 0, Math.PI * 2 )
        ctx.fill()
    }
    update ()
    {
        this.draw()
        if ( this.frames % 60 / 60 === 0 && this.target )
        {
            this.projectiles.push(
                new Projectile( {
                    pos: {
                        x: this.center.x,
                        y: this.center.y
                    },
                    enemy: this.target
                } )
            )
        }
        this.frames++
    }
}