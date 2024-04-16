import React from "react";

import { Select } from "../atoms";
import { Todo } from "../../store/reducers/todo-slicers";

interface Props {
	todos: Todo[];
	filter: any;
	setFilter: React.Dispatch<React.SetStateAction<any>>;
}

export default function Filter({ todos, filter, setFilter }: Props) {
	return (
		<div
			className={`flex justify-center relative gap-4 ${
				todos.length === 0 && "hidden"
			}`}
		>
			{/* Filter by status */}
			<Select
				onChange={({ target }) =>
					setFilter({
						...filter,
						status: (target as HTMLSelectElement).value,
					})
				}
				menu={[
					{ label: "All", value: "" },
					{ label: "Completed", value: "completed" },
					{ label: "Uncompleted", value: "uncompleted" },
				]}
			/>

			<Select
				onChange={({ target }) =>
					setFilter({
						...filter,
						category: (target as HTMLSelectElement).value,
					})
				}
				menu={[
					{ label: "All", value: "" },
					...Array.from(new Set(todos.map((todo) => todo.category))).map(
						(category) => ({
							label: category,
							value: category,
						})
					),
				]}
			/>

			{/* Search input */}
			<input
				type="text"
				value={filter.search}
				onChange={(e) => setFilter({ ...filter, search: e.target.value })}
				placeholder="Search..."
				className="bg-[#262626] text-white px-3 rounded-md"
			/>
		</div>
	);
}
