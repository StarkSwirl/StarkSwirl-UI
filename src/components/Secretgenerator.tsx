"use client"

import React, { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
import pedersen from "@scure/starknet"
import PedersenArg from "@scure/starknet"
import { ec } from "@scure/starknet"

import { z } from "zod"

export default function Secretgenerator() {
  const [secret, setSecret] = useState<string | PedersenArg | null>("")
  const [nullifier, setNullifier] = useState<string | PedersenArg | null>("")
  const [hash, setHash] = useState<string | null>("")

  const generateRandomNumber = () => {
    return (Math.floor(Math.random() * 9000) + 1000).toString()
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
      setHash(pedersen(secretBigInt, nullifierBigInt).toString())
    }
  }
  return (
    <div className="tabs flex flex-col w-full">
      <nav className="min-h-14 mb-0 pb-0 ml-6">
        <ul className="flex items-center justify-between flex-grow-1 flex-shrink-0">
          <li className="m-0 p-0">
            <a
              className="flex justify-center select-none rounded-tl-md items-center relative mr-7 m-0 pr-7 border  border-primary border-solid cursor-pointer hover:bg-primary"
              style={{ fontSize: "1.35rem" }}
            >
              <span>Secret</span>
            </a>
          </li>
        </ul>
      </nav>
      <section
        className="flex mt-0 flex-col bg-dark rounded-b-md h-full border border-primary border-solid"
        style={{ padding: "1.5rem 1.5rem 2rem" }}
      >
        {" "}
        <div className="flex flex-col gap-9">
          <div className="flex flex-row gap-3">
            <Input value={secret} />
            <Button onClick={() => getSecret()}>Generate Secret</Button>
          </div>
          <div className="flex flex-row gap-3">
            <Input value={nullifier} />
            <Button onClick={() => getNullifier()}>Generate nullifier</Button>
          </div>
          <div>
            <Button onClick={() => getHash()}>Generate Pedersen Hash</Button>
          </div>
          <Input value={hash} />
        </div>
      </section>
    </div>
  )
}
