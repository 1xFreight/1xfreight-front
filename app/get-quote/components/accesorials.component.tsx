export default function AccesorialsComponent() {
  function toggleSpoiler() {
    const el = document.getElementById("accesorial-spoiler");
    const elWrapper = document.getElementById("acsrls-spoiler-wrapper");

    if (el.style.display === "flex") return (el.style.display = "none");
    el.style.display = "flex";
  }

  return (
    <div className={"acsrls-spoiler-wrapper"} id={"acsrls-spoiler-wrapper"}>
      <div className={"show-btn"} onClick={() => toggleSpoiler()}>
        <h2>title</h2>
      </div>

      <div className={"acsrls-spoiler"} id={"accesorial-spoiler"}>
        <div className={"location-type"}>
          <h3>Delivery Location Type</h3>
          <select>
            <option>Business</option>
            <option>Unknown</option>
            <option>Unknown</option>
          </select>
        </div>

        <div className={"options-wrapper"}>
          <div className={"option"}>
            <input type={"checkbox"} name={"LAF"} />
            <h3>Limited Access Fee</h3>
          </div>

          <div className={"option"}>
            <input type={"checkbox"} name={"LAF"} />
            <h3>Limited Access Fee</h3>
          </div>

          <div className={"option"}>
            <input type={"checkbox"} name={"LAF"} />
            <h3>Limited Access Fee</h3>
          </div>

          <div className={"option"}>
            <input type={"checkbox"} name={"LAF"} />
            <h3>Limited Access Fee</h3>
          </div>

          <div className={"option"}>
            <input type={"checkbox"} name={"LAF"} />
            <h3>Limited Access Fee</h3>
          </div>

          <div className={"option"}>
            <input type={"checkbox"} name={"LAF"} />
            <h3>Limited Access Fee</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
