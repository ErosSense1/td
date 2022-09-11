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
        maxH } )
    {
        this.img = new Image;
        this.img.src = src;
        this.pos = pos;
        this.maxH = maxH
        this.maxW = maxW
        this.frame = {
            max: frames.max
        }
    }
    draw ()
    {
        const crop = {
            pos: {
                x: 0,
                y: 0
            },
            size: {
                w: this.img.width / this.frame.max,
                h: this.img.width
            }
        }
        ctx.drawImage( this.img,
            crop.pos.x,
            crop.pos.y,
            crop.size.w,
            crop.size.h,
            this.pos.x,
            this.pos.y,
            this.maxH,
            this.maxW

        )
    }
}