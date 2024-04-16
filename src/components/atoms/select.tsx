import React from "react";

interface Props extends React.HTMLAttributes<HTMLSelectElement> {
	menu: { label: string; value: string }[];
}

export default function Select({ menu, ...props }: Props) {
	return (
		<div>
			<select
				{...props}
				className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-500 sm:text-sm bg-[#262626] p-3 focus:border-primary border-r-[16px] border-transparent "
			>
				{menu.map((item) => (
					<option key={item.value} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
		</div>
	);
}
