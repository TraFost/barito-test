import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export default function Button({ children, ...rest }: Props) {
	return (
		<button
			{...rest}
			className="bg-dark-primary text-white p-3 rounded-md flex items-center gap-1.5 hover:bg-secondary transition-colors duration-300 ease-in-out"
		>
			{children}
		</button>
	);
}
