import { webpack } from "next/dist/compiled/webpack/webpack";

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

export function extractAccesorialsShipment(obj: any) {
  if (!obj) return;

  const accessorials = [
    "tarps",
    "frozen",
    "load_bars",
    "straps",
    "team_drivers",
  ];
  const currentAcc = [];

  Object.keys(obj).map((key) => {
    if (accessorials.includes(key)) {
      currentAcc.push(key.replace("_", " "));
    }
  });

  return currentAcc.length ? currentAcc : null;
}

export function convertQuoteToApiFormat(quote: any, type: string) {
  const apiObj = { type };
  const staticData = ["partners", "members", "subscribers", "equipments"];

  quote.map(({ form, data }) => {
    if (form === "pickup" || form === "drop") {
      apiObj[form] = data.map((address) => formatAddressObj(address, form));
    }

    if (form === "shipment_details") {
      apiObj[form] = formatShipmentObj(data);
    }

    if (form === "shipment_details_ltl") {
      apiObj["shipment_details"] = formatShipmentLTL(data);
    }

    if (form === "review") {
      apiObj[form] = formatReview(data);
    }

    if (staticData.includes(form)) {
      apiObj[form] = data;
    }
  });
  return apiObj;
}

export function formatAddressObj(obj: any, type: string | undefined) {
  const acc = extractAccessorialsFromObj(obj);
  let formattedAddress = {
    order: obj.order,
  };

  if (obj.addTime === "yes") {
    formattedAddress["date"] = obj.date;
    obj.locationTimeStart
      ? (formattedAddress["time_start"] = obj.locationTimeStart)
      : "";
    obj.locationTimeEnd
      ? (formattedAddress["time_end"] = obj.locationTimeEnd)
      : "";
    obj.shippingHoursType
      ? (formattedAddress["shipping_hours"] = obj.shippingHoursType)
      : "";
  }

  obj.locationNotes ? (formattedAddress["notes"] = obj.locationNotes) : "";
  obj.deliveryLocationType
    ? (formattedAddress["location_type"] = obj.deliveryLocationType)
    : "";

  acc ? (formattedAddress["accessorials"] = acc) : "";

  formattedAddress["address_type"] = type;
  formattedAddress["address"] = obj.address;

  return formattedAddress;
}

export function formatShipmentLTL(obj: any) {
  const items = obj.items;
  const references = [];

  Array(5)
    .fill(1)
    .map((x, index) => {
      const number = Object.keys(obj).find((key) =>
        key.includes(`reference_no${index}`),
      );
      const type = Object.keys(obj).find((key) =>
        key.includes(`reference_type${index}`),
      );
      number && type
        ? references.push({ number: obj[number], type: obj[type] })
        : "";
    });

  const formattedItems = items.map((item: any) => {
    const isHazard =
      item.hazardous_material && item.hazardous_material === "on";
    const isStack = item.stackable && item.stackable === "on";
    const isMixed = item.mixed_pallet && item.mixed_pallet === "on";

    return {
      ...item,
      hazardous_material: isHazard,
      stackable: isStack,
      mixed_pallet: isMixed,
    };
  });

  return {
    references,
    items: formattedItems,
    notes: obj.notes,
    goods_value: obj.goods_value,
    weight_unit: "lb",
    skid_spots: obj.skid_spots,
    volume: obj.volume,
    density: obj.density,
    weight: obj.weight,
    quantity: obj.quantity,
  };
}

export function formatShipmentObj(obj: any) {
  const acc = extractAccesorialsShipment(obj);
  let references = [];
  let formattedShipment = {};

  Array(5)
    .fill(1)
    .map((x, index) => {
      const number = Object.keys(obj).find((key) =>
        key.includes(`reference_no${index}`),
      );
      const type = Object.keys(obj).find((key) =>
        key.includes(`reference_type${index}`),
      );
      number && type
        ? references.push({ number: obj[number], type: obj[type] })
        : "";
    });

  acc ? (formattedShipment["accessorials"] = acc) : "";
  references.length ? (formattedShipment["references"] = references) : "";

  obj.min_temp_reefer
    ? (formattedShipment["min_temp"] = obj.min_temp_reefer)
    : "";
  obj.max_temp_reefer
    ? (formattedShipment["max_temp"] = obj.max_temp_reefer)
    : "";
  obj.packing_method
    ? (formattedShipment["packing_method"] = obj.packing_method.toLowerCase())
    : "";
  obj.emergency_name
    ? (formattedShipment["emergency_contact"] = obj.emergency_name)
    : "";
  obj.emergency_phone
    ? (formattedShipment["emergency_phone1"] = obj.emergency_phone)
    : "";
  obj.emergency_phone2
    ? (formattedShipment["emergency_phone2"] = obj.emergency_phone2)
    : "";
  obj.un_id_number ? (formattedShipment["un_number"] = obj.un_id_number) : "";
  obj.special_instructions
    ? (formattedShipment["notes"] = obj.special_instructions)
    : "";
  obj.weight ? (formattedShipment["weight"] = obj.weight) : "";
  obj.weight_type
    ? (formattedShipment["weight_unit"] = obj.weight_type.toLowerCase())
    : "";
  obj.quantity ? (formattedShipment["quantity"] = obj.quantity) : "";
  obj.commodity ? (formattedShipment["commodity"] = obj.commodity) : "";
  obj.hazardous_goods
    ? (formattedShipment["hazardous_goods"] = Boolean(
        obj.hazardous_goods === "yes",
      ))
    : "";
  formattedShipment["goods_value"] = obj.goods_value;
  formattedShipment["load_number"] = obj.load_number;
  formattedShipment["packing_type"] = obj.packing_type;

  return formattedShipment;
}

export function formatReview(obj: any) {
  let formattedReview = {};

  formattedReview["currency"] = obj.currency;
  formattedReview["deadline_date"] = obj.deadlineDate;
  formattedReview["deadline_time"] = obj.deadlineTime;
  formattedReview["quote_type"] = obj.quoteType;
  formattedReview["save_template"] = obj.saveTemplate;
  formattedReview["template_name"] = obj.templateName;

  return formattedReview;
}

export function toShortId(id: string) {
  return id.substring(id.length - 7, id.length).toUpperCase();
}

export function convertStringToBool(text: string) {
  return text === "true";
}

export function clearText(text: string) {
  if (!text) return;
  return text.toLowerCase().replaceAll("_", " ").trim();
}
