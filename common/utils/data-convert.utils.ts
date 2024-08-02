export function accessorialsConvertToText(name: string) {
  switch (name) {
    case "LAF":
      return "Limited Access Fee";
    case "PJR":
      return "Pallet Jack Required";
    case "AR":
      return "Appointment Required";
    case "NPTD":
      return "Notify Prior To Delivery";
    case "ID":
      return "Inside Delivery";
    case "LGDR":
      return "Lift-Gate Delivery Required";
    default:
      return null;
  }
}

export function extractAccessorialsFromObj(obj: any) {
  if (!obj) return;

  const accessorials = [];

  Object.keys(obj).map((key: string) => {
    const valid = accessorialsConvertToText(key);

    valid ? accessorials.push(valid) : "";
  });

  return accessorials.length ? accessorials : null;
}

export function extractReferenceNo(obj: any) {
  if (!obj) return;
  const references = [];

  Object.keys(obj).map((key) => {
    if (key.includes("reference_no")) {
      references.push(obj[key]);
    }
  });

  return references.length ? references : null;
}
