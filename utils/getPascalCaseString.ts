export const getPascalCaseString = (text: string) => {
  const textArr = text.split(' ');

  return textArr
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(' ');
};
