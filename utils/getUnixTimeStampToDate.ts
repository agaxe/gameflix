import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';

export const getUnixTimeStampToDate = (
  timeStamp: number,
  formatString = 'yyyy-MM-dd'
) => {
  const date = fromUnixTime(timeStamp);

  return format(date, formatString);
};
