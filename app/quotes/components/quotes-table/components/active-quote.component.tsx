import "../active-quote/styles.css";
import QuoteStatusComponent from "@/app/quotes/components/quotes-table/components/quote-status.component";
import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import ArrowUp from "@/public/icons/24px/arrow-up.svg";
import ArrowDown from "@/public/icons/24px/arrow-down.svg";
import PriceCommaFormat from "@/common/utils/number-comma.utils";
import QuoteActionButtonComponent from "@/app/quotes/components/quotes-table/components/action-button.component";

export default function ActiveQuoteComponent() {
  return (
    <div className={"active-quote"}>
      <div className={"quote"}>
        <div className={"title"}>Quote#</div>
        <div className={"number"}>01722</div>
        <QuoteStatusComponent status={QuoteStatusEnum.CONFIRMED} />
      </div>

      <div className={"details"}>
        <div className={"type"}>
          <div className={"title"}>Type</div>
          <div className={"quote-type main-text"}>FTL</div>
        </div>

        <div className={"pickup"}>
          <div className={"title"}>Pickup</div>
          <div className={"location main-text"}>
            <ArrowUp />
            Clinton, IA 45987
          </div>
          <div className={"date sub-text"}>Feb 26 7AM-5PM</div>
        </div>

        <div className={"drop"}>
          <div className={"title"}>Drop</div>
          <div className={"location main-text"}>
            <ArrowDown />
            Clinton, IA
          </div>
          <div className={"date sub-text"}>Feb 26 7AM-5PM</div>
        </div>

        <div className={"q-details"}>
          <div className={"title"}>Details</div>
          <div className={"main-text"}>35,000 lbs</div>
          <div className={"sub-text"}>Paper Rolls / Floor Loaded</div>
        </div>

        <div className={"ref"}>
          <div className={"title"}>Ref#</div>
          <div className={"main-text"}>000145890</div>
          <div className={"sub-text"}>Value: $35,000, Live Load</div>
        </div>

        <div className={"equipment"}>
          <div className={"title"}>Equipment</div>
          <div className={"main-text"}>
            53’ Dryvan ,<br />
            53’ Reefer
          </div>
        </div>
      </div>

      <div className={"end"}>
        <div className={"price"}>
          <div className={"full-price"}>
            <span>$</span>
            {PriceCommaFormat(1300)}
          </div>
          <div className={"currency"}>USD</div>
        </div>

        <QuoteActionButtonComponent status={QuoteStatusEnum.CONFIRMED} />
      </div>
    </div>
  );
}
