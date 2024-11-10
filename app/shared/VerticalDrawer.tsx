
import { drawerType, toggle, close } from "../../types/index"
import Backdrop from "./Backdrop"


const VerticalDrawer = ({ children, type, isOpen, toggle, close }: {
    type: drawerType, isOpen: boolean, toggle: toggle, close: close, children: React.ReactNode
}) => {


    return (<div>
        {
            isOpen
            &&
            type === "sort"
            &&
            <Backdrop click={close} />
        }
        <div className={`w-full fixed start-0 bottom-0 z-50 bg-white lg:hidden duration-500 p-6 
            ${type === "sort" ? 'h-auto rounded-t-xl overflow-hidden' : 'h-full'} 
            ${isOpen ? "translate-y-0" : 'translate-y-full'}`}
        >
            {children}
        </div>
    </div>
    )
}

export default VerticalDrawer