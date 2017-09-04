export default class DateUtil {
  static MILLISECONDS_IN_DAY = 60 * 60 * 24 * 1000;

  static getDateAttributesFromDayId(dayId: number): { [key: string]: number } {
    let tmp: number = dayId;
    let day = tmp % 100;
    tmp = Math.trunc(tmp / 100);
    let month = tmp % 100;
    let year = Math.trunc(tmp / 100);

    return {'year': year, 'month': month, 'day': day};
  }

  static getDateFromDayId(dayId: number): Date {
    let dateAttributes = DateUtil.getDateAttributesFromDayId(dayId);
    return new Date(dateAttributes['year'], dateAttributes['month'], dateAttributes['day']);
  }

  static getDayIdFromDate(date: Date): number {
    return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
  }

  static getNextDayId(dayId: number): number {
    let result = DateUtil.getDateFromDayId(dayId);

    let millis = result.valueOf() + DateUtil.MILLISECONDS_IN_DAY;
    let tomorrow = new Date(millis);

    return DateUtil.getDayIdFromDate(tomorrow);
  }

  static getPreviousDayId(dayId: number): number {
    let result = DateUtil.getDateFromDayId(dayId);

    let millis = result.valueOf() - DateUtil.MILLISECONDS_IN_DAY;
    let tomorrow = new Date(millis);

    return DateUtil.getDayIdFromDate(tomorrow);
  }

  static getPresentation(dayId: number): String {
    return DateUtil.getDateFromDayId(dayId).toDateString();
  }
}
