import type { Metadata } from "next"
import { Inconsolata } from "next/font/google"
import "./globals.css"
import { StarknetProvider } from "./provider"
import { Toaster } from "react-hot-toast"
import { AntdRegistry } from '@ant-design/nextjs-registry';

const inconsolata = Inconsolata({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StarkSwirl",
  description: "Created with zkSTARKs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inconsolata.className} dark:bg-black bg-gray-300 dark:text-white transition-all duration-500 ease-in-out`}
      >
        <StarknetProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </StarknetProvider>
        <Toaster />
      </body>
    </html>
  )
}
