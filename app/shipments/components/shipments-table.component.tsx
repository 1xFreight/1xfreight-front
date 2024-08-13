import Star from "@/public/icons/40px/star.svg";
import Arrow from "@/public/icons/40px/Arrow 1.svg";
import Checkmark from "@/public/icons/14px/checkmark-circle.svg";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import Marker from "@/public/icons/35px/marker.svg";
import Doc from "@/public/icons/35px/document.svg";
import Archive from "@/public/icons/35px/archives 1.svg";

export default function ShipmentsTableComponent() {
  return (
    <table>
      <thead>
        <tr>
          <th>Favorite</th>
          <th>Mode</th>
          <th>Status</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Pickup</th>
          <th>Delivery</th>
          <th>Carrier</th>
          <th>Cost</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <div className={"svg-favorite"}>
              <Star />
            </div>
          </td>
          <td>
            <div className={"main-text"}>FTL</div>
          </td>
          <td>
            <div className={"main-text"}>At Pickup</div>
          </td>
          <td>
            <div className={"ship-table-pickup"}>
              <div>
                <div className={"main-text"}>Clinton, IA 45987</div>
                <div className={"sub-text"}>Moldex INC</div>
              </div>
              <div className={"pickup-arrow"}>
                <Arrow />
              </div>
            </div>
          </td>

          <td>
            <div className={"main-text"}>Clinton, IA 45987</div>
            <div className={"sub-text"}>Moldex INC</div>
          </td>

          <td>
            <div className={"main-text"}>May 20, 2024</div>
            <div
              className={"sub-text active"}
              style={{
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <Checkmark /> 10:05AM
            </div>
          </td>

          <td>
            <div className={"main-text"}>May 20, 2024</div>
            <div
              className={"sub-text active"}
              style={{
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <Checkmark /> 10:05AM
            </div>
          </td>

          <td>
            <div className={"main-text"}>Ship Fortus LTD</div>
          </td>
          <td>
            <div className={"price"}>
              <div className={"full-price"}>
                <span>$</span>
                {numberCommaFormat(1799)}
              </div>
              <div className={"currency"}>USD</div>
            </div>
          </td>

          <td>
            <div className={"ship-table-actions"}>
              <div className={"tooltip"}>
                <button>
                  <Archive />
                </button>
                <span className={"tooltiptext"}>Action</span>
              </div>

              <div className={"tooltip"}>
                <button>
                  <Doc />
                </button>
                <span className={"tooltiptext"}>Action</span>
              </div>

              <div className={"tooltip"}>
                <button>
                  <Marker />
                </button>
                <span className={"tooltiptext"}>Edit</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
