import type { Metadata } from "next"
import { Inconsolata } from "next/font/google"
import "./globals.css"
import { StarknetProvider } from "./provider"
import { Toaster } from "react-hot-toast"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from "antd";

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
                trackBg: "#8C0046",
                trackHoverBg: "#AB0055",
                railBg: "#161A54",
                railHoverBg: "#261A54",
                controlSize: 16,
                handleActiveColor: "#AB0055",
                handleColor: "#AB0055",
                dotActiveBorderColor: "#AB0055",
                dotSize: 8,
                fontFamily: "Inconsolata, monospace",
              },
            },
          }}
          >
            <AntdRegistry>
              {children}
            </AntdRegistry>
          </ConfigProvider>
        </StarknetProvider>
        <Toaster />
      </body>
    </html>
  )
}
