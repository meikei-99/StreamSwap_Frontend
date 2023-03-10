import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import { ChakraProvider } from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import { NotificationProvider } from "@web3uikit/core"
import Head from "next/head"

export default function App({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>StreamSwap</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/logo.png" />
            </Head>
            <ChakraProvider>
                <MoralisProvider initializeOnMount={false}>
                    <NotificationProvider>
                        <div className="lg:flex lg:flex-row bg-white dark:bg-black">
                            <Sidebar></Sidebar>
                            <Component {...pageProps} />
                        </div>
                    </NotificationProvider>
                </MoralisProvider>
            </ChakraProvider>
        </div>
    )
}
