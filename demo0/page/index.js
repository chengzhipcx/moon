import * as lunar from "./lunar"
import * as data from "./data.js"
import { TextByLine } from "./textByLine"
import * as draw from "./draw"

const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')


Page({

  build() {
    var year = 2023, month = 1, day = 19
    var date = null
    const time = hmSensor.createSensor(hmSensor.id.TIME)
    logger.info(time.day)
    year = time.year
    month = time.month
    day = time.day
    date = lunar.sloarToLunar(year, month, day)
    logger.info(date.lunarDay)
    var dateStr = date.lunarMonth + "月" + date.lunarDay
    var imgsrc = data.myMap.get(date.lunarDay).split(",")[0]
    var imgtext = data.myMap.get(date.lunarDay).split(",")[1]
    logger.info(imgsrc)
    var text1 = new TextByLine({
      text: imgtext,
      y: 200,
      w: 194,
      h: 46,
      size:32
    }).render();
    const text0 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 30,
      w: 194,
      h: 30,
      color: 0xffffff,
      text_size: 30,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: '▲'
    })
    text0.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      day=day-1
      date = lunar.sloarToLunar(year, month,day )
      dateStr = date.lunarMonth + "月" + date.lunarDay
      imgsrc = data.myMap.get(date.lunarDay).split(",")[0]
      imgtext = data.myMap.get(date.lunarDay).split(",")[1]
      draw.up(imgsrc,imgtext,dateStr)
    })





    //根据农历的日期绘制图片
    var img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 70,
      y: 100,
      w: 454,
      h: 454,
      src: imgsrc
    })
    var text = new TextByLine({
      text: dateStr,
      y: 260,
      w: 194,
      h: 92,
      size: 42
    }).render()

    const text2 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 360,
      w: 194,
      h: 46,
      color: 0xffffff,
      text_size: 30,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: '▼'
    })
    text2.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      logger.info('-1')
      day = day+1
      date = lunar.sloarToLunar(year, month,day)
      logger.info(day) 
      dateStr = date.lunarMonth + "月" + date.lunarDay
      logger.info(dateStr)
      imgsrc = data.myMap.get(date.lunarDay).split(",")[0]
      logger.info(imgsrc)
      imgtext = data.myMap.get(date.lunarDay).split(",")[1]
      logger.info(imgtext)
      //TODO 这个方法 上翻可以  下翻只能一次 还会失效
      // draw.up(imgsrc,imgtext,dateStr)
    })

  }
})