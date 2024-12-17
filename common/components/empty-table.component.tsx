import EmptyGIF from "@/public/gif/empty.gif";
import Image from "next/image";

export default function EmptyTableComponent({ button }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={EmptyGIF} alt={"empty"} width={150} />
      {button}
    </div>
  );
}
