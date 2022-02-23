export const getDateWithTimezone = (date: string | Date) => {
  /**
   * https://stackoverflow.com/a/52352512/8786986
   */
  const dt = new Date(date);
  return new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
};
