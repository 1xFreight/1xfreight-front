import ModeOfTransportationComponent from "@/app/get-quote/components/mode-of-transportation.component";

export default function RqModeSelectComponent() {
  return (
    <div className={"page get-quote-page"}>
      <div className={"container select-trans-mode"}>
        <h4>Mode of transportation</h4>
        <h2>Select the appropriate mode of transportation</h2>

        <ModeOfTransportationComponent />
      </div>
    </div>
  );
}
