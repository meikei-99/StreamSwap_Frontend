import { useState, useEffect } from "react"
import { useWeb3Contract } from "react-moralis"
import SuperfluidStreamAddress from "../constants/SuperfluidStreamAddress.json"
import abi from "../constants/abi.json"
import { ethers } from "ethers"
import { useMoralis } from "react-moralis"
import { BsInfo, BsInfoCircle } from "react-icons/bs"

export default function Super() {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const SuperfluidAddress =
        chainId in SuperfluidStreamAddress
            ? SuperfluidStreamAddress[chainId][0]
            : null

    const [inputPrice, setInputPrice] = useState("0")
    const [upgradeSuccessStatus, setUpgradeSuccessStatus] = useState(false)
    const [upgradeFailStatus, setUpgradeFailStatus] = useState(false)
    const [showNotification, setShowNotification] = useState(true)
    const inputAmount = ethers.utils.parseEther(inputPrice.toString())

    const { runContractFunction: withdrawfDAI } = useWeb3Contract({
        abi: abi,
        contractAddress: SuperfluidAddress,
        functionName: "withdrawfDAI",
        params: { fDAIAmountOut: inputAmount },
    })

    const formClassName =
        "w-full border border-black text-2xl rounded-2xl h-16 pl-4 dark:bg-black dark:border dark:border-white"

    const handleUpgradeSuccess = async (tx) => {
        try {
            console.log("Getting tx...")
            await tx.wait(1)
            console.log("Succesfully getting tx...")
            setUpgradeSuccessStatus(true)
        } catch (error) {
            console.log("Tx fail...")
            console.log(`Error:${error}`)
            setUpgradeFailStatus(true)
        }
    }

    const handleUpgradeFail = async () => {
        console.log("Tx fail...")
        setUpgradeFailStatus(true)
    }

    useEffect(() => {
        if (inputPrice === "") {
            setInputPrice("0")
        }
    }, [inputPrice])

    return (
        <div className="dark:bg-black h-screen grid place-content-center w-full p-4 font-semibold text-gray-900">
            <div className=" md:w-100 h-100">
                <div className=" p-2">
                    <div className="dark:text-white dark:bg-black border border-black dark:border dark:border-white gird grid-rows-2 relative bg-white shadow-xl shadow-gray-200 dark:shadow-md dark:shadow-gray-700 rounded-2xl">
                        <div className="border-b border-black dark:border-b dark:border-white p-2 pl-2 flex flex-row gap-2 items-center">
                            <h3 className="w-3 h-3 rounded-md bg-green-500"></h3>
                            <h3 className="w-3 h-3 rounded-md bg-yellow-400"></h3>
                            <h3 className="w-3 h-3 rounded-md bg-red-500"></h3>
                            <h3 className="text-sm font-normal">
                                Withdraw fDAI to Metamask wallet
                            </h3>
                        </div>
                        <div className="flex flex-col gap-12 m-6 mt-6">
                            <div>
                                <div className="flex flex-row text-sm p-1 font-normal items-center gap-2">
                                    <h1> Withdrawal amount (fDAI)</h1>
                                </div>
                                <input
                                    className={formClassName}
                                    placeholder={inputPrice}
                                    onChange={(event) => {
                                        setInputPrice(event.target.value || 0)
                                    }}
                                ></input>
                            </div>
                            <div className="mt-2">
                                <button
                                    className="dark:text-white dark:bg-gray-700 w-full border border-black text-xl rounded-2xl h-16 hover:scale-105 bg-violet-100"
                                    onClick={() => {
                                        setShowNotification(true)
                                        withdrawfDAI({
                                            onError: () => {
                                                handleUpgradeFail()
                                            },
                                            onSuccess: (tx) =>
                                                handleUpgradeSuccess(tx),
                                        })
                                    }}
                                >
                                    Withdraw
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {upgradeSuccessStatus ? (
                <div>
                    {showNotification ? (
                        <div className="fixed right-0 top-0 bg-green-100 p-3 m-2 rounded-lg border border-black">
                            <h1>Withdrawal Successful</h1>
                            <h3 className="font-normal">
                                Received amount: {inputPrice} fDAI.
                            </h3>
                            <button
                                className="absolute right-4 top-0 text-xl"
                                onClick={() => {
                                    setShowNotification(!showNotification)
                                    setUpgradeSuccessStatus(false)
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
