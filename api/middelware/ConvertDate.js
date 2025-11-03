const jalaliMoment = require('jalali-moment');
const todayFa = {
    "day": getDateFormat(this.today, { "day": "2-digit" }),
    "month": getDateFormat(this.tomonth, { "month": "numeric" }),
    "monthTitle": getDateFormat(this.tomonth, { "month": "long" }),
    "year": getDateFormat(this.toyear, { "year": "numeric" }),
    "dayWeek": getDateFormat(this.toweekday, { "weekday": "long" }),
    "getDate": function (dateNow) {
        this.today = dateNow.day;
        this.tomonth = dateNow.month;
        this.today = dateNow.year;
        this.today = dateNow.dayWeek;
    }

}

function getDateFormat(uDate, option) {
    let date = new Intl.DateTimeFormat('fa-IR', option).format(uDate);
    return date;
}
function convertToJalali(gregorianDate) {
    return jalaliMoment(gregorianDate).locale('fa').format('jYYYY/jMM/jDD');
}

module.exports = { 
    convertToJalali
};

