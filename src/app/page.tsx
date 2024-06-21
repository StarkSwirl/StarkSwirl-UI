import { EvervaultCard } from "@/components/ui/evervault-card"
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div
        className="page-content flex flex-col items-center container w-full "
        style={{ maxWidth: "960px" }}
      >
        <div className="h-screen mt-0 pt-0">
          <EvervaultCard>
            <div className="relative h-fit w-fit  rounded-full flex flex-col items-center justify-center text-white font-bold">
              <div>
                <div className="absolute w-full h-full bg-white/[0.8] dark:bg-black/[0.8] blur-3xl rounded-full" />
                <span className="dark:text-white font-extrabold text-black z-30 text-5xl">Mixer Protocol on <span className="dark:text-white">Starknet</span></span>
              </div>
              <Link href="/interaction"
                className="flex w-36 z-30 cursor-pointer h-10 mt-5 rounded-lg bg-primary justify-center items-center text-center hover:bg-red-800 transition-all hover:shadow-md hover:shadow-black duration-75 active:bg-primary active:translate-x-0.5 active:translate-y-0.5"
              >
                {"Launch App"}
              </Link>
          </div>
          </EvervaultCard>
        </div>
      </div>
    </main>
  )
}
