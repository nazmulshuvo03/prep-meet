export const getDataLabelFromKey = (
  data,
  key,
  defaultKey = "id",
  defaultLabel = "name"
) => {
  if (data && data.length) {
    console.log("##########", data, typeof data);
    const found = data.find((item) => item[defaultKey] === key);
    return found ? found[defaultLabel] : "";
  } else return "";
};
