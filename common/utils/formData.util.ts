export const formDataToJSON = (data: any) => {
  const object = {};
  data.forEach((value, key) => (object[key] = value));
  const jsStr = JSON.stringify(object);
  return JSON.parse(jsStr);
};
