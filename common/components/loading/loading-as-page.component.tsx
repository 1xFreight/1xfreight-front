import LoadingComponent from "@/common/components/loading/loading.component";

export default function Loading2Component() {
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
    >
      <LoadingComponent />
    </div>
  );
}
