"use client";

import { useContext } from "react";
import { StoreContext } from "@/common/contexts/store.context";

export default function useStore() {
  return useContext(StoreContext);
}
