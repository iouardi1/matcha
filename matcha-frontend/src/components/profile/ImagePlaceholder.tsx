import React from 'react'

export default function ImagePlaceholder() {
  return (
    <div className=" hover:blur-none flex max-w-[70px] sm:max-w-[100px] w-[65px] h-[100px]  border rounded-md bg-slate-800 opacity-40 blur-[1px]">
			<img className="h-auto w-full rounded-lg" src='' alt="" />
			<div className="absolute top-2 right-2 flex space-x-2">
			</div>
		</div>
  )
}

{/* <div className="relative hover:blur-none flex max-w-[100px] w-full h-[150px] max-h-[150px] border rounded-md bg-slate-800 opacity-40 blur-[1px]">
<img className="h-auto w-full rounded-lg" src='' alt="" />
<div className="absolute top-2 right-2 flex space-x-2">
</div>
</div> */}