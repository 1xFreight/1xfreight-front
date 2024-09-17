"use client";

import { disablePastDates, getYesterday } from "@/common/utils/date.utils";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import { clearText } from "@/common/utils/data-convert.utils";

export default function AddArrivalTimeComponent({
  open,
  setOpen,
  addresses,
  title,
}) {
  const { showToast } = useStore();
  const quote_id = addresses[0].quote_id;
  const alreadyArrivedFilteredAddresses = addresses.filter(
    (address) => !address.hasOwnProperty("arrival_time"),
  );

  const pickupFilteredAddresses = alreadyArrivedFilteredAddresses.filter(
    ({ address_type }) => address_type == "pickup",
  );

  const dropFilteredAddresses = alreadyArrivedFilteredAddresses.filter(
    ({ address_type }) => address_type == "drop",
  );

  const addressesList = pickupFilteredAddresses.length
    ? pickupFilteredAddresses
    : dropFilteredAddresses;

  const updateStatusDebounced = useDebouncedCallback(() => {
    const address_id = (
      document.getElementById("arrival-address-selector") as HTMLSelectElement
    ).value;
    const arrival_date = (
      document.getElementById("arrival-date-picker") as HTMLInputElement
    ).value;
    const arrival_hours = (
      document.getElementById("arrival-time-hours") as HTMLSelectElement
    ).value;
    const arrival_minutes = (
      document.getElementById("arrival-time-minutes") as HTMLSelectElement
    ).value;
    const arrival_midday = (
      document.getElementById("arrival-time-midday") as HTMLSelectElement
    ).value;
    const arrival_time = `${arrival_hours}:${arrival_minutes} ${arrival_midday}`;

    postWithAuth(`/quote/update-status/${quote_id}`, {
      address_id,
      arrival_date,
      arrival_time,
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        return showToast({
          type: ToastTypesEnum.ERROR,
          text: errorData.message || "Something went wrong",
          duration: 5000,
        });
      }

      showToast({
        type: ToastTypesEnum.SUCCESS,
        text: "Arrival time was added successfully",
        duration: 5000,
      });

      setOpen(false);
    });
  }, 300);

  if (!open) return;

  return (
    <div className={"arrival-time-modal"}>
      <div className={"arrival-backdrop"}></div>
      <div className={"arrival-content"}>
        <h3
          style={{
            textTransform: "capitalize",
          }}
        >
          {clearText(title)}
        </h3>

        <h5>Select address</h5>
        <select id={"arrival-address-selector"}>
          {addressesList?.map((address) => (
            <option key={address._id} value={address._id}>
              {address.address}
            </option>
          ))}
        </select>

        <h5>Location arrival time:</h5>

        <div>
          <input
            type={"date"}
            min={getYesterday()}
            defaultValue={disablePastDates()}
            id={"arrival-date-picker"}
          />
          <div className={"time-selectors"}>
            <select id={"arrival-time-hours"}>
              {Array(12)
                .fill(1)
                .map((x, index) => (
                  <option key={index + "x" + index} value={index + 1}>
                    {index + 1 < 10 ? "0" : ""}
                    {index + 1}
                  </option>
                ))}
            </select>
            <h2>:</h2>
            <select id={"arrival-time-minutes"}>
              {Array(12)
                .fill(1)
                .map((x, index) => (
                  <option key={index + "x" + index} value={index * 5}>
                    {index * 5 < 10 ? "0" : ""}
                    {index * 5}
                  </option>
                ))}
            </select>{" "}
            <select id={"arrival-time-midday"}>
              <option value={"AM"}>AM</option>
              <option value={"PM"}>PM</option>
            </select>
          </div>
        </div>

        <div className={"actions"}>
          <button className={"cancel"} onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button
            className={"confirm"}
            onClick={() => {
              updateStatusDebounced();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
