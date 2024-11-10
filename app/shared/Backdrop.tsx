import React from 'react'

const Backdrop = ({ click }: { click: () => void }) => {
    return (
        <div
            onClick={click}
            className={`w-screen h-screen fixed top-0 start-0 bg-gray-400 opacity-[0.5] z-40 `}></div>
    )
}

export default Backdrop