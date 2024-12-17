"use client";

import useStore from "@/common/hooks/use-store.context";
import { useEffect, useState } from "react";

const keys = {
  origin: "firstPickup.address",
  destination: "firstDrop.address",
  pickup: "firstPickup.dateAsDate",
  drop: "firstDrop.dateAsDate",
  loadId: "quote_id_short",
  cost: "total_cost",
  carrier: "local_carrier.name",
};

export default function ShipmentsTableHeader() {
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
      if (sortCopy[key] === -1) {
        tableHeader.classList.add("active");
        const selectEl = tableHeader.querySelector("select");
        selectEl.value = "1";
        sortCopy[key] = 1;
        return setSort(sortCopy);
      }

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

  // <tr>
  //   <th>Load ID</th>
  //   <th>Status</th>
  //   <th>Mode</th>
  //   <th>Origin</th>
  //   <th>Destination</th>
  //   <th>Pickup</th>
  //   <th>Delivery</th>
  //   <th>Carrier</th>
  //   <th>Cost</th>
  //   <th>Actions</th>
  // </tr>

  return (
    <tr className={""}>
      <th>
        <div className={"sort-table-header"} id={`sort-th-${keys.loadId}`}>
          <div
            className={"sort-details"}
            onClick={() => addSort(keys.loadId, -1, true)}
          >
            Load#
          </div>
          <select
            id={"sortby-direction-quote"}
            defaultValue={"-1"}
            onChange={(ev) => addSort(keys.loadId, Number(ev.target.value))}
          >
            <option value={"1"}>A→Z</option>
            <option value={"-1"}>Z→A</option>
          </select>
        </div>
      </th>
      <th>Status</th>
      <th>Mode</th>
      <th>
        <div className={"sort-table-header"} id={`sort-th-${keys.origin}`}>
          <div
            className={"sort-details"}
            onClick={() => addSort(keys.origin, -1, true)}
          >
            Origin
          </div>
          <select
            id={"sortby-direction-quote"}
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
          </div>
          <select
            id={"sortby-direction-quote"}
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
          </div>
          <select
            id={"sortby-direction-quote"}
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
          </div>
          <select
            id={"sortby-direction-quote"}
            defaultValue={"-1"}
            onChange={(ev) => addSort(keys.drop, Number(ev.target.value))}
          >
            <option value={"1"}>A→Z</option>
            <option value={"-1"}>Z→A</option>
          </select>
        </div>
      </th>
      <th>
        <div className={"sort-table-header"} id={`sort-th-${keys.carrier}`}>
          <div
            className={"sort-details"}
            onClick={() => addSort(keys.carrier, -1, true)}
          >
            Carrier
          </div>
          <select
            id={"sortby-direction-quote"}
            defaultValue={"-1"}
            onChange={(ev) => addSort(keys.carrier, Number(ev.target.value))}
          >
            <option value={"1"}>A→Z</option>
            <option value={"-1"}>Z→A</option>
          </select>
        </div>
      </th>
      <th>
        <div className={"sort-table-header"} id={`sort-th-${keys.cost}`}>
          <div
            className={"sort-details"}
            onClick={() => addSort(keys.cost, -1, true)}
          >
            Per Load
            {/*<span>sort by</span>*/}
          </div>
          <select
            id={"sortby-direction-quote"}
            defaultValue={"-1"}
            onChange={(ev) => addSort(keys.cost, Number(ev.target.value))}
          >
            <option value={"1"}>A→Z</option>
            <option value={"-1"}>Z→A</option>
          </select>
        </div>
      </th>
      <th></th>
    </tr>
  );
}
