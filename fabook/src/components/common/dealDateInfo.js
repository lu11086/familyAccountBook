/* eslint-disable */
/**
 * 获取本周、本季度、本月、上月的开始日期、结束日期
 */
var dataInfo = {};
module.exports = {
  dateInit() {
    dataInfo.now = new Date(); //当前日期
    dataInfo.nowDayOfWeek = dataInfo.now.getDay(); //今天本周的第几天
    dataInfo.nowDay = dataInfo.now.getDate(); //当前日
    dataInfo.nowMonth = dataInfo.now.getMonth(); //当前月
    dataInfo.nowYear = dataInfo.now.getYear(); //当前年
    dataInfo.nowYear += (dataInfo.nowYear < 2000) ? 1900 : 0; //
    dataInfo.lastMonthDate = new Date(); //上月日期
    dataInfo.lastMonthDate.setDate(1);
    dataInfo.lastMonthDate.setMonth(dataInfo.lastMonthDate.getMonth() - 1);
    dataInfo.lastYear = dataInfo.lastMonthDate.getYear();
    dataInfo.lastMonth = dataInfo.lastMonthDate.getMonth();
  },
// 格式化日期：yyyy-MM-dd
  formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
  },
// 获得某月的天数
  getMonthDays(myMonth) {
    this.dateInit();
    var monthStartDate = new Date(dataInfo.nowYear, myMonth, 1);
    var monthEndDate = new Date(dataInfo.nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  },
// 获得本季度的开始月份
  getQuarterStartMonth() {
    this.dateInit();
    var quarterStartMonth = 0;
    if (dataInfo.nowMonth < 3) {
      quarterStartMonth = 0;
    }
    if (2 < dataInfo.nowMonth && dataInfo.nowMonth < 6) {
      quarterStartMonth = 3;
    }
    if (5 < dataInfo.nowMonth && dataInfo.nowMonth < 9) {
      quarterStartMonth = 6;
    }
    if (dataInfo.nowMonth > 8) {
      quarterStartMonth = 9;
    }
    return quarterStartMonth;
  },
// 获得本周的开始日期
  getWeekStartDate() {
    this.dateInit();
    var weekStartDate = new Date(dataInfo.nowYear, dataInfo.nowMonth, dataInfo.nowDay - dataInfo.nowDayOfWeek + 1);
    return this.formatDate(weekStartDate);
  },
// 获得本周的结束日期
  getWeekEndDate() {
    this.dateInit();
    var weekEndDate = new Date(dataInfo.nowYear, dataInfo.nowMonth, dataInfo.nowDay + (6 - dataInfo.nowDayOfWeek) + 1);
    return this.formatDate(weekEndDate);
  },
// 获得上周的开始日期
  getLastWeekStartDate() {
    this.dateInit();
    var weekStartDate = new Date(dataInfo.nowYear, dataInfo.nowMonth, dataInfo.nowDay - dataInfo.nowDayOfWeek - 6);
    return this.formatDate(weekStartDate);
  },
// 获得上周的结束日期
  getLastWeekEndDate() {
    this.dateInit();
    var weekEndDate = new Date(dataInfo.nowYear, dataInfo.nowMonth, dataInfo.nowDay - dataInfo.nowDayOfWeek);
    return this.formatDate(weekEndDate);
  },
// 获得本月的开始日期
  getMonthStartDate() {
    this.dateInit();
    var monthStartDate = new Date(dataInfo.nowYear, dataInfo.nowMonth, 1);
    return this.formatDate(monthStartDate);
  },
//获得本月的结束日期
  getMonthEndDate() {
    this.dateInit();
    var monthEndDate = new Date(dataInfo.nowYear, dataInfo.nowMonth, this.getMonthDays(dataInfo.nowMonth));
    return this.formatDate(monthEndDate);
  },
// 获得上月开始时间
  getLastMonthStartDate() {
    this.dateInit();
    var lastMonthStartDate = new Date(dataInfo.nowYear, dataInfo.lastMonth, 1);
    return this.formatDate(lastMonthStartDate);
  },
// 获得上月结束时间
  getLastMonthEndDate() {
    this.dateInit();
    var lastMonthEndDate = new Date(dataInfo.nowYear, dataInfo.lastMonth, this.getMonthDays(dataInfo.lastMonth));
    return this.formatDate(lastMonthEndDate);
  },
// 获得本季度的开始日期
  getQuarterStartDate() {
    this.dateInit();
    var quarterStartDate = new Date(dataInfo.nowYear, this.getQuarterStartMonth(), 1);
    return this.formatDate(quarterStartDate);
  },
// 获得本季度的结束日期
  getQuarterEndDate() {
    this.dateInit();
    var quarterEndMonth = this.getQuarterStartMonth() + 2;
    var quarterStartDate = new Date(dataInfo.nowYear, quarterEndMonth,
      this.getMonthDays(quarterEndMonth));
    return this.formatDate(quarterStartDate);
  },
// 获得上季度的开始日期
  getLastQuarterStartDate() {
    this.dateInit();
    if (this.getQuarterStartMonth() == 1) {
      var quarterStartDate = new Date(dataInfo.lastYear, 10, 1);
    } else {
      var quarterStartDate = new Date(dataInfo.nowYear, this.getQuarterStartMonth() - 3, 1);
    }
    return this.formatDate(quarterStartDate);
  },
// 获得上季度的结束日期
  getLastQuarterEndDate() {
    this.dateInit();
    var quarterEndMonth = this.getQuarterStartMonth() + 2;
    if (quarterEndMonth == 3) {
      quarterEndMonth = 12;
      var quarterStartDate = new Date(dataInfo.lastYear, quarterEndMonth,
        this.getMonthDays(quarterEndMonth));
    } else {
      var quarterStartDate = new Date(dataInfo.nowYear, quarterEndMonth - 3,
        this.getMonthDays(quarterEndMonth));
    }
    return this.formatDate(quarterStartDate);
  }
};
