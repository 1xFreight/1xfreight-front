import { generatePickHours } from "@/common/utils/time.utils";
import SwitchComponent from "@/common/components/slider/switch.component";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";

const defaultLocationShift = "1:00 AM - 1:00 AM";
export default function LocationOpenHoursComponent({
  defaultData,
  index,
  disableExistingData = false,
}) {
  const [locationOpenHours, setLocationOpenHours] = useState({
    monday: defaultLocationShift,
    tuesday: defaultLocationShift,
    wednesday: defaultLocationShift,
    thursday: defaultLocationShift,
    friday: defaultLocationShift,
    saturday: defaultLocationShift,
    sunday: defaultLocationShift,
  });

  const setOpenHours = () => {
    const openHours = {};
    const readBy = document.getElementById(
      `ready-by-${index}`,
    ) as HTMLSelectElement;
    const closesAt = document.getElementById(
      `closes-at-${index}`,
    ) as HTMLSelectElement;
    const isOpenNonstop = document.getElementById(
      `open_nonstop-${index}`,
    ) as HTMLInputElement;

    const shift =
      isOpenNonstop.value === "true"
        ? "24/7"
        : readBy.value.toUpperCase() + " - " + closesAt?.value?.toUpperCase();

    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ].map((weekDay) => {
      const weekDayCheckbox = document.getElementById(
        `${weekDay}-checkbox-open-${index}`,
      ) as HTMLInputElement;
      weekDayCheckbox.checked ? (openHours[weekDay] = shift) : "";
      weekDayCheckbox.checked = false;
    });

    setLocationOpenHours((prevState) => {
      return {
        ...prevState,
        ...openHours,
      };
    });
  };

  const formatLocationOpenHours = () => {
    const daysOfWeek = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    const dayAbbreviations = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    let formattedHours = "";
    let streakStart = null;
    let streakEnd = null;
    let lastHours = null;

    daysOfWeek.forEach((day, index) => {
      const currentHours = locationOpenHours[day];
      // if (!currentHours) return "";

      if (currentHours === lastHours) {
        streakEnd = index;
      } else {
        if (streakStart !== null) {
          formattedHours +=
            formatStreak(streakStart, streakEnd, lastHours) + ", ";
        }
        streakStart = index;
        streakEnd = index;
        lastHours = currentHours;
      }
    });

    // Add the last streak
    if (streakStart !== null) {
      formattedHours += formatStreak(streakStart, streakEnd, lastHours);
    }

    return formattedHours;

    function formatStreak(start, end, hours) {
      if (start === end) {
        return `${dayAbbreviations[start]}: ${hours}`;
      }
      return `${dayAbbreviations[start]} - ${dayAbbreviations[end]}: ${hours}`;
    }
  };

  const [formattedOpenHoursString, setFormattedOpenHoursString] = useState(
    defaultData?.open_hours ?? formatLocationOpenHours(),
  );

  useEffect(() => {
    setFormattedOpenHoursString(
      defaultData?.open_hours ?? formatLocationOpenHours(),
    );
  }, [locationOpenHours]);

  return (
    <div className={"location-details"}>
      <h3>Location Details:</h3>

      <div
        style={{
          display: "inline-flex",
        }}
      >
        <div>
          <h5>Company name:</h5>
          <input
            type={"text"}
            placeholder={"Type here..."}
            name={"company_name"}
            defaultValue={defaultData?.company_name}
            disabled={!!defaultData?.company_name && disableExistingData}
          />
        </div>

        <div>
          <h5>Contact name:</h5>
          <input
            type={"text"}
            placeholder={"Type here..."}
            name={"contact_name"}
            defaultValue={defaultData?.contact_name}
            disabled={!!defaultData?.contact_name && disableExistingData}
          />
        </div>

        <div>
          <h5>Contact phone:</h5>

          <InputMask
            mask="(999) 999-9999"
            placeholder="(123) 456-7890"
            className="phone-input"
            defaultValue={defaultData?.contact_phone}
            disabled={!!defaultData?.contact_phone && disableExistingData}
            required
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type={"text"}
                name={"contact_phone"}
                disabled={!!defaultData?.contact_phone && disableExistingData}
              />
            )}
          </InputMask>
        </div>

        <div>
          <h5>
            Contact email: <span>(optional)</span>
          </h5>
          <input
            type={"text"}
            placeholder={"Type here..."}
            name={"contact_email"}
            defaultValue={defaultData?.contact_email}
            disabled={!!defaultData?.contact_email && disableExistingData}
          />
        </div>

        <input
          type={"text"}
          name={"open_hours"}
          style={{
            display: "none",
          }}
          value={formattedOpenHoursString}
          readOnly
        />
      </div>

      <div className={"formatted-open-hours-wrapper"}>
        {formattedOpenHoursString.split(",").map((openHoursLine) => (
          <div key={openHoursLine} className={"formatted-open-hours"}>
            {openHoursLine}
          </div>
        ))}
      </div>

      <div
        className={"open-hours-wrapper"}
        style={{
          display:
            disableExistingData && defaultData?.open_hours ? "none" : "flex",
        }}
      >
        <div className={"open-hours-time"}>
          <div>
            <h5>Ready by: </h5>
            <select id={`ready-by-${index}`} required>
              {generatePickHours().map((time, index) => (
                <option key={time + index} value={time}>
                  {time}
                </option>
              ))}
            </select>{" "}
          </div>

          <div>
            <h5>Closes at: </h5>
            <select id={`closes-at-${index}`} required>
              {generatePickHours().map((time, index) => (
                <option key={time + index} value={time}>
                  {time}
                </option>
              ))}
            </select>{" "}
          </div>
        </div>

        <div className={"open-hours-days-checkboxes"}>
          <div className={"open-days"}>
            <div className={"open-day-item"}>
              <input
                type={"checkbox"}
                className={"rounded-checkbox"}
                defaultChecked
                id={`monday-checkbox-open-${index}`}
              />
              <h5>Mon</h5>
            </div>

            <div className={"open-day-item"}>
              <input
                type={"checkbox"}
                defaultChecked
                id={`tuesday-checkbox-open-${index}`}
              />
              <h5>Tue</h5>
            </div>

            <div className={"open-day-item"}>
              <input
                type={"checkbox"}
                defaultChecked
                id={`wednesday-checkbox-open-${index}`}
              />
              <h5>Wed</h5>
            </div>

            <div className={"open-day-item"}>
              <input
                type={"checkbox"}
                defaultChecked
                id={`thursday-checkbox-open-${index}`}
              />
              <h5>Thu</h5>
            </div>

            <div className={"open-day-item"}>
              <input
                type={"checkbox"}
                defaultChecked
                id={`friday-checkbox-open-${index}`}
              />
              <h5>Fri</h5>
            </div>

            <div className={"open-day-item"}>
              <input
                type={"checkbox"}
                defaultChecked
                id={`saturday-checkbox-open-${index}`}
              />
              <h5>Sat</h5>
            </div>

            <div className={"open-day-item"}>
              <input
                type={"checkbox"}
                defaultChecked
                id={`sunday-checkbox-open-${index}`}
              />
              <h5>Sun</h5>
            </div>
          </div>

          <div>
            <h5>Open 24/7</h5>
            <SwitchComponent inputName={`open_nonstop-${index}`} />
          </div>
        </div>

        <button
          className={"add-open-hours"}
          onClick={() => setOpenHours()}
          type={"button"}
        >
          save
        </button>
      </div>
    </div>
  );
}
