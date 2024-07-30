import ChevronDown from "@/public/icons/24px/chevron-down.svg";

interface AccesorialsComponentI {
  title: string;
  index: number;
}

export default function AccesorialsComponent({
  title,
  index,
}: AccesorialsComponentI) {
  function toggleSpoiler() {
    const elWrapper = document.getElementById(
      `acsrls-spoiler-wrapper-${index}`,
    );
    elWrapper.classList.toggle("open-spoiler");
  }

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
          <h4>Delivery Location Type</h4>
          <select name={"deliveryLocationType"}>
            <option>Business</option>
            <option>Unknown</option>
            <option>Unknown</option>
          </select>
        </div>

        <div className={"options-wrapper"}>
          <div className={"option"}>
            <input type={"checkbox"} name={"LAF"} />
            <h4>Limited Access Fee</h4>
          </div>

          <div className={"option"}>
            <input type={"checkbox"} name={"PJR"} />
            <h4>Pallet Jack Required</h4>
          </div>

          <div className={"option"}>
            <input type={"checkbox"} name={"AR"} />
            <h4>Appointment Required</h4>
          </div>

          <div className={"option"}>
            <input type={"checkbox"} name={"NPTD"} />
            <h4>Notify Prior To Delivery</h4>
          </div>

          <div className={"option"}>
            <input type={"checkbox"} name={"ID"} />
            <h4>Inside Delivery</h4>
          </div>

          <div className={"option"}>
            <input type={"checkbox"} name={"LGDR"} />
            <h4>Lift-Gate Deliver Required</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
