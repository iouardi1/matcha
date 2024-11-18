import React from "react";
import { IconTrash } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { deleteFile, deleteImage, profileImage } from "@/redux/features/profileSetupSlice";

export default function Image({ image }: any) {
	const dispatch = useDispatch();
	return (
		<div className="relative hover:blur-none flex max-w-[70px] h-[100px]">
			<img className="h-auto w-full rounded-lg" src={image.src} alt="" />
			<div className="absolute top-2 right-2 flex space-x-2">
				<button
					className="text-white bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-75"
					onClick={() => {
						dispatch(deleteImage(image.id));
						dispatch(deleteFile(image.path))
					}}
				>
					<IconTrash className="w-[15px] h-[15px]" />
				</button>
			</div>
		</div>
	);
}
