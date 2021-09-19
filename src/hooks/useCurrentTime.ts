import * as dateFns from 'date-fns';
import * as React from 'react';

const INTERVAL_TIME = 1000;

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, INTERVAL_TIME);
    return () => clearInterval(interval);
  });

  const getFormattedCurrentTime = () => dateFns.format(currentTime, 'pp');

  return {
    currentTime,
    getFormattedCurrentTime,
  };
};
