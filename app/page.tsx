"use client";

import useStore from "@/common/hooks/use-store.context";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import { UserRolesEnum } from "@/common/enums/user-roles.enum";

export default function Home() {
  const { session } = useStore();
  const router = useRouter();

  const goToHomePageByRole = useDebouncedCallback(
    (role: string) => {
      if (
        [
          UserRolesEnum.SHIPPER as string,
          UserRolesEnum.SHIPPER_DEMO as string,
          UserRolesEnum.SHIPPER_MEMBER as string,
        ].includes(role)
      ) {
        router.push("/quotes");
      }

      if ([UserRolesEnum.CARRIER as string].includes(role)) {
        router.push("/available-quotes");
      }
    },
    700,
    {
      leading: true,
    },
  );

  useEffect(() => {
    if (!session) return;

    goToHomePageByRole(session?.role);
  }, []);

  return (
    <div>
      <div className={"container1"}></div>
    </div>
  );
}
