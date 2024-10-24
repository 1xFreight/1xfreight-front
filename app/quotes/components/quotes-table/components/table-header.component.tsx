"use client";

import useStore from "@/common/hooks/use-store.context";
import { useEffect, useState } from "react";

const keys = {
  origin: "firstPickup.address",
  destination: "firstDrop.address",
  pickup: "firstPickup.dateAsDate",
  drop: "firstDrop.dateAsDate",
  value: "details.goods_value",
  weight: "details.weight",
  bids: "bidsNumber",
  loadId: "quote_id_short",
};

export default function QuoteTableHeader() {
  const { filters, setFilters } = useStore();
  const [sort, setSort] = useState<any>();

  useEffect(() => {
    if (sort) setFilters({ ...filters, sort: JSON.stringify(sort) });
  }, [sort]);

  useEffect(() => {
    if (filters?.sort == "{}") {
      Object.keys(keys).map((key) => {
        const thEl = document.getElementById(`sort-th-${keys[key]}`);
        setSort(null);

        const thDirectionSelect = thEl?.querySelector(`select`);

        if (thDirectionSelect) {
          thDirectionSelect.value = "-1";
        }

        if (thEl) {
          thEl.classList.remove("active");
        }
      });
    }
  }, [filters]);

  const addSort = (key: string, direction: number, toggle = false) => {
    const tableHeader = document.getElementById(`sort-th-${key}`);
    const sortCopy = sort ? { ...sort } : {};

    if (sortCopy.hasOwnProperty(key) && toggle) {
      return removeSort(key);
    }

    tableHeader.classList.add("active");

    sortCopy[key] = Number(direction);
    setSort(sortCopy);
  };

  const removeSort = (key: string) => {
    const tableHeader = document.getElementById(`sort-th-${key}`);
    tableHeader.classList.remove("active");
    const thDirectionSelect = tableHeader.querySelector(`select`);

    if (thDirectionSelect) {
      thDirectionSelect.value = "-1";
    }

    const sortCopy = sort ? { ...sort } : {};
    delete sortCopy[key];
    setSort(sortCopy);
  };

  return (
    <tr className={""}>
      <th>
        <div className={"sort-table-header"} id={`sort-th-${keys.loadId}`}>
          <div
            className={"sort-details"}
            onClick={() => addSort(keys.loadId, -1, true)}
          >
            Load#
            <span>sort by id</span>
          </div>
          <select
            defaultValue={"-1"}
            onChange={(ev) => addSort(keys.loadId, Number(ev.target.value))}
          >
            <option value={"1"}>A→Z</option>
            <option value={"-1"}>Z→A</option>
          </select>
        </div>
      </th>
      <th>Mode</th>
      <th>
        <div className={"sort-table-header"} id={`sort-th-${keys.origin}`}>
          <div
            className={"sort-details"}
            onClick={() => addSort(keys.origin, -1, true)}
          >
            Origin
            <span>sort by</span>
          </div>
          <select
            defaultValue={"-1"}
            onChange={(ev) => addSort(keys.origin, Number(ev.target.value))}
          >
            <option value={"1"}>A→Z</option>
            <option value={"-1"}>Z→A</option>
          </select>
        </div>
      </th>
      <th>
        <div className={"sort-table-header"} id={`sort-th-${keys.destination}`}>
          <div
            className={"sort-details"}
            onClick={() => addSort(keys.destination, -1, true)}
          >
            Destination
            <span>sort by</span>
          </div>
          <select
            defaultValue={"-1"}
            onChange={(ev) =>
              addSort(keys.destination, Number(ev.target.value))
            }
          >
            <option value={"1"}>A→Z</option>
            <option value={"-1"}>Z→A</option>
          </select>
        </div>
      </th>
      <th>
        <div className={"sort-table-header"} id={`sort-th-${keys.pickup}`}>
          <div
            className={"sort-details"}
            onClick={() => addSort(keys.pickup, -1, true)}
          >
            Pickup
            <span>sort by</span>
          </div>
          <select
            defaultValue={"-1"}
            onChange={(ev) => addSort(keys.pickup, Number(ev.target.value))}
          >
            <option value={"1"}>A→Z</option>
            <option value={"-1"}>Z→A</option>
          </select>
        </div>
      </th>
      <th>
        <div className={"sort-table-header"} id={`sort-th-${keys.drop}`}>
          <div
            className={"sort-details"}
            onClick={() => addSort(keys.drop, -1, true)}
          >
            Delivery
            <span>sort by</span>
          </div>
          <select
            defaultValue={"-1"}
            onChange={(ev) => addSort(keys.drop, Number(ev.target.value))}
          >
            <option value={"1"}>A→Z</option>
            <option value={"-1"}>Z→A</option>
          </select>
        </div>
      </th>
      <th>
        <div className={"sort-table-header"} id={`sort-th-${keys.weight}`}>
          <div
            className={"sort-details"}
            onClick={() => addSort(keys.weight, -1, true)}
          >
            Details
            <span>sort by weight</span>
          </div>
          <select
            defaultValue={"-1"}
            onChange={(ev) => addSort(keys.weight, Number(ev.target.value))}
          >
            <option value={"1"}>A→Z</option>
            <option value={"-1"}>Z→A</option>
          </select>
        </div>
      </th>
      <th>
        <div className={"sort-table-header"} id={`sort-th-${keys.value}`}>
          <div
            className={"sort-details"}
            onClick={() => addSort(keys.value, -1, true)}
          >
            Ref#
            <span>sort by value</span>
          </div>
          <select
            defaultValue={"-1"}
            onChange={(ev) => addSort(keys.value, Number(ev.target.value))}
          >
            <option value={"1"}>A→Z</option>
            <option value={"-1"}>Z→A</option>
          </select>
        </div>
      </th>
      <th>Equipment</th>
      <th>
        <div className={"sort-table-header"} id={`sort-th-${keys.bids}`}>
          <div
            className={"sort-details"}
            onClick={() => addSort(keys.bids, -1, true)}
          >
            Quotes
            <span>sort by</span>
          </div>
          <select
            defaultValue={"-1"}
            onChange={(ev) => addSort(keys.bids, Number(ev.target.value))}
          >
            <option value={"1"}>A→Z</option>
            <option value={"-1"}>Z→A</option>
          </select>
        </div>
      </th>
    </tr>
  );
}
