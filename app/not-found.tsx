"use client";

import NotFoundPNG from "@/public/png/404.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 10rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Image src={NotFoundPNG} alt={"404"} width={250} />
      <h6
        style={{
          fontSize: "1rem",
        }}
      >
        page not found
      </h6>
      <button
        style={{
          width: "12rem",
          height: "3rem",
          marginTop: "1rem",
          borderRadius: "0.5rem",
        }}
        className={"variant2"}
        onClick={() => router.back()}
      >
        go back
      </button>
    </div>
  );
}
