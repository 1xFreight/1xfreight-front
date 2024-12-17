import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import React from "react";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import { getWithAuth } from "@/common/utils/fetchAuth.util";

interface QuoteActionButtonI {
  status: QuoteStatusEnum;
}

function QuoteActionButtonComponent({
  status,
  number,
  viewLink,
  prefetchQuoteId,
}: QuoteActionButtonI) {
  const router = useRouter();

  const textMapping = {
    [QuoteStatusEnum.CANCELED]: "View",
    [QuoteStatusEnum.REQUESTED]: "Awaiting Quotes",
    [QuoteStatusEnum.BOOKED]: `View ${number ?? ""} Quotes`,
  };

  const prefetchQuoteURL = useDebouncedCallback(() => {
    router.prefetch(viewLink);
    getWithAuth(`/quote?limit=1&id=${prefetchQuoteId}`).then((data) => {});
  }, 50);

  return (
    <Link href={viewLink ? viewLink : ""} onMouseEnter={prefetchQuoteURL}>
      <button
        className={`quote-action-button ${status == QuoteStatusEnum.BOOKED ? "variant2" : ""}`}
        // disabled={status === QuoteStatusEnum.REQUESTED}
      >
        {textMapping[status]}
      </button>
    </Link>
  );
}

export default React.memo(QuoteActionButtonComponent);
