import LoadingComponent from "@/common/components/loading/loading.component";
import LoadingSVG from "@/public/icons/loading.svg";
import Logo from "@/public/logo/1xfreight-logo.svg";
import GifLoad from "@/public/gif/giphy.webp";
import Image from "next/image";

export default function LoadingCircle() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
        minHeight: "50vh",
      }}
      className={"loading-circle-general"}
    >
      <div className={"loading-box"}>
        <Image src={GifLoad} alt={"loading"} width={100} quality={100} />
      </div>
    </div>
  );
}
