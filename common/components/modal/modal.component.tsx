import "./styles.css";

export default function ModalComponent() {
  return (
    <div className={"general-modal-component"}>
      <div className={"modal-backdrop"}></div>

      <div className={"modal"}>
        <div className={"modal-title"}>
          <h3>Title</h3>
        </div>

        <div className={"modal-content"}></div>

        <div className={"modal-actions"}></div>
      </div>
    </div>
  );
}
