import "./styles.css";
import Loading from "@/public/icons/loading.svg";
import LoadingAnimation from "@/public/loading-animation.gif";
import Image from "next/image";
export default function LoadingComponent() {
  return (
    <div className={"default-loading-component"}>
      {/*<Loading />*/}
      <Image
        src={LoadingAnimation}
        alt={"loading..."}
        style={{
          filter: "hue-rotate(335deg) drop-shadow(0 0 5px #e7e7e7)",
        }}
        quality={100}
      />
      <h3>Loading...</h3>
    </div>
  );
}
