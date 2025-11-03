import moment from 'moment-jalaali';

export const convertToPersian = (gregorianDate) => {
    if (gregorianDate) {
      return moment(gregorianDate, 'YYYY/MM/DD').format('jYYYY/jMM/jDD');
      
    } else {
      return 'تاریخ نا معتبر';
    }
  };

//export default convertToPersian;