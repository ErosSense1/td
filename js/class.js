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
let speed = 2
class Enemy
{
    static sp = speed
    constructor ( { pos = { x: 0, y: 0 } } )
    {
        this.pos = pos;
        this.box = 64;
        this.index = 0;
        this.center = {
            x: this.pos.x + this.box / 2,
            y: this.pos.y + this.box / 2
        }
        this.rad = 50
        this.health = 100
        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = 2

    }
    draw ()
    {
        ctx.beginPath()
        ctx.arc( this.center.x, this.center.y, this.rad, 0, Math.PI * 2 )
        ctx.fill()

        //health bar
        ctx.fillStyle = "red"
        ctx.fillRect( this.pos.x, this.pos.y - 50, this.box, 10 )

        ctx.fillStyle = "green"
        ctx.fillRect( this.pos.x, this.pos.y - 50, this.box * this.health / 100, 10 )
    }
    update ()
    {
        this.draw()

        const waypoint = waypoints[ this.index ];
        const yDist = waypoint.y - this.center.y;
        const xDist = waypoint.x - this.center.x;
        const angle = Math.atan2( yDist, xDist );

        const speed = this.speed

        this.velocity.x = Math.cos( angle ) * speed;
        this.velocity.y = Math.sin( angle ) * speed;

        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
        this.center = {
            x: this.pos.x + this.box / 2,
            y: this.pos.y + this.box / 2
        }

        if ( Math.abs( Math.round( this.center.x ) - waypoint.x ) < Math.abs( this.velocity.x ) &&
            Math.abs( Math.round( this.center.y ) - waypoint.y ) < Math.abs( this.velocity.y ) &&
            this.index < waypoints.length - 1
        )
        {
            this.index++
        }
    }

}

class Projectile
{
    constructor ( { pos = { x: 0, y: 0 }, enemy } )
    {
        this.pos = pos
        this.speed = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
        this.rad = 10
    }
    draw ()
    {
        ctx.beginPath()
        ctx.arc( this.pos.x, this.pos.y, this.rad, 0, Math.PI * 2 )
        ctx.fillStyle = "orange"
        ctx.fill()
    }
    update ()
    {
        this.draw()

        let angle = Math.atan2(
            this.enemy.center.y - this.pos.y,
            this.enemy.center.x - this.pos.x
        )

        this.speed.x = Math.cos( angle ) * speed
        this.speed.y = Math.sin( angle ) * speed

        this.pos.x += this.speed.x * 5
        this.pos.y += this.speed.y * 5
    }
}

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