export const getToday = () => {
  /**
   * https://stackoverflow.com/a/29774197/8786986
   */
  const date = new Date();
  const offset = date.getTimezoneOffset();
  const dateWithOffset = new Date(date.getTime() - offset * 60 * 1000);
  const today = dateWithOffset.toISOString().split('T')[0];
  return today;
};
