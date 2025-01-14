"use client";

import numberCommaFormat from "@/common/utils/number-comma.utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { formatDate } from "@/common/utils/date.utils";
import useStore from "@/common/hooks/use-store.context";
import { useDebouncedCallback } from "use-debounce";
import {
  deleteCache,
  deleteCacheById,
  postWithAuth,
} from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";
import useQuoteContext from "@/app/quotes/[quote_id]/use-quote.context";
import { getCurrencySymbol } from "@/common/utils/currency";

export default function QTableComponent({
  quotes,
  estimatedMiles,
  loadNumbers,
}) {
  const { showToast } = useStore();
  const router = useRouter();
  const { setIsMissingData, quote } = useQuoteContext();

  const acceptQuote = useDebouncedCallback((quote_id, bid_id) => {
    postWithAuth("/quote/accept", {
      quote_id,
      bid_id,
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();

        if (errorData?.message === "Missing data") {
          return setIsMissingData(bid_id);
        }

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

      deleteCache();

      router.push(`/goto/${quote_id}`);
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
            {/*<th>Total amount</th>*/}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!!quotes &&
            !!quotes.length &&
            quotes.map((carrierQuote, index) => (
              <tr key={`${carrierQuote.user.email}-${index}`}>
                <td>
                  <div className={"number"}>{index + 1}</div>
                </td>
                <td>
                  <div className={"main-text"}>
                    {carrierQuote.local_carrier?.name}
                  </div>
                  <div className={"sub-text"}>{carrierQuote.user.email}</div>
                </td>
                <td>
                  <div>
                    <div className={"main-text"}>
                      {formatDate(carrierQuote.valid_until)}
                    </div>
                    <div className={`sub-text ${carrierQuote.status}`}>
                      {carrierQuote.status}
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className={"main-text"}>
                      {getCurrencySymbol(quote?.currency)}{" "}
                      {(carrierQuote.amount / estimatedMiles).toFixed(2)}
                    </div>
                    <div className={"sub-text"}>
                      Total estimated miles: {estimatedMiles}
                    </div>
                  </div>
                </td>
                <td>
                  <div className={"price"}>
                    <div className={"full-price"}>
                      <span>{getCurrencySymbol(quote?.currency)}</span>
                      {numberCommaFormat(carrierQuote.amount)}
                    </div>
                    <div className={"currency"}>USD</div>
                  </div>
                </td>
                {/*<td>*/}
                {/*  <div className={"price"}>*/}
                {/*    <div className={"full-price"}>*/}
                {/*      <span>$</span>*/}
                {/*      {numberCommaFormat(quote.amount * loadNumbers)}*/}
                {/*    </div>*/}
                {/*    <div className={"currency"}>USD</div>*/}
                {/*  </div>*/}
                {/*</td>*/}

                <td>
                  <div className={"end"}>
                    <Link href={`${carrierQuote.quote_id}/${carrierQuote._id}`}>
                      <button className={"accept"}>View Details</button>
                    </Link>
                    <button
                      className={"accept  variant2"}
                      onClick={() => {
                        document.getElementById(
                          carrierQuote._id,
                        ).style.display = "flex";
                      }}
                    >
                      Accept Quote
                    </button>
                  </div>
                  <ConfirmActionComponent
                    title={`Accept ${carrierQuote.user.email} quote ?`}
                    id={carrierQuote._id}
                    action={() =>
                      acceptQuote(carrierQuote.quote_id, carrierQuote._id)
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
