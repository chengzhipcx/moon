import * as lunar from "./lunar"
import * as data from "./data.js"
import { TextByLine } from "./textByLine"
import * as draw from "./draw"

const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
function getData(year_int, month_int, day_int) {
  date = lunar.sloarToLunar(year_int, month_int, day_int)
  const dateStr = date.lunarMonth + "月" + date.lunarDay
  const imgsrc = data.myMap.get(date.lunarDay).split(",")[0]
  const imgtext = data.myMap.get(date.lunarDay).split(",")[1]
  return {
    dateStr: dateStr,
    imgsrc: imgsrc,
    imgtext: imgtext
  }
}

Page({

  build() {
    var year = 2023, month = 1, day = 19
    //小米手环传感器获取当前日期  1.0api中有获取日历的方法  但是拿到的是undefinde
    const time = hmSensor.createSensor(hmSensor.id.TIME)
    logger.info(time.day)
    year = time.year
    month = time.month
    day = time.day
    const date = getData(year, month, day)

    const up_text = new TextByLine({
      text: '▲',
      y: 30,
      w: 194,
      h: 30,
      size: 30
    }).render()
    up_text.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      day = day - 1
      const date = getData(year, month, day)
      draw.up(date.imgsrc, date.imgtext, date.dateStr)
    })
    //根据农历的日期绘制图片
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 70,
      y: 100,
      w: 454,
      h: 454,
      src: date.imgsrc
    })
    //月相类型
    new TextByLine({
      text: date.imgtext,
      y: 200,
      w: 194,
      h: 46,
      size: 32
    }).render();
    // 绘制农历日期文本
    new TextByLine({
      text: date.dateStr,
      y: 260,
      w: 194,
      h: 92,
      size: 42
    }).render()
    const down_text = new TextByLine({
      text: '▼',
      y: 360,
      w: 194,
      h: 46,
      size: 30
    }).render()
    down_text.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      logger.info('-1')
      day = day + 1
      const date = getData(year, month, day)
      //TODO 这个方法 上翻可以  下翻只能一次 还会失效
      draw.up(date.imgsrc, date.imgtext, date.dateStr)
    })

  }
})