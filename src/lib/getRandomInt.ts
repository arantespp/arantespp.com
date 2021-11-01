/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export const getRandomInt = (args: { min: number; max: number }) => {
  const min = Math.ceil(args.min);
  const max = Math.floor(args.max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
