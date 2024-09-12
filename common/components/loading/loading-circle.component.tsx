import LoadingComponent from "@/common/components/loading/loading.component";
import LoadingSVG from "@/public/icons/loading.svg";

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
      <LoadingSVG />
    </div>
  );
}
