export const getDataLabelFromKey = ({
  data,
  key,
  defaultKey = "key",
  defaultLabel = "label",
}) => {
  if (data && data.length) {
    const found = data.find((item) => item[defaultKey] === key);
    return found ? found[defaultLabel] : "";
  } else return "";
};
