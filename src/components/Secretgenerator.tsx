"use client"

import React, { useState } from "react"
import { Input } from "./ui/input"
import { pedersen } from "@scure/starknet" 

export default function SecretGenerator() {
  const [secret, setSecret] = useState<string | null>("")
  const [nullifier, setNullifier] = useState<string | null>("")
  const [hash, setHash] = useState<string | null>("")

  const generateRandomNumber = () => {
    return (Math.floor(Math.random()* Math.random() * Math.random() *900000) + 100000).toString()
  }

  const getSecret = () => {
    setSecret(generateRandomNumber())
  }

  const getNullifier = () => {
    setNullifier(generateRandomNumber())
  }

  const getHash = () => {
    if (secret && nullifier) {
      const secretBigInt = BigInt(secret)
      const nullifierBigInt = BigInt(nullifier)
      setHash(pedersen(secretBigInt, nullifierBigInt).toString()) // Ensure you call pedersen correctly
    }
  }

  return (
    <div className="tabs flex flex-col w-full">
      <nav className="min-h-14 mb-0 pb-0 ml-6">
        <ul className="flex items-center justify-between flex-grow-1 flex-shrink-0">
          <li className="m-0 p-0">
            <a
              className="flex justify-center select-none rounded-tl-md items-center relative mr-7 m-0 pr-7 border border-primary border-solid cursor-pointer hover:bg-primary"
              style={{ fontSize: "1.35rem" }}
            >
              <span>Note</span>
            </a>
          </li>
        </ul>
      </nav>
      <section
        className="flex mt-0 flex-col bg-dark rounded-b-md h-full border border-primary border-solid"
        style={{ padding: "1.5rem 1.5rem 2rem" }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-3">
            <Input className="w-48 border-secondary" value={secret ?? ""} placeholder="secret" readOnly />
            <button
                className="flex w-full h-full  bg-secondary justify-center items-center text-center hover:bg-secondary transition-all hover:shadow-md hover:shadow-black duration-75 active:bg-secondary active:translate-x-0.5 active:translate-y-0.5"
                onClick={getSecret}
              >
                {"generate secret"}
            </button>
          </div>
          <div className="flex flex-row gap-3">
            <Input className="w-48 border-secondary" value={nullifier ?? ""} placeholder="nullifier" readOnly />
            <button
                className="flex w-full h-full  bg-secondary justify-center items-center text-center hover:bg-secondary transition-all hover:shadow-md hover:shadow-black duration-75 active:bg-secondary active:translate-x-0.5 active:translate-y-0.5"
                onClick={getNullifier}
              >
                {"generate nullifier"}
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <button
                className="flex w-full h-10 bg-secondary justify-center items-center text-center hover:bg-secondary transition-all hover:shadow-md hover:shadow-black duration-75 active:bg-secondary active:translate-x-0.5 active:translate-y-0.5"
                onClick={getHash}
              >
                {"generate hash"}
            </button>
            <Input className="border-secondary" value={hash ?? ""} placeholder="hash" readOnly />
          </div>
        </div>
      </section>
    </div>
  )
}