"use client";

import numberCommaFormat from "@/common/utils/number-comma.utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { formatDate } from "@/common/utils/date.utils";
import useStore from "@/common/hooks/use-store.context";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";

export default function QTableComponent({
  quotes,
  estimatedMiles,
  loadNumbers,
}) {
  const { showToast } = useStore();
  const router = useRouter();

  const acceptQuote = useDebouncedCallback((quote_id, bid_id) => {
    postWithAuth("/quote/accept", {
      quote_id,
      bid_id,
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
        text: "Quote accepted",
        duration: 5000,
      });

      router.push("/quotes");
    });
  }, 350);

  return (
    <div className={"q-table-wrapper"}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Carrier</th>
            <th>Valid until</th>
            <th>Estimated per mile</th>
            <th>Per load</th>
            <th>Total amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!!quotes &&
            !!quotes.length &&
            quotes.map((quote, index) => (
              <tr key={`${quote.user.email}-${index}`}>
                <td>
                  <div className={"number"}>{index + 1}</div>
                </td>
                <td>
                  <div className={"main-text"}>{quote.local_carrier?.name}</div>
                  <div className={"sub-text"}>{quote.user.email}</div>
                </td>
                <td>
                  <div>
                    <div className={"main-text"}>
                      {formatDate(quote.valid_until)}
                    </div>
                    <div className={`sub-text ${quote.status}`}>
                      {quote.status}
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className={"main-text"}>
                      $ {(quote.amount / estimatedMiles).toFixed(2)}
                    </div>
                    <div className={"sub-text"}>
                      Total estimated miles: {estimatedMiles}
                    </div>
                  </div>
                </td>
                <td>
                  <div className={"price"}>
                    <div className={"full-price"}>
                      <span>$</span>
                      {numberCommaFormat(quote.amount)}
                    </div>
                    <div className={"currency"}>USD</div>
                  </div>
                </td>
                <td>
                  <div className={"price"}>
                    <div className={"full-price"}>
                      <span>$</span>
                      {numberCommaFormat(quote.amount * loadNumbers)}
                    </div>
                    <div className={"currency"}>USD</div>
                  </div>
                </td>

                <td>
                  <div className={"end"}>
                    <Link href={`${quote.quote_id}/${quote._id}`}>
                      <button className={"view"}>View Quote</button>
                    </Link>
                    <button
                      className={"accept"}
                      onClick={() => {
                        document.getElementById(quote._id).style.display =
                          "flex";
                      }}
                    >
                      Accept Quote
                    </button>
                  </div>
                  <ConfirmActionComponent
                    title={`Accept ${quote.user.email} quote ?`}
                    id={quote._id}
                    action={() => acceptQuote(quote.quote_id, quote._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
