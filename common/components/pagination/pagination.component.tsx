"use client";

import "./styles.css";
import { paginationConfig } from "@/common/config/pagination.config";
import Arrow from "@/public/icons/24px/arrow-right.svg";

export default function PaginationComponent({
  pages,
  page,
  setPage,
}: {
  pages: number;
  page: number;
  setPage;
}) {
  const pagesLimit = pages / paginationConfig.pageLimit;

  return (
    <div className={"pagination-wrapper"}>
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
        <Arrow />
      </button>
      <div>{page}</div>
      <button disabled={page >= pagesLimit} onClick={() => setPage(page + 1)}>
        <Arrow />
      </button>
    </div>
  );
}
