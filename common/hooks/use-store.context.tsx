"use client";

import { useContext } from "react";
import { StoreContext } from "@/common/contexts/store.context";

export default function UseStoreContext() {
  return useContext(StoreContext);
}
