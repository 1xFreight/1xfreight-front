"use client";

import numberCommaFormat from "@/common/utils/number-comma.utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function QTableComponent({ quotes }) {
  const pathname = usePathname();

  return (
    <div className={"q-table-wrapper"}>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Valid until</th>
            <th>Est. Per Mile</th>
            <th>Per Load</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {quotes &&
            quotes.length &&
            quotes.map((quote, index) => (
              <tr key={`${quote.company}-${index}`}>
                <td>
                  <div className={"company-title"}>{quote.company}</div>
                </td>
                <td>
                  <div>
                    <div className={"main-text"}>{quote.date}</div>
                    <div className={`sub-text ${quote.status}`}>
                      {quote.status}
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className={"main-text"}>
                      $ {quote.estimatedPerMile}
                    </div>
                    <div className={"sub-text"}>
                      Total est. miles: {quote.totalMiles}
                    </div>
                  </div>
                </td>
                <td>
                  <div className={"price"}>
                    <div className={"full-price"}>
                      <span>$</span>
                      {numberCommaFormat(quote.price)}
                    </div>
                    <div className={"currency"}>USD</div>
                  </div>
                </td>
                <td>
                  <div className={"end"}>
                    <Link href={`${pathname}/${quote.id}`}>
                      <button className={"view"}>View Quote</button>
                    </Link>
                    <button className={"accept"}>Accept Quote</button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
