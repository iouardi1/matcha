import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addSelectedInterest,
	deleteSelectedInterest,
} from "@/redux/features/profileSetupSlice";
export default function Tags() {
	const dispatch = useDispatch();

	const suggestedInterests = useSelector(
		(state: any) => state.profileSetup.interests,
	);

	const selectedInterests = useSelector(
		(state: any) => state.profileSetup.selectedInterests,
	);

	return (
		<div className="flex flex-col items-center mt-4">
			<div className="">
				<h1 className="text-[12px] sm:text-[15px] sm:font-semibold">Choose Your Interests</h1>
			</div>
			<div className="flex flex-wrap gap-2 ml-4">
				{suggestedInterests.map((interest: any) => (
					<span
						key={interest}
						className=" cursor-pointer center relative inline-block select-none whitespace-nowrap rounded-lg bg-[#fd5564] py-[6px] px-[6px] sm:py-[10px] sm:px-[10px] align-baseline font-sans text-[8px] sm:text-[10px] font-bold uppercase leading-none text-white"
						onClick={() => dispatch(addSelectedInterest(interest))}
					>
						{interest}
					</span>
				))}
			</div>

			<div className="flex flex-col items-center sm:mt-4">
				<h3 className="text-[12px] sm:text-[15px] sm:font-semibold">Selected Interests:</h3>
				<div className="flex flex-wrap gap-2 ml-4">
					{selectedInterests.map((interest: any) => (
						<span
							key={interest}
							className="cursor-pointer center relative inline-block select-none whitespace-nowrap rounded-lg bg-[#dd999e] py-[6px] px-[6px] sm:py-[10px] sm:px-[10px] align-baseline font-sans text-[8px] sm:text-[10px] font-bold uppercase leading-none text-white"
							onClick={() => dispatch(deleteSelectedInterest(interest))}
						>
							{interest} &times;
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
