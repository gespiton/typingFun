function init(ctx) {

  class Char {
    constructor(args) {
      this.text = args.text;
      this.fillStyle = args.fillStyle;
      this.size = args.size;
    }


    strokeText(text, style, pos) {
      this.ctx.font = "500px fira sans";
      if (style.lineWidth)
        this.ctx.lineWidth = style.lineWidth;
      if (style.color)
        this.ctx.strokeStyle = style.color;
      this.ctx.strokeText(text, pos.x, pos.y);
    };


    draw(args) {
      ctx.textAlign = 'center';
      ctx.font = `${args.size}px OpenDyslexic`;
      ctx.fillStyle = this.fillStyle;
      ctx.fillText(this.text, args.x, args.y);
      // this.strokeText(this.text,
      //   {
      //     color: "rgba(200,0,0,0.3)",
      //     lineWidth: 20
      //   },
      //   {x: 700, y: 550});
      //
      // this.strokeText(this.text,
      //   {
      //     color: "rgba(200,0,0,0.3)",
      //     lineWidth: 2
      //   },
      //   {x: 700, y: 550});
    }
  }
  return Char;
}
export default init;