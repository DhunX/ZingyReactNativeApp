export const timeSince = (date: Date) => {
  var seconds = Math.floor(
    (new Date().valueOf() - Date.parse(date.toString())) / 1000,
  );

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' y';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' m';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' d';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' h';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' min';
  }
  return Math.floor(seconds) + ' seconds';
};
