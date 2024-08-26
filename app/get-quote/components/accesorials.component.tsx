import ChevronDown from "@/public/icons/24px/chevron-down.svg";
import { accessorialsConvertToText } from "@/common/utils/data-convert.utils";

interface AccesorialsComponentI {
  title: string;
  index: string;
  _default?: any;
}

export default function AccesorialsComponent({
  title,
  index,
  _default,
}: AccesorialsComponentI) {
  function toggleSpoiler() {
    const elWrapper = document.getElementById(
      `acsrls-spoiler-wrapper-${index}`,
    );
    elWrapper.classList.toggle("open-spoiler");
  }

  const isChecked = (acc: string) => {
    const isTrue = _default?.accessorials?.find(
      (_acc) => accessorialsConvertToText(acc) === _acc,
    );
    return !!isTrue;
  };

  return (
    <div
      className={"acsrls-spoiler-wrapper"}
      id={`acsrls-spoiler-wrapper-${index}`}
    >
      <div className={"show-btn"} onClick={() => toggleSpoiler()}>
        <h3
          style={{
            margin: 0,
          }}
        >
          {title}
        </h3>
        <ChevronDown />
      </div>

      <div className={"acsrls-spoiler"} id={"accesorial-spoiler"}>
        <div className={"location-type"}>
          <h4>Location Type</h4>
          <select
            name={"deliveryLocationType"}
            defaultValue={_default?.location_type}
          >
            <option value={"Business"}>Business</option>
            <option>Unknown</option>
            <option>Unknown</option>
          </select>
        </div>

        <div className={"options-wrapper"}>
          <div className={"option"}>
            <input
              type={"checkbox"}
              name={"LAF"}
              defaultChecked={isChecked("LAF")}
            />
            <h4>Limited Access Fee</h4>
          </div>

          <div className={"option"}>
            <input
              type={"checkbox"}
              name={"PJR"}
              defaultChecked={isChecked("PJR")}
            />
            <h4>Pallet Jack Required</h4>
          </div>

          <div className={"option"}>
            <input
              type={"checkbox"}
              name={"AR"}
              defaultChecked={isChecked("AR")}
            />
            <h4>Appointment Required</h4>
          </div>

          <div className={"option"}>
            <input
              type={"checkbox"}
              name={"NPTD"}
              defaultChecked={isChecked("NPTD")}
            />
            <h4>Notify Prior To Delivery</h4>
          </div>

          <div className={"option"}>
            <input
              type={"checkbox"}
              name={"ID"}
              defaultChecked={isChecked("ID")}
            />
            <h4>Inside Delivery</h4>
          </div>

          <div className={"option"}>
            <input
              type={"checkbox"}
              name={"LGDR"}
              defaultChecked={isChecked("LGDR")}
            />
            <h4>Lift-Gate Deliver Required</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
