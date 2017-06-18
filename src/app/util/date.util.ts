export default class DateUtil {
  static getDateFromDayId(dayId: number): { [key: string]: number } {
    let tmp: number = dayId;
    let day = tmp % 100;
    tmp = Math.trunc(tmp / 100);
    let month = tmp % 100;
    let year = Math.trunc(tmp / 100);

    return {'year': year, 'month': month, 'day': day};
  }

  static getPresentation(dayId: number): String {
    let date = DateUtil.getDateFromDayId(dayId);

    let monthString: String;
    if (date['month'] < 10) {
      monthString = '0' + date['month'];
    } else {
      monthString = '' + date['month'];
    }

    let dayString: String;
    if (date['day'] < 10) {
      dayString = '0' + date['day'];
    } else {
      dayString = '' + date['day'];
    }

    return `${date['year']}-${monthString}-${dayString}`;
  }

}
