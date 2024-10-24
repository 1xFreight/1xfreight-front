import "./styles.css";
import Sort from "@/public/icons/sort.svg";
import Cross from "@/public/icons/24px/cross.svg";

export default function TableSortButtonComponent({
  setSortBy,
  sortBy,
  sortDirection,
  setSortDirection,
  options,
}) {
  // const options = ["id", "type", "cost"];

  return (
    <div className={"table-sort-button"}>
      <div className={"sort-column-wrapper"}>
        <div className={"sort-svg"}>
          <Sort width={25} height={25} />
        </div>
        <select
          className={"sort-column"}
          defaultValue={sortBy ?? "default"}
          onChange={(ev) => {
            setSortBy(ev.target.value);
            const direction = document.getElementById("sortby-direction-quote");

            if (direction) {
              direction.value = "ASC";
              setSortDirection("ASC");
            } else {
              setSortDirection("ASC");
            }
          }}
          id={"sortby-select-quote"}
        >
          <option disabled value={"default"}>
            Sort by
          </option>
          {options.map((option) => (
            <option key={option.key} value={option.key}>
              {option.name}
            </option>
          ))}
        </select>

        {!!sortBy && (
          <>
            <div className={"sort-direction fade-in"}>
              <select
                id={"sortby-direction-quote"}
                defaultValue={sortDirection ?? "ASC"}
                onChange={(ev) => setSortDirection(ev.target.value)}
              >
                <option value={"ASC"}>A→Z</option>
                <option value={"DESC"}>Z→A</option>
              </select>
            </div>
            <div
              className={"delete-sortby"}
              onClick={() => {
                setSortBy(null);
                document.getElementById("sortby-select-quote").value =
                  "default";
              }}
            >
              <Cross width={20} height={20} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
