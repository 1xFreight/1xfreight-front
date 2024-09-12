import { UserRolesEnum } from "@/common/enums/user-roles.enum";

export const RolesPagesConfig = {
  ALL: ["/", "/test"],
  [UserRolesEnum.SHIPPER]: [
    "/quotes",
    "/shipments",
    "/analytics",
    "/settings",
    "/get-quote",
  ],
  [UserRolesEnum.SHIPPER_DEMO]: [
    "/quotes",
    "/shipments",
    "/analytics",
    "/settings",
    "/get-quote",
  ],
  [UserRolesEnum.SHIPPER_MEMBER]: [
    "/quotes",
    "/shipments",
    "/analytics",
    "/settings",
    "/get-quote",
  ],
  [UserRolesEnum.CARRIER]: ["/available-quotes", "/active-loads", "/history"],
};
