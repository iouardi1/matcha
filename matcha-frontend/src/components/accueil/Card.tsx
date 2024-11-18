import React from 'react'

const Card = ({ zIndex = 0, children }: any) => (
    <div
        className="flex flex-col items-center justify-end top-0 sm:w-[350px] sm:h-[500px] xs:w-[300px] xs:h-[450px] w-[230px] h-[450px] cursor-pointer select-none bg-white rounded-[15px] absolute"
        style={{ zIndex }}
    >
        {children}
    </div>
)

export default Card
