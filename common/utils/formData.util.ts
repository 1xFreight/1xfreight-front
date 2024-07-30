export const formDataToJSON = (data: any) => {
  const object = {};
  data.forEach((value, key) => (object[key] = value));
  return JSON.stringify(object);
};
