import React from "react";
import { IconPlus } from "@tabler/icons-react";

import { Loading, Input, Button } from "../atoms";

interface Props {
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onAdd?: () => void;
	withButton?: boolean;
	categoryValue: string;
	onCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onLoading?: boolean;
}

export default function AddInput({
	placeholder,
	onAdd,
	onChange,
	value,
	categoryValue,
	onCategoryChange,
	onLoading,
}: Props) {
	return (
		<div className="flex items-center justify-center w-full gap-4 absolute -top-10 p-4">
			<div className="w-1/5">
				<Input
					placeholder="Category"
					value={categoryValue}
					onChange={onCategoryChange}
				/>
			</div>
			<div className="w-[27%]">
				<Input placeholder={placeholder} value={value} onChange={onChange} />
			</div>
			<Button
				onClick={onAdd}
				className="bg-primary text-white rounded-r-lg"
				disabled={onLoading}
			>
				{onLoading ? <Loading /> : <IconPlus size={20} />}
			</Button>
		</div>
	);
}
