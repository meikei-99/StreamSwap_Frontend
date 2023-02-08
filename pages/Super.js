import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import SuperfluidStreamAddress from "../constants/SuperfluidStreamAddress.json"
import abi from "../constants/abi.json"
import { ethers } from "ethers"
import { useMoralis } from "react-moralis"

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
    const [downgradeButton, setDowngradeButton] = useState(false)
    const inputAmount = ethers.utils.parseEther(inputPrice.toString())

    const { runContractFunction: upgradeMATIC } = useWeb3Contract({
        abi: abi,
        contractAddress: SuperfluidAddress,
        functionName: "upgradeMATIC",
        params: {},
        msgValue: inputAmount,
    })

    const { runContractFunction: downgradeMATICx } = useWeb3Contract({
        abi: abi,
        contractAddress: SuperfluidAddress,
        functionName: "downgradeMATICx",
        params: { wad: inputAmount },
    })

    const buttonClassName =
        "border border-black focus:scale-105 focus:border-2 focus:bg-violet-100 hover:bg-violet-100 hover:border-2 rounded-xl p-2 text-lg hover:scale-105 ... transition ease-in duration-200 delay-100 dark:text-white dark:bg-gray-700 dark:focus:bg-gray-600 dark:focus:border-2 dark:focus:border-white"
    const formClassName =
        "w-full border border-black text-2xl rounded-xl h-16 p-2 dark:bg-black dark:border dark:border-white"

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

    return (
        <div className="dark:bg-black h-screen grid place-content-center w-full font-semibold text-gray-900">
            <div className="xm:w-120 md:w-100">
                <div className="p-2">
                    <div className="grid grid-cols-2 gap-5 mb-6">
                        <button
                            className={buttonClassName}
                            onClick={() => {
                                setDowngradeButton(false)
                            }}
                        >
                            Wrap
                        </button>
                        <button
                            className={buttonClassName}
                            onClick={() => {
                                setDowngradeButton(true)
                            }}
                        >
                            Unwrap
                        </button>
                    </div>
                    <div className="dark:text-white dark:bg-black border border-black dark:border dark:border-white gird grid-rows-2 relative bg-white shadow-xl shadow-gray-200 dark:shadow-md dark:shadow-gray-700 rounded-xl">
                        <div className="border-b border-black dark:border-b dark:border-white p-2 pl-2 flex flex-row gap-2 items-center">
                            <h3 className="w-3 h-3 rounded-md bg-green-500"></h3>
                            <h3 className="w-3 h-3 rounded-md bg-yellow-400"></h3>
                            <h3 className="w-3 h-3 rounded-md bg-red-500"></h3>
                            <h3 className="text-sm font-normal">
                                {downgradeButton
                                    ? "Unwrap MATICx to MATIC"
                                    : "Wrap MATIC to MATICx"}
                            </h3>
                        </div>
                        <div className="flex flex-col gap-6 m-6">
                            <div>
                                <div className="text-sm p-1  font-normal">
                                    {downgradeButton
                                        ? "Amount to unwrap (MATICx)"
                                        : "Amount to wrap (MATIC)"}
                                </div>
                                <input
                                    type="number"
                                    className={formClassName}
                                    placeholder="0"
                                    onChange={(event) => {
                                        setInputPrice(event.target.value || 0)
                                    }}
                                ></input>
                            </div>

                            <div>
                                <div className="text-sm p-1 font-normal">
                                    {downgradeButton
                                        ? "Amount to receive (MATIC)"
                                        : "Amount to receive (MATICx)"}
                                </div>
                                <input
                                    type="number"
                                    className={formClassName}
                                    placeholder={inputPrice}
                                ></input>
                            </div>
                            <div className="mt-7">
                                {downgradeButton ? (
                                    <button
                                        className="dark:text-white dark:bg-gray-700 w-full border border-black text-xl rounded-xl h-16 hover:scale-105 bg-violet-100"
                                        onClick={() => {
                                            setShowNotification(true)
                                            downgradeMATICx({
                                                onError: () => {
                                                    handleUpgradeFail()
                                                },
                                                onSuccess: (tx) =>
                                                    handleUpgradeSuccess(tx),
                                            })
                                        }}
                                    >
                                        Unwrap
                                    </button>
                                ) : (
                                    <button
                                        className="dark:text-white dark:bg-gray-700 bg-violet-100 w-full border border-black text-xl rounded-xl h-16 hover:scale-105"
                                        onClick={() => {
                                            setShowNotification(true)
                                            upgradeMATIC({
                                                onError: () => {
                                                    handleUpgradeFail()
                                                },
                                                onSuccess: (tx) =>
                                                    handleUpgradeSuccess(tx),
                                            })
                                        }}
                                    >
                                        Wrap
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
                            <h1>Transaction Successful</h1>
                            {downgradeButton ? (
                                <h3 className="font-normal">
                                    {inputPrice} MATICx was unwrapped into MATIC
                                    succesfully.
                                </h3>
                            ) : (
                                <h3 className="font-normal">
                                    {inputPrice} MATIC was wrapped into MATICx
                                    succesfully.
                                </h3>
                            )}
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
