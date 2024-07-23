import "./styles.css";
import QuoteStatusComponent from "@/app/quotes/components/quotes-table/quote-status.component";
import ArrowUp from "@/public/icons/24px/arrow-up.svg";
import ArrowDown from "@/public/icons/24px/arrow-down.svg";
import QuoteActionButtonComponent from "@/app/quotes/components/quotes-table/action-button.component";
import { QuotePreviewI } from "@/common/interfaces/quote-preview.interface";
import numberCommaFormat from "@/common/utils/number-comma.utils";

interface QuotesTableI {
  rows: QuotePreviewI[];
}

export default function QuotesTableComponent({ rows }: QuotesTableI) {
  return (
    <div className={"quotes-table"}>
      <table>
        <thead>
          <tr>
            <th>Quote#</th>
            <th>Type</th>
            <th>Pickup</th>
            <th>Drop</th>
            <th>Details</th>
            <th>Ref#</th>
            <th>Equipment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!!rows.length &&
            rows.map(
              ({
                id,
                status,
                pickupAddress,
                pickupDate,
                dropDate,
                dropAddress,
                ref,
                refDetails,
                equipment,
                currency,
                price,
                type,
                weight,
                weightDetails,
              }) => (
                <tr key={id}>
                  <td>
                    <div className={"number"}>{id}</div>
                    <QuoteStatusComponent status={status} />
                  </td>
                  <td>
                    <div className={"main-text"}>{type}</div>
                  </td>
                  <td className={"pickup"}>
                    <div className={"location main-text"}>
                      <ArrowUp />
                      {pickupAddress}
                    </div>
                    <div className={"date sub-text"}>{pickupDate}</div>
                  </td>
                  <td className={"drop"}>
                    <div className={"location main-text"}>
                      <ArrowDown />
                      {dropAddress}
                    </div>
                    <div className={"date sub-text"}>{dropDate}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{weight} lbs</div>
                    <div className={"sub-text"}>{weightDetails}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{ref}</div>
                    <div className={"sub-text"}>{refDetails}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{equipment}</div>
                  </td>
                  <td>
                    <div className={"end"}>
                      <div className={"price"}>
                        <div className={"full-price"}>
                          <span>$</span>
                          {numberCommaFormat(price)}
                        </div>
                        <div className={"currency"}>{currency}</div>
                      </div>

                      <QuoteActionButtonComponent status={status} />
                    </div>
                  </td>
                </tr>
              ),
            )}
        </tbody>
      </table>
      {!rows.length && <div className={"no-data"}>no data placeholder</div>}
    </div>
  );
}
