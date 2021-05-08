exports.calcTimeDiffInSeconds = (start, end) => {
  let difference = (end.getTime() - start.getTime()) / 1000;
  difference = Math.abs(Math.round(difference));
  return difference;
};
