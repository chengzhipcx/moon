export class TextByLine {
  constructor(params) {
    const { text = '', y = 10, w=10,h=20,size=20} = params

    this.text = text
    this.y = y
    this.w = w
    this.h = h
    this.size=size
  }

  render() {
    return hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(0),
      y: this.y,
      w: this.w,
      h: this.h,
      color: 0xffffff,
      text_size: this.size,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: this.text
    })
  }
}