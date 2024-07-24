"use client";

import Search from "@/public/icons/24px/search.svg";
import "./styles.css";
import { Dispatch, SetStateAction } from "react";

interface CustomSearchInputI {
  width?: string;
  placeholder?: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function SearchInputComponent({
  placeholder,
  width,
  setSearch,
}: CustomSearchInputI) {
  return (
    <div
      className={"search-input-custom-wrapper"}
      style={{
        width,
      }}
    >
      <Search />
      <input
        type={"text"}
        className={"search-input-custom"}
        placeholder={placeholder ? placeholder : ""}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
