import { useState, useEffect } from "react"
import { useWeb3Contract } from "react-moralis"
import SuperfluidStreamAddress from "../constants/SuperfluidStreamAddress.json"
import abi from "../constants/abi.json"
import { ethers } from "ethers"
import { useMoralis } from "react-moralis"
import { use } from "chai"

export default function Swap() {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const SuperfluidAddress =
        chainId in SuperfluidStreamAddress
            ? SuperfluidStreamAddress[chainId][0]
            : null

    const MATICxAddress = process.env.NEXT_PUBLIC_MATICx_MUMBAI
    const fDAIAddress = process.env.NEXT_PUBLIC_fDAI_MUMBAI
    const [tokenIn, setTokenIn] = useState(MATICxAddress)
    const [tokenOut, setTokenOut] = useState(fDAIAddress)
    const [upgradeSuccessStatus, setUpgradeSuccessStatus] = useState(false)
    const [upgradeFailStatus, setUpgradeFailStatus] = useState(false)
    const [showNotification, setShowNotification] = useState(true)
    const [switchButton, setSwitchButton] = useState(false)
    const [enterStatus, setEnterStatus] = useState(false)
    const [inputPrice, setInputPrice] = useState("0")
    const inputAmount = ethers.utils.parseEther(inputPrice.toString())
    const [duration, setDuration] = useState("0")
    const [enterSuccessStatus, setEnterSuccessStatus] = useState(false)

    const formClassName =
        "w-full border border-black text-xl rounded-2xl h-10 md:h-16 p-2 dark:bg-black dark:border dark:border-white"

    const handleEnterSuccess = async (tx) => {
        try {
            console.log("Entering swap...")
            console.log("Getting tx for enterSwap...")
            await tx.wait(1)
            console.log("Succesfully getting tx of enterSwap...")
            setUpgradeSuccessStatus(true)
            setEnterSuccessStatus(true)
            setEnterStatus(true)
        } catch (error) {
            console.log("Tx fail for enterSwap...")
            console.log(`Error:${error}`)
            setUpgradeFailStatus(true)
        }
    }

    const handleUpgradeSuccess = async (tx) => {
        try {
            console.log("Swapping...")
            console.log("Getting tx for swap...")
            await tx.wait(1)
            console.log("Succesfully getting tx of swap...")
            setUpgradeSuccessStatus(true)
        } catch (error) {
            console.log("Tx fail for enterSwap...")
            console.log(`Error:${error}`)
            setUpgradeFailStatus(true)
        }
    }

    const handleEnterFail = async () => {
        console.log("Tx fail for enterSwap...")
        setUpgradeFailStatus(true)
    }

    const handleUpgradeFail = async () => {
        console.log("Tx fail for swap...")
        setUpgradeFailStatus(true)
    }

    useEffect(() => {
        if (switchButton) {
            setTokenIn(fDAIAddress)
            setTokenOut(MATICxAddress)
        } else {
            setTokenIn(MATICxAddress)
            setTokenOut(fDAIAddress)
        }
    }, [switchButton])

    const { runContractFunction: enterSwap } = useWeb3Contract({
        abi: abi,
        contractAddress: SuperfluidAddress,
        functionName: "enterSwap",
        params: {},
    })

    const { runContractFunction: swap } = useWeb3Contract({
        abi: abi,
        contractAddress: SuperfluidAddress,
        functionName: "swap",
        params: {
            amountIn: inputAmount,
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            duration: duration,
        },
    })

    return (
        <div className="dark:bg-black h-screen grid place-content-center w-full p-4 font-semibold text-gray-900">
            <div className=" md:w-100">
                <div className=" p-2">
                    <div className="dark:text-white dark:bg-black border border-black dark:border dark:border-white gird grid-rows-2 relative bg-white shadow-xl shadow-gray-200 dark:shadow-md dark:shadow-gray-700 rounded-2xl">
                        <div className="border-b border-black dark:border-b dark:border-white p-2 pl-2 flex flex-row gap-2 items-center">
                            <h3 className="w-3 h-3 rounded-md bg-green-500"></h3>
                            <h3 className="w-3 h-3 rounded-md bg-yellow-400"></h3>
                            <h3 className="w-3 h-3 rounded-md bg-red-500"></h3>
                            <h3 className="text-sm font-normal">
                                Swap between MATICx and fDAI ( 1 MATICx ≈ 2 fDAI
                                )
                            </h3>
                        </div>
                        <div className="flex flex-col gap-6 m-5 mt-7">
                            <div className="flex flex-cols-2 gap-6">
                                <div>
                                    <div className="text-sm p-1 font-normal">
                                        {switchButton
                                            ? "Swap amount (fDAI) / day"
                                            : "Swap amount (MATICx) / day"}
                                    </div>
                                    <input
                                        type="number"
                                        className={formClassName}
                                        placeholder="0"
                                        onChange={(event) => {
                                            setInputPrice(
                                                event.target.value || 0
                                            )
                                        }}
                                    ></input>
                                </div>
                                <div>
                                    <div className="text-sm p-1  font-normal">
                                        Duration (How many days?)
                                    </div>
                                    <input
                                        type="number"
                                        className={formClassName}
                                        placeholder="0"
                                        onChange={(event) => {
                                            setDuration(event.target.value || 0)
                                        }}
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm p-1 font-normal">
                                    {switchButton
                                        ? "Swap from fDAI"
                                        : "Swap from MATICx"}
                                </div>
                                <input
                                    className={formClassName}
                                    disabled
                                    placeholder={
                                        switchButton
                                            ? fDAIAddress
                                            : MATICxAddress
                                    }
                                ></input>
                            </div>
                            <div>
                                <div className="text-sm p-1 font-normal">
                                    {switchButton
                                        ? "Swap to MATICx"
                                        : "Swap to fDAI"}
                                </div>
                                <input
                                    className={formClassName}
                                    disabled
                                    placeholder={
                                        switchButton
                                            ? MATICxAddress
                                            : fDAIAddress
                                    }
                                ></input>
                            </div>
                            <div className="flex flex-cols gap-4 mt-7">
                                <button
                                    className="dark:text-white dark:bg-gray-700 bg-violet-100 w-full border border-black text:xs md:text-xl rounded-2xl h-10 md:h-16 hover:scale-105"
                                    onClick={() => {
                                        setSwitchButton(!switchButton)
                                    }}
                                >
                                    Switch
                                </button>
                                <button
                                    className="dark:text-white dark:bg-gray-700 bg-violet-100 w-full border border-black text:xs md:text-xl rounded-2xl h-10 md:h-16 hover:scale-105"
                                    onClick={() => {
                                        setShowNotification(true)
                                        enterSwap({
                                            onError: () => {
                                                handleEnterFail()
                                            },
                                            onSuccess: (tx) => {
                                                handleEnterSuccess(tx)
                                            },
                                        })
                                    }}
                                >
                                    Enter
                                </button>
                                {enterStatus ? (
                                    <button
                                        className="dark:text-white dark:bg-gray-700 bg-violet-100 w-full border border-black text:xs md:text-xl rounded-2xl h-10 md:h-16 hover:scale-105"
                                        onClick={() => {
                                            setShowNotification(true)
                                            swap({
                                                onError: (error) => {
                                                    handleUpgradeFail()
                                                    console.log(error)
                                                },
                                                onSuccess: (tx) => {
                                                    handleUpgradeSuccess(tx)
                                                    setEnterStatus(false)
                                                },
                                            })
                                        }}
                                    >
                                        Swap
                                    </button>
                                ) : (
                                    <button
                                        className="dark:text-white dark:bg-neutral-900 bg-gray-200 w-full border border-black text:xs md:text-xl rounded-2xl h-10 md:h-16"
                                        disabled
                                        onClick={() => {
                                            setShowNotification(true)
                                            swap({
                                                onError: (error) => {
                                                    handleUpgradeFail()
                                                    console.log(error)
                                                },
                                                onSuccess: (tx) => {
                                                    handleUpgradeSuccess(tx)
                                                },
                                            })
                                        }}
                                    >
                                        Swap
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {upgradeSuccessStatus ? (
                <div>
                    {showNotification ? (
                        <div className="fixed right-0 top-0 bg-green-100 p-3 m-2 rounded-lg border border-black">
                            {enterSuccessStatus ? (
                                <div>
                                    <h1>Transaction Successful</h1>
                                    <h3 className="font-normal">
                                        Enter swap succesfully. Click the swap
                                        button to proceed.
                                    </h3>
                                </div>
                            ) : (
                                <div>
                                    <h1>Swap Order Submitted</h1>
                                    <h3 className="font-normal">
                                        {" "}
                                        Your swap request of {inputPrice} MATICx
                                        for {duration} day/days has been
                                        submitted.
                                    </h3>
                                </div>
                            )}

                            <button
                                className="absolute right-4 top-0 text-xl"
                                onClick={() => {
                                    setShowNotification(!showNotification)
                                    setUpgradeSuccessStatus(false)
                                    setEnterSuccessStatus(false)
                                }}
                            >
                                x
                            </button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {upgradeFailStatus ? (
                <div>
                    {showNotification ? (
                        <div className="fixed right-0 top-0 m-2 bg-red-100 p-3 rounded-lg border border-black ">
                            <h1>Transaction Failed</h1>
                            <h3 className="font-normal">
                                User denied transaction signature; Insufficient
                                MATIC/MATICx Balance; Incorrect network; Invalid
                                address.
                            </h3>
                            <button
                                className="absolute right-4 top-0 text-xl"
                                onClick={() => {
                                    setShowNotification(!showNotification)
                                    setUpgradeFailStatus(false)
                                }}
                            >
                                x
                            </button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}
