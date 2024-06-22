import { EvervaultCard } from "@/components/ui/evervault-card"
import Link from "next/link";
import GithubSVG from "@/lib/icons/githubIcon";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <EvervaultCard>
        <div className="flex flex-col">
          <div className="relative h-fit w-fit p-32 rounded-full flex flex-col items-center justify-center text-white font-bold">
            <div className="">
              <div className="absolute w-full h-full blur-3xl rounded-full" />
              <span className="dark:text-white font-extrabold text-black z-30 text-4xl"> A Privacy Preserving Mixer Protocol on <span className="dark:text-white">Starknet</span></span>
            </div>
            <Link href="/interaction"
              className="flex w-36 z-30 cursor-pointer h-10 mt-5 rounded-lg bg-primary justify-center items-center text-center hover:bg-primary transition-all hover:shadow-md hover:shadow-black duration-75 active:bg-primary active:translate-x-0.5 active:translate-y-0.5"
            >
              {"Launch App"}
            </Link>
          </div>
            {/* <footer className="z-10 h-80 w-full flex flex-col self-end justify-center items-center gap-10 bg-black">
            <a href="https://github.com/StarkSwirl/StarkSwirl-monorepo" target="_blank">
              <GithubSVG className="hover:fill-white" />
            </a>
            <p className="font-medium">
              Made with 🤍 by{" "}
              <a
                className="font-semibold hover:underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
                href={"https://x.com/0xmihirsahu"}
              >
                {" "}
                Mihir,
              </a>
              <a
                className="font-semibold hover:underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
                href={"https://x.com/Mierlo1999"}
              >
                {" "}
                Paul{" "}
              </a>
              &{" "}
              <a
                className="font-semibold hover:underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
                href={"https://x.com/filiplaurentiu"}
              >
                {" "}
                Filip
              </a>
            </p>
          </footer> */}
        </div>
      </EvervaultCard>
    </main>
  )
}
