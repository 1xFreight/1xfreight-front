import { QuoteAddressI } from "@/common/interfaces/quote-preview.interface";
import Arrow from "@/public/icons/20px/Arrow 2.svg";

interface ExtraAWI {
  stops: QuoteAddressI[];
}

export default function ExtraAddressWindowComponent({ stops }: ExtraAWI) {
  return (
    <div className={"extra-address-window"}>
      <h4>Stops</h4>

      <div className={"address-list location"}>
        {stops.map(({ address, date }, index) => (
          <>
            {index !== 0 && <Arrow />}

            <div className={"address"} key={address + index}>
              <div className={"main-text"}>{address}</div>

              <div className={"sub-text"}>{date}</div>
            </div>
          </>
        ))}
      </div>

      <div className={"arrow-down"}></div>
    </div>
  );
}
