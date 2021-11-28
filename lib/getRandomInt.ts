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

export const getWeightedRandomInt = (weights: number[]) => {
  const sum = weights.reduce((acc, cur) => acc + cur, 0);
  const random = Math.random() * sum;

  const match = weights.reduce(
    (acc, cur, index) => {
      /**
       * Index already chosen.
       */
      if (acc.index !== undefined) {
        return acc;
      }

      const newSum = acc.sum + cur;

      if (newSum >= random) {
        return { sum: newSum, index };
      }

      return { sum: newSum, index: undefined };
    },
    { sum: 0, index: undefined },
  );

  /**
   * If no index was found, return the first index.
   */
  return match.index || 0;
};
