import { useEffect, useState } from "react"
import { ConnectButton } from "@web3uikit/web3"
import Link from "next/link"
import {
    IoRepeat,
    IoPulseOutline,
    IoServerOutline,
    IoGridOutline,
} from "react-icons/io5"
import { RiSunLine } from "react-icons/ri"
import { BsMoon, BsReplyAll } from "react-icons/bs"

export default function SidebarComponent() {
    const [toggle, setToggle] = useState(true)
    const buttonClassName =
        "hover:bg-violet-100 focus:bg-violet-100 hover:shadow-md dark:hover:shadow-sm dark:hover:text-slate-400 dark:hover:shadow-gray-500 dark:hover:bg-gray-800 dark:focus:shadow-md dark:focus:shadow-gray-700 flex flex-row justify-start items-center p-1 w-full rounded-lg cursor-pointer dark:focus:text-white dark:focus:bg-gradient-to-r dark:focus:from-gray-700 dark:focus:to-gray-700"
    const buttonIconClassName = "text-lg xsm:text-3xl m-3"
    const buttonHeadingClassName =
        "text-lg group-hover:text-white font-semibold"
    const buttonGroup = "dark:text-slate-400 dark:hover:text-white"

    useEffect(() => {
        if (window.localStorage.getItem("theme")) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [toggle])

    const handleToggle = () => {
        setToggle(!toggle)
        if (toggle) {
            window.localStorage.setItem("theme", "mode")
        } else {
            window.localStorage.removeItem("theme")
        }
    }

    return (
        <div className="border border-slate-200 bg-white h-screen p-4 py-4 w-90 dark:border-none dark:bg-black">
            <div className="flex flex-col h-full gap-6 rounded-3xl dark:bg-black">
                <h1 className="dark:text-white mt-4 text-2xl xsm:text-3xl text-center font-bold text-gray-900 w-full">
                    StreamSwap
                </h1>
                <div className=" w-full pb-2">
                    <ConnectButton moralisAuth={false} />
                </div>

                <div className="my-2 w-full flex flex-col gap-4">
                    <Link href="./HomePage" className={buttonGroup}>
                        <button className={buttonClassName}>
                            <IoGridOutline
                                className={buttonIconClassName}
                            ></IoGridOutline>
                            <h2 className={buttonHeadingClassName}>Home</h2>
                        </button>
                    </Link>
                    <Link href="./Super" className={buttonGroup}>
                        <button className={buttonClassName}>
                            <IoServerOutline
                                className={buttonIconClassName}
                            ></IoServerOutline>
                            <h2 className={buttonHeadingClassName}>Wrap</h2>
                        </button>
                    </Link>
                    <Link href="./Stream" className={buttonGroup}>
                        <button className={buttonClassName}>
                            <IoPulseOutline
                                className={buttonIconClassName}
                            ></IoPulseOutline>
                            <h2 className={buttonHeadingClassName}>Stream</h2>
                        </button>
                    </Link>
                    <Link href="./Swap" className={buttonGroup}>
                        <button className={buttonClassName}>
                            <IoRepeat
                                className={buttonIconClassName}
                            ></IoRepeat>
                            <h2 className={buttonHeadingClassName}>Swap</h2>
                        </button>
                    </Link>
                    <Link href="./Withdraw" className={buttonGroup}>
                        <button className={buttonClassName}>
                            <BsReplyAll
                                className={buttonIconClassName}
                            ></BsReplyAll>
                            <h2 className={buttonHeadingClassName}>Withdraw</h2>
                        </button>
                    </Link>
                    <Link href="" className={buttonGroup}>
                        <button
                            className={buttonClassName}
                            onClick={handleToggle}
                        >
                            {toggle ? (
                                <div>
                                    <RiSunLine className="text-lg xsm:text-3xl m-2 ml-3 mr-3"></RiSunLine>
                                </div>
                            ) : (
                                <div>
                                    <BsMoon className="text-sm xsm:text-2xl m-2 ml-4 mr-3.5"></BsMoon>
                                </div>
                            )}
                            <h2 className={buttonHeadingClassName}>Theme</h2>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
