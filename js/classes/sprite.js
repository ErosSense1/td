let count = 0
class Sprite
{
    constructor ( { pos = {
        x: 0,
        y: 0
    }, src,
        frames = {
            max: 1
        },
        maxW,
        maxH,
        offset = { x: 0, y: 0 },
        frameSpeed = 5 } )
    {
        this.img = new Image;
        this.img.src = src;
        this.pos = pos;
        this.maxH = maxH
        this.maxW = maxW
        this.frame = {
            max: frames.max,
            current: 0
        }
        this.offset = offset
        this.frameSpeed = frameSpeed
    }
    draw ()
    {
        const width = this.img.width / this.frame.max
        const crop = {
            pos: {
                x: width * this.frame.current,
                y: 0
            },
            size: {
                w: width,
                h: this.img.width
            }
        }
        ctx.drawImage( this.img,
            crop.pos.x,
            crop.pos.y,
            crop.size.w,
            crop.size.h,
            this.pos.x + this.offset.x,
            this.pos.y + this.offset.y,
            this.maxH,
            this.maxW

        )

        count++
        if ( count % this.frameSpeed === 0 )
        {
            this.frame.current++
        }
        if ( this.frame.current > this.frame.max - 1 )
        {
            this.frame.current = 0
        }
    }
}