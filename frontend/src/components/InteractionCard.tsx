"use client"

import React, { useState } from "react"
import TokenSelect from "./TokenSelect"

export default function InteractionCard() {
  const [tabIndex, setTabIndex] = useState<number>(1)

  // Two children lists, first child list with content cut after and last child with content cut before
  return (
    <div className="tabs flex flex-col">
      <nav className="min-h-14 mb-0 pb-0">
        <ul className="flex items-center justify-between flex-grow-1 flex-shrink-0">
          <li className="m-0 p-0">
            <a
              onClick={() => setTabIndex(1)}
              className={
                tabIndex === 1
                  ? "active flex select-none justify-center rounded-tl-md items-center relative mr-7 m-0 pr-7 border bg-primary border-primary border-solid cursor-pointer"
                  : "flex justify-center select-none rounded-tl-md items-center relative mr-7 m-0 pr-7 border  border-primary border-solid cursor-pointer hover:bg-pink-700"
              }
              style={{ fontSize: "1.35rem" }}
            >
              <span>Deposit</span>
            </a>
          </li>
          <li className="m-0 p-0 ">
            <a
              onClick={() => setTabIndex(2)}
              className={
                tabIndex === 2
                  ? "active flex select-none justify-center rounded-tr-md items-center relative ml-7 m-0 pl-7 border border-primary bg-primary border-solid cursor-pointer"
                  : "flex justify-center select-none items-center rounded-tr-md relative ml-7 m-0 pl-7 border border-primary border-solid cursor-pointer hover:bg-pink-700"
              }
              style={{ fontSize: "1.35rem" }}
            >
              <span>Withdraw</span>
            </a>
          </li>
        </ul>
      </nav>
      <section
        className="flex mt-0 flex-col bg-dark rounded-b-md h-full border border-primary border-solid"
        style={{ padding: "1.5rem 1.5rem 2rem" }}
      >
        <div className={tabIndex === 1 ? "content active-content" : "content"}>
          <TokenSelect/>
        </div>
        <div className={tabIndex === 2 ? "content active-content" : "content"}>
          tab2
        </div>
      </section>
    </div>
  )
}
