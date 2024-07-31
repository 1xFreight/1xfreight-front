"use client";

import { Freeze } from "react-freeze";
import { ReactNode } from "react";

export default function PageWrapperComponent({
  freeze,
  children,
}: {
  freeze: boolean;
  children: ReactNode;
}) {
  return <Freeze freeze={freeze}>{children}</Freeze>;
}
