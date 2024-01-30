export const getDataLabelFromKey = ({
  data,
  key,
  defaultKey = "key",
  defaultLabel = "label",
}) => {
  const found = data.find((item) => item[defaultKey] === key);
  return found[defaultLabel];
};
