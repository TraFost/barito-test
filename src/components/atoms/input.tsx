import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export default function Input({ label, ...rest }: Props) {
	return (
		<input
			{...rest}
			className="bg-[#262626] p-3 w-full border-slate-900 border focus:border-primary focus:outline-none rounded-md text-white placeholder-gray-500"
		/>
	);
}
