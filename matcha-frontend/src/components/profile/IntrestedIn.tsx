import React from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { IconCheck } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { changeGenderValue } from "@/redux/features/profileSetupSlice";

export default function IntrestedIn() {
	const IntrestedIn = useSelector(
		(state: any) => state.profileSetup.intrestedIn,
	);
	const genderList = useSelector((state: any) => state.profileSetup.genderList);

	return (
		<div className="px-4 mt-2">
			<div className="mx-auto max-w-xl flex  items-center">
				<label className="block text-[12px] sm:text-[15px] font-medium leading-6 text-white min-w-[100px]">
					Intrested In
				</label>
				<RadioGroup value={IntrestedIn} className="w-full flex justify-start">
					{genderList.map((item: string) => {
						return (
							<Radio
								disabled
								key={item}
								value={item}
								className={`group relative flex cursor-pointer rounded-full h-[10px] bg-white/5 py-[12px] px-[12px] sm:py-[15px] sm:px-[15px]  text-white mx-3 border ${
									IntrestedIn === item ? "border-[#fd5564]" : ""
								}`}
							>
								<div className="flex w-full items-center justify-between">
									<div className="text-sm/6">
										<p className="font-semibold text-white text-[10px] sm:text-[15px]">{item}</p>
									</div>
									<IconCheck
										className={IntrestedIn === item ? "visible" : "hidden"}
									/>
								</div>
							</Radio>
						);
					})}
				</RadioGroup>
			</div>
		</div>
	);
}
