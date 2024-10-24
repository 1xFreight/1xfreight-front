import { UserRolesEnum } from "@/common/enums/user-roles.enum";

export const RolesPagesConfig = {
  ALL: ["/", "/test", "/test/email"],
  [UserRolesEnum.SHIPPER]: [
    "/quotes",
    "/shipments",
    "/analytics",
    "/settings",
    "/get-quote",
    "/docs/bol",
    "/goto",
  ],
  [UserRolesEnum.SHIPPER_DEMO]: [
    "/quotes",
    "/shipments",
    "/analytics",
    "/settings",
    "/get-quote",
    "/docs/bol",
    "/goto",
  ],
  [UserRolesEnum.SHIPPER_MEMBER]: [
    "/quotes",
    "/shipments",
    "/analytics",
    "/settings",
    "/get-quote",
    "/docs/bol",
    "/goto",
  ],
  [UserRolesEnum.CARRIER]: [
    "/available-quotes",
    "/active-loads",
    "/history",
    "/docs/bol",
    "/goto",
  ],
};
