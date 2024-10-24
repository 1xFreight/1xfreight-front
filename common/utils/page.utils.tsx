import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import { UserRolesEnum } from "@/common/enums/user-roles.enum";

export function findUserPage(
  status: QuoteStatusEnum,
  role: UserRolesEnum,
  bidsNumber: number,
  quote_id: string,
  roomId?: string,
) {
  let path = "";

  if (
    role === UserRolesEnum.SHIPPER ||
    role === UserRolesEnum.SHIPPER_MEMBER ||
    role === UserRolesEnum.SHIPPER_DEMO
  ) {
    if (
      status === QuoteStatusEnum.REQUESTED ||
      status === QuoteStatusEnum.CANCELED
    ) {
      bidsNumber > 0
        ? (path = `/quotes/${quote_id}`)
        : (path = `/quotes/view/${quote_id}`);

      roomId && bidsNumber > 0 ? (path += `/${roomId}#chat`) : "";
    } else {
      path = `/shipments/${quote_id}${roomId ? "#chat" : ""}`;
    }
  }

  if (role === UserRolesEnum.CARRIER) {
    if (status === QuoteStatusEnum.REQUESTED) {
      path = `/available-quotes/${quote_id}`;
    }

    if (status === QuoteStatusEnum.DELIVERED) {
      path = `/history/view/${quote_id}`;
    }

    if (
      status !== QuoteStatusEnum.REQUESTED &&
      status !== QuoteStatusEnum.DELIVERED &&
      status !== QuoteStatusEnum.CANCELED
    ) {
      path = `/active-loads/${quote_id}`;
    }
  }

  return path;
}
