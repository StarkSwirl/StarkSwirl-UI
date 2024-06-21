import type { Metadata } from "next"
import { Inconsolata } from "next/font/google"
import "./globals.css"
import { StarknetProvider } from "./provider"
import { Toaster } from "react-hot-toast"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from "antd";
import Header from "@/components/Header";

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
          <ConfigProvider
          theme={{
            components: {
              Slider: {
                trackBg: "#6E001F",
                trackHoverBg: "#AA0030",
                railBg: "#0C0C4F",
                railHoverBg: "#0E0E5C",
                controlSize: 16,
                handleActiveColor: "#AA0030",
                handleColor: "#AA0030",
                dotActiveBorderColor: "#AA0030",
                dotSize: 8,
                fontFamily: "Inconsolata, monospace",
              },
            },
          }}
          >
            <AntdRegistry>
              <Header />
              {children}
            </AntdRegistry>
          </ConfigProvider>
        </StarknetProvider>
        <Toaster />
      </body>
    </html>
  )
}
