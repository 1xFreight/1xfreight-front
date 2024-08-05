import numberCommaFormat from "@/common/utils/number-comma.utils";

export default function QTableComponent() {
  return (
    <div className={"q-table-wrapper"}>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Valid until</th>
            <th>Est. Per Mile</th>
            <th>Per Load</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={"company-title"}>Fortus Group</div>
            </td>
            <td>
              <div>
                <div className={"main-text"}>Apr 24,2024</div>
                <div className={"sub-text active"}>Active</div>
              </div>
            </td>
            <td>
              <div>
                <div className={"main-text"}>$ 2.33</div>
                <div className={"sub-text"}>Total est. miles: 2,499</div>
              </div>
            </td>
            <td>
              <div className={"price"}>
                <div className={"full-price"}>
                  <span>$</span>
                  {numberCommaFormat(1300)}
                </div>
                <div className={"currency"}>USD</div>
              </div>
            </td>
            <td>
              <div className={"end"}>
                <button className={"view"}>View Quote</button>
                <button className={"accept"}>Accept Quote</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
