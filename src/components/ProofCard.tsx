import React, { useEffect } from "react"
import { useState } from "react"
export default function ProofCard() {
  const [proof, setProof] = useState<string>("")

  const generateProof = () => {
    setProof(generateRandomString(5000))
  }
  const characters =
  "ABCDEFabcdef0123456789";
  const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
  useEffect(() => {
    generateProof()
  }, [])

  return (
    <div className="tabs flex flex-col w-full">
      <nav className="min-h-14 mb-0 pb-0 ml-6">
        <ul className="flex items-center justify-between flex-grow-1 flex-shrink-0">
          <li className="m-0 p-0">
            <a
              className="flex justify-center select-none rounded-tl-md items-center relative mr-7 m-0 pr-7 border  border-primary border-solid cursor-pointer hover:bg-primary"
              style={{ fontSize: "1.35rem" }}
            >
              {" "}
              <span>Proof</span>
            </a>
          </li>
        </ul>
      </nav>
      <section
        className="flex mt-0 flex-col bg-dark rounded-b-md h-full w-full border border-primary border-solid"
        style={{ padding: "1.5rem 1.5rem 2rem" }}
      >
        <textarea className="bg-black text-white h-full" value={proof}/>
      </section>
    </div>
  )
}
