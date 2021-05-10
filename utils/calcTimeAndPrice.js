exports.calcTimeDiffInSeconds = (start, end) => {
  let difference = (end.getTime() - start.getTime()) / 1000;
  difference = Math.abs(Math.round(difference));
  return difference;
};

exports.calcPrice = (timeInSeconds) => {
  let totalSeconds = timeInSeconds;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  console.log('hours: ' + hours);
  console.log('minutes: ' + minutes);
  console.log('seconds: ' + seconds);

  if (!hours) {
    return 10;
  }
  let price = hours * 10;
  if (minutes) price += 10;
  return price;
};
