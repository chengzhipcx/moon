import { TextByLine } from "./textByLine"
const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')

export function up(imgsrc, imgtext, dateStr) {

  hmUI.createWidget(hmUI.widget.FILL_RECT, {
    x: 0,
    y: 60,
    w: 194,
    h: 270,
    radius: 20,
    color: 0x000000
  })
  hmUI.createWidget(hmUI.widget.IMG, {
    x: 70,
    y: 100,
    w: 454,
    h: 454,
    src: imgsrc
  })
  new TextByLine({
    text: imgtext,
    y: 200,
    w: 194,
    h: 46,
    size:32
  }).render();
  new TextByLine({
    text: dateStr,
    y: 260,
    w: 194,
    h: 92,
    size: 42
  }).render()
  logger.info("draw ok")
  return;
}
