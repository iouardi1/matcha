import { setUsername } from "@/redux/features/profileSetupSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Username() {
	const dispatch = useDispatch();
	const username = useSelector((state: any) => state.profileSetup.username);

	function handleUsernameChange(value: string) {
		if (!username.initVal) {
			dispatch(setUsername(value));
		}
	}

	return (
		<div className="px-4 mt-5">
			<div className="mx-auto max-w-xl flex items-center">
				<label className="inline-block text-sm font-medium leading-6 text-white min-w-[100px]">
					Username
				</label>
				<input
					id="bio"
					maxLength={10}
					className="auth-input max-w-[300px] max-h-[120px]"
					placeholder={username.initVal === null ? "Write your username" : username.initVal}
					disabled={username.initVal === null ? false : true}
					onChange={(e) => {
						handleUsernameChange(e.target.value);
					}}
				></input>
			</div>
		</div>
	);
}
