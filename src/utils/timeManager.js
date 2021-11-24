import { format, isToday, isYesterday, isThisWeek } from 'date-fns';

export const formatTime = (data) => {
  if (isToday(data)) {
    return format(data, "'Today at ' k:mm");
  } else if (isYesterday(data)) {
    return format(data, "'Yesterday at ' k:mm");
  } else if (isThisWeek(data)) {
    return format(data, "EEEE ' at ' k:mm");
  } else {
    return format(data, "PP ' at ' k:mm");
  }
};
