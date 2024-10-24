"use client";

import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { deleteCacheById, getWithAuth } from "@/common/utils/fetchAuth.util";
import { findUserPage } from "@/common/utils/page.utils";
import { useEffect } from "react";

export default function FindChatRoom({
  params,
}: {
  params: {
    room: string;
  };
}) {
  const router = useRouter();

  const findPage = useDebouncedCallback(
    () => {
      const quoteId = params.room.split("%3A")?.[0];
      const roomId = params.room.split("%3A")?.[1];

      if (!quoteId) return;

      getWithAuth(`/quote/quote-status/${quoteId}`).then((data) => {
        const path = findUserPage(
          data.quoteStatus,
          data.userRole,
          data.bidsNumber,
          quoteId,
          roomId,
        );

        // Delete cached data for quote
        deleteCacheById(quoteId);

        router.push(path);
      });
    },
    500,
    { leading: true },
  );

  useEffect(() => {
    findPage();
  }, []);

  return <></>;
}
