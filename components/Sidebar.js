import { useEffect, useState } from "react"
import { IoMenuOutline } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"
import SidebarComponent from "./SidebarComponent"

export default function Sidebar() {
    const [sidebar, setSidebar] = useState("false")
    const [buttonIcon, setButtonIcon] = useState("false")
    const handleSidebar = () => {
        setSidebar(!sidebar)
    }
    const handleButton = () => {
        setButtonIcon(!buttonIcon)
    }

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        handleButton()
                        handleSidebar()
                    }}
                    className="block lg:hidden ... absolute top-4 right-4 items-center peer justify-center rounded-md p-2 text-gray-900 ring-1 ring-black bg-white"
                >
                    {buttonIcon ? (
                        <IoMenuOutline
                            className="text-xs"
                            arial-hidden="true"
                        />
                    ) : (
                        <RxCross2 className="text-xs" arial-hidden="true" />
                    )}
                </button>
                <div className="hidden lg:block h-screen">
                    <SidebarComponent></SidebarComponent>
                </div>
            </div>
            {/* screensize << than lg */}
            {!sidebar && (
                <div className="fixed left-0 z-20 top-0">
                    <SidebarComponent></SidebarComponent>
                </div>
            )}
        </div>
    )
}

{
    /* <div>
<IoServerOutline className="text-3xl"></IoServerOutline>
</div>
<div>
<IoPulseOutline className="text-3xl"></IoPulseOutline>
</div>
<div>
<IoRepeat className="text-3xl"></IoRepeat>
</div> */
}
