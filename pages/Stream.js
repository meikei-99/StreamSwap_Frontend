import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import SuperfluidStreamAddress from "../constants/SuperfluidStreamAddress.json"
import abi from "../constants/abi.json"
import { ethers } from "ethers"
import { useMoralis } from "react-moralis"

export default function Stream() {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const SuperfluidAddress =
        chainId in SuperfluidStreamAddress
            ? SuperfluidStreamAddress[chainId][0]
            : null

    const [inputPrice, setInputPrice] = useState("0")
    const [receiverAddress, setReceiverAddress] = useState("0x")
    const [upgradeSuccessStatus, setUpgradeSuccessStatus] = useState(false)
    const [upgradeFailStatus, setUpgradeFailStatus] = useState(false)
    const [sendButton, setSendButton] = useState(true)
    const [updateButton, setUpdateButton] = useState(false)
    const [deleteButton, setDeleteButton] = useState(false)
    const [showNotification, setShowNotification] = useState(true)
    const inputAmount = ethers.utils.parseEther(inputPrice.toString())

    const { runContractFunction: createFlow } = useWeb3Contract({
        abi: abi,
        contractAddress: SuperfluidAddress,
        functionName: "createFlow",
        params: {
            receiver: receiverAddress,
            flowRatePerMonth: inputAmount,
        },
    })

    const { runContractFunction: updateFlow } = useWeb3Contract({
        abi: abi,
        contractAddress: SuperfluidAddress,
        functionName: "updateFlow",
        params: {
            receiver: receiverAddress,
            flowRatePerMonth: inputAmount,
        },
    })

    const { runContractFunction: deleteFlow } = useWeb3Contract({
        abi: abi,
        contractAddress: SuperfluidAddress,
        functionName: "deleteFlow",
        params: {
            receiver: receiverAddress,
        },
    })

    const buttonClassName =
        "border border-black focus:scale-105 focus:border-2 focus:bg-violet-100 hover:bg-violet-100 hover:border-2 rounded-xl p-1 xm:p-2 text:xs xsm:text-lg  hover:scale-105 ... transition ease-in duration-200 delay-100 dark:text-white dark:bg-gray-700 dark:focus:bg-gray-600 dark:focus:border-2 dark:focus:border-white"
    const formClassName =
        "w-full border border-black text-xl rounded-xl h-16 p-2 dark:bg-black dark:border dark:border-white mb-6"

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
        <div className="dark:bg-black h-screen grid place-content-center w-full p-4 font-semibold text-gray-900">
            <div className="md:w-100">
                <div className=" p-2">
                    <div className="grid grid-cols-3 gap-3 xm:gap-5 mb-6">
                        <button
                            className={buttonClassName}
                            onClick={() => {
                                setSendButton(true)
                                setUpdateButton(false)
                                setDeleteButton(false)
                            }}
                        >
                            Send
                        </button>
                        <button
                            className={buttonClassName}
                            onClick={() => {
                                setSendButton(false)
                                setUpdateButton(true)
                                setDeleteButton(false)
                            }}
                        >
                            Update
                        </button>
                        <button
                            className={buttonClassName}
                            onClick={() => {
                                setSendButton(false)
                                setUpdateButton(false)
                                setDeleteButton(true)
                            }}
                        >
                            Delete
                        </button>
                    </div>
                    <div className="dark:text-white dark:bg-black border border-black dark:border dark:border-white gird grid-rows-2 relative bg-white shadow-xl shadow-gray-200 dark:shadow-md dark:shadow-gray-700 rounded-xl">
                        <div className="border-b border-black dark:border-b dark:border-white p-2 pl-2 flex flex-row gap-2 items-center">
                            <h3 className="w-3 h-3 rounded-md bg-green-500"></h3>
                            <h3 className="w-3 h-3 rounded-md bg-yellow-400"></h3>
                            <h3 className="w-3 h-3 rounded-md bg-red-500"></h3>
                            <h3 className="text-sm font-normal">
                                {updateButton ? (
                                    "Update stream to receiver"
                                ) : (
                                    <div>
                                        {sendButton
                                            ? "Send stream to receiver"
                                            : "Delete stream to receiver"}
                                    </div>
                                )}
                            </h3>
                        </div>
                        <div className="flex flex-col gap-7 m-6">
                            {deleteButton ? (
                                <div>
                                    <div>
                                        <div className="text-sm p-1  font-normal">
                                            Receiver address
                                        </div>
                                        <input
                                            className={formClassName}
                                            placeholder={receiverAddress}
                                            onChange={(event) => {
                                                setReceiverAddress(
                                                    event.target.value || 0
                                                )
                                            }}
                                        ></input>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div>
                                        <div className="text-sm p-1 font-normal">
                                            Receiver address
                                        </div>
                                        <input
                                            className={formClassName}
                                            placeholder={receiverAddress}
                                            onChange={(event) => {
                                                setReceiverAddress(
                                                    event.target.value
                                                )
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        <div className="text-sm p-1 font-normal">
                                            Flow rate (MATICx) / month
                                        </div>
                                        <input
                                            type="number"
                                            className={formClassName}
                                            placeholder={inputPrice}
                                            onChange={(event) => {
                                                setInputPrice(
                                                    event.target.value || 0
                                                )
                                            }}
                                        ></input>
                                    </div>
                                </div>
                            )}
                            <div>
                                {updateButton ? (
                                    <button
                                        className="dark:text-white dark:bg-gray-700 bg-violet-100 w-full border border-black text-xl rounded-xl h-16 hover:scale-105"
                                        onClick={() => {
                                            setShowNotification(true)
                                            updateFlow({
                                                onError: () => {
                                                    handleUpgradeFail()
                                                },
                                                onSuccess: (tx) =>
                                                    handleUpgradeSuccess(tx),
                                            })
                                        }}
                                    >
                                        Update
                                    </button>
                                ) : (
                                    <div>
                                        {sendButton ? (
                                            <button
                                                className="dark:text-white dark:bg-gray-700 bg-violet-100 w-full border border-black text-xl rounded-xl h-16 hover:scale-105"
                                                onClick={() => {
                                                    setShowNotification(true)
                                                    createFlow({
                                                        onError: () => {
                                                            handleUpgradeFail()
                                                        },
                                                        onSuccess: (tx) =>
                                                            handleUpgradeSuccess(
                                                                tx
                                                            ),
                                                    })
                                                }}
                                            >
                                                Send
                                            </button>
                                        ) : (
                                            <button
                                                className="dark:text-white dark:bg-gray-700 bg-violet-100 w-full border border-black text-xl rounded-xl h-16 hover:scale-105"
                                                onClick={() => {
                                                    setShowNotification(true)
                                                    deleteFlow({
                                                        onError: () => {
                                                            handleUpgradeFail()
                                                        },
                                                        onSuccess: (tx) =>
                                                            handleUpgradeSuccess(
                                                                tx
                                                            ),
                                                    })
                                                }}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
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
                            <h3 className="font-normal">
                                {sendButton ? (
                                    <div>
                                        <h2>
                                            {inputPrice} MATICx/month was sent
                                            to {receiverAddress.slice(0, 6)}...
                                            {receiverAddress.slice(
                                                receiverAddress.length - 4
                                            )}{" "}
                                            succesfully.
                                        </h2>
                                        <h3>
                                            Visit{" "}
                                            <a
                                                target="_blank"
                                                className="hover:cursor-pointer underline underline-offset-4 text-blue-800"
                                                href="https://console.superfluid.finance/"
                                            >
                                                superfluid console {""}
                                            </a>
                                            and insert receiver's address to
                                            check how much MATICx has the wallet
                                            received.
                                        </h3>
                                    </div>
                                ) : (
                                    <div>
                                        {updateButton ? (
                                            <div>
                                                <h2>
                                                    {" "}
                                                    Stream to{" "}
                                                    {receiverAddress.slice(
                                                        0,
                                                        6
                                                    )}
                                                    ...
                                                    {receiverAddress.slice(
                                                        receiverAddress.length -
                                                            4
                                                    )}{" "}
                                                    was updated to {inputPrice}{" "}
                                                    MATICx/month succesfully.
                                                </h2>
                                                <h3>
                                                    Visit{" "}
                                                    <a
                                                        target="_blank"
                                                        className="hover:cursor-pointer underline underline-offset-4 text-blue-800"
                                                        href="https://console.superfluid.finance/"
                                                    >
                                                        superfluid console {""}
                                                    </a>
                                                    and insert receiver's
                                                    address to check how much
                                                    MATICx has the wallet
                                                    received.
                                                </h3>
                                            </div>
                                        ) : (
                                            <div>
                                                Stream to{" "}
                                                {receiverAddress.slice(0, 6)}...
                                                {receiverAddress.slice(
                                                    receiverAddress.length - 4
                                                )}{" "}
                                                was deleted succesfully.
                                            </div>
                                        )}
                                    </div>
                                )}
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
                                address
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
