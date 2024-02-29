export const companyNameShortner = (str = "") => {
  const words = str.split(" ");
  if (words.length > 3) {
    return `${words.slice(0, 3).join(" ")}`;
  } else {
    return str;
  }
};
