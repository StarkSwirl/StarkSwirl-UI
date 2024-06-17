import Image from "next/image";
import Header from "~/Header";
import Interactioncard from "./components/Interactioncard";
import { Inter } from "next/font/google";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 md:p-24">
      <div
        className="flex flex-col items-center container w-full "
        style={{ maxWidth: "960px" }}
      >
        <div className="">
          <Header />
        </div>
        <div className="">
          <Image
            src="/starkswirllogo.png"
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            alt="StarkSwirl"
            width={100}
            height={100}
            priority
          />
        </div>
        <div className="w-2/4 mt-20">
          <Interactioncard />
        </div>
      </div>
    </main>
  );
}
