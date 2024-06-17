"use client";

import React, { useState } from "react";

export default function Interactioncard() {
  const [tabIndex, setTabIndex] = useState<number>(1);

  // Two children lists, first child list with content cut after and last child with content cut before
  return (
    <div className="tabs flex flex-col ">
      <nav className="min-h-14">
        <ul className="flex items-center justify-between flex-grow-1 flex-shrink-0">
          <li className="m-0 p-0">
            <a
              onClick={() => setTabIndex(1)}
              className="flex justify-center items-center relative mr-7 m-0 pr-7 border border-red-600 border-solid cursor-pointer hover:bg-pink-700"
              style={{ fontSize: "1.35rem" }}
            >
              <span>Deposit</span>
            </a>
          </li>
          <li className="m-0 p-0 ">
            <a
              onClick={() => setTabIndex(2)}
              className="flex justify-center items-center relative ml-7 m-0 pr-7 border border-red-600 border-solid cursor-pointer hover:bg-pink-700"
              style={{ fontSize: "1.35rem" }}
            >
              <span>Withdraw</span>
            </a>
          </li>
        </ul>
      </nav>
      <section
        className="flex flex-col bg-dark h-full border border-red-600 border-solid"
        style={{ padding: "1.5rem 1.5rem 2rem" }}
      >
        <div className={tabIndex === 1 ? "active-content" : "content"}>
          tab1
        </div>
        <div className={tabIndex === 2 ? "active-content" : "content"}>
          tab2
        </div>
      </section>
    </div>
  );
}
