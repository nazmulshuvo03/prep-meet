export const companyNameShortner = (str = "", maxLength = 3) => {
  const words = str.split(" ");
  if (words.length > maxLength) {
    return `${words.slice(0, maxLength).join(" ")}`;
  } else {
    return str;
  }
};
