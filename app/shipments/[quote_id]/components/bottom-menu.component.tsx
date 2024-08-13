import Document from "@/public/icons/24px/document2.svg";
import Archive from "@/public/icons/24px/archives 1.svg";
import Refresh from "@/public/icons/24px/refresh-double.svg";
import Printer from "@/public/icons/24px/printer.svg";
import AddNote from "@/public/icons/24px/add-note2.svg";

export default function BottomMenuComponent() {
  return (
    <div className={"bottom-menu fade-in-bottom"}>
      <div className={"container"}>
        <div>
          <div className={"main-text"}>Carrier Quote #: 567422</div>
          <div className={"main-text"}>BOL #: 567422</div>
        </div>

        <button>
          <Document /> View BOL
        </button>
        <button>
          <Printer /> Print Labels
        </button>
        <button>
          <Archive /> Duplicate Load
        </button>
        <button>
          <AddNote /> Add PO#
        </button>
        <button>
          <Refresh /> Change Carrier
        </button>
      </div>
    </div>
  );
}
