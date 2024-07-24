import Refresh from "@/public/icons/24px/refresh-right.svg";

export default function RefreshComponent() {
  return (
    <div className={"refresh"}>
      <p>Last refreshed at: 10:25</p>

      <button className={"refresh-btn"}>
        <Refresh />
      </button>
    </div>
  );
}
