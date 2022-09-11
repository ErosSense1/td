class Projectile extends Sprite
{
    constructor ( { pos = { x: 0, y: 0 }, enemy } )
    {
        super( { pos, src: "./assets/projectile.png", maxH: 32, maxW: 40 } )
        this.speed = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
        this.rad = 10
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
