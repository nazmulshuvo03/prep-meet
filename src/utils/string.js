export const companyNameShortner = (str = "", maxLength = 3) => {
  const words = str.split(" ");
  if (words.length > maxLength) {
    return `${words.slice(0, maxLength).join(" ")}`;
  } else {
    return str;
  }
};

export const uuidShortner = (uuid) => {
  const segments = uuid.split("-");

  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];

  const firstFour = firstSegment.substring(0, 4);
  const lastFour = lastSegment.substring(lastSegment.length - 4);

  return `${firstFour}....${lastFour}`;
};
