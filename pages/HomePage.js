import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import SuperfluidStreamAddress from "../constants/SuperfluidStreamAddress.json"
import abi from "../constants/abi.json"
import { ethers } from "ethers"
import { useMoralis } from "react-moralis"
import { recoverAddress } from "ethers/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
    const buttonClassName =
        "xl:w-32 border border-black rounded-xl hover:border-2 p-2 text-lg hover:scale-110 ... transition ease-in duration-200 delay-100 dark:text-white dark:border dark:border-white dark:hover:border-2 "
    return (
        <div className=" dark:bg-black h-screen grid place-content-center w-full p-4 font-semibold text-gray-900">
            <div className="bg-white dark:bg-black w-115 xm:w-120 xl:w-130 md:w-140 items-center rounded-lg shadow-md shadow-gray-400 dark:shadow-gray-400 dark:text-white p-4">
                <div className=" text-center p-4 flex flex-col gap-10">
                    <h1 className="font-bold text-3xl md:text-5xl">
                        <span>Manage</span> money every second.
                    </h1>
                    <h3 className=" text-md md:text-lg">
                        StreamSwap is a 2-in-1 tool that helps you to manage
                        real-time money and swap crypto assets through
                        dollar-cost averaging.
                    </h3>
                    <div className="flex flex-row justify-center gap-4">
                        <Link href="./Super">
                            <button className={buttonClassName}>Start</button>
                        </Link>
                        <a
                            target="_blank"
                            href="https://github.com/meikei-99/StreamSwap"
                        >
                            {" "}
                            <button className={buttonClassName}>Guide</button>
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-2 place-content-center">
                    <Image
                        src="/home5.png"
                        alt="Logo of the page"
                        width="300"
                        height="300"
                        className="dark:invert ... dark:hue-rotate-150 ... h-full "
                    />
                    <Image
                        src="/home4.png"
                        alt="Logo of the page"
                        width="300"
                        height="300"
                        className="dark:invert ... dark:hue-rotate-150 ... h-full "
                    />
                </div>
            </div>
        </div>
    )
}
