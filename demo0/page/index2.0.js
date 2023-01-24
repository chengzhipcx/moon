import * as lunar from "./lunar"
import * as data from "./data.js"
import { TextByLine } from "./textByLine"
import * as draw from "./draw"

//小米手环7 DeviceSource 260
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
function getNextDate(date, day) {
    var dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    return { year: y, month: m, day: d }
};
var dateStr_Arr = new Array();
var imgsrc_Arr = new Array();
var imgtext_Arr = new Array();
var count = 11
var pageheight=700
Page({
    onInit() {
        logger.info("初始化开始")
        const time = hmSensor.createSensor(hmSensor.id.TIME)
        const up = getNextDate(time.year + "-" + time.month + "-" + time.day, -(count/2))
        const date = getData(up.year, up.month, up.day)
        logger.info("dataL",date.dateStr,date.imgsrc,date.imgtext)
        for(var i=0;i<count;i++){
            const temp = getNextDate(up.year + "-" + up.month + "-" + up.day, i)
            const datetemp = getData(temp.year, temp.month, temp.day)
            dateStr_Arr[i]=datetemp.dateStr
            imgsrc_Arr[i]=datetemp.imgsrc
            imgtext_Arr[i]=datetemp.imgtext
        }
        logger.info("初始化完成",dateStr_Arr)
    },
    build() {
        const isVertical = true
        hmUI.setScrollView(true, pageheight, count, isVertical)

        const numArr = Array.from({ length: count }).map((_, index) => index)

        numArr.forEach((num) => {
            const up_text = new TextByLine({
                text: '▲',
                y: 15+pageheight*num,
                w: 194,
                h: 40,
                size: 30
              }).render()
              //根据农历的日期绘制图片
              hmUI.createWidget(hmUI.widget.IMG, {
                x: 70,
                y: 100+pageheight*num,
                w: 454,
                h: 454,
                src: imgsrc_Arr[num]
              })
              //月相类型
              new TextByLine({
                text: imgtext_Arr[num],
                y: 200+pageheight*num,
                w: 194,
                h: 46,
                size: 32
              }).render();
              // 绘制农历日期文本
              new TextByLine({
                text: dateStr_Arr[num],
                y: 260+pageheight*num,
                w: 194,
                h: 92,
                size: 42
              }).render()
              const down_text = new TextByLine({
                text: '▼',
                y: 395+pageheight*num,
                w: 194,
                h: 40,
                size: 30
              }).render()
        })
        hmUI.scrollToPage(count/2+1, false)
        logger.info(px(674))
    }
})