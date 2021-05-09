exports.calcTimeDiffInSeconds = (start, end) => {
  let difference = (end.getTime() - start.getTime()) / 1000;
  difference = Math.abs(Math.round(difference));
  return difference;
};

exports.calcPrice = (timeInSeconds) => {
  // calculate minutes
  const minutes = Math.floor(timeInSeconds / 60);

  // on hour or less 10 riyals
  if (minutes <= 60) return 10;

  // more? calculate to the nearest 10
  const hours = roundToHour(minutes);

  return 10 * hours;
};

// round to next hour
const roundToHour = (minutes) => {
  return Math.ceil(minutes / 10);
};
