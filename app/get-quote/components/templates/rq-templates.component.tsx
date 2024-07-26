import SearchInputComponent from "@/common/components/search-input/search-input.component";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";

export default function RqTemplatesComponent() {
  return (
    <div className={"rq-templates"}>
      <div className={"template-title"}>
        <h2>Select Template</h2>
        <h4>Select a template or create a new request</h4>

        <div className={"action-panel"}>
          <SearchInputComponent placeholder={"Search Templates"} />

          <button className={"create-template"}>
            <PlusCircle />
            Create Template
          </button>
        </div>
      </div>
    </div>
  );
}
