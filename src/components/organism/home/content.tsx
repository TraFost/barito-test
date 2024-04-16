import { useState } from "react";
import {
	IconDotsVertical,
	IconEdit,
	IconNotesOff,
	IconTrash,
	IconCheck,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";

import { Filter, AddInput } from "../../molecules";
import { Dropdown, Checkbox, Divider } from "../../atoms";

import { RootState, useAppDispatch, AppDispatch } from "../../../store";
import {
	addTodo,
	deleteTodo,
	toggleTodo,
	editTodo,
	toggleEdit,
	Todo,
} from "../../../store/reducers/todo-slicers";

export default function Content() {
	const [loading, setLoading] = useState(false);
	const [todoInput, setTodoInput] = useState({
		title: "",
		category: "",
		newTitle: "",
		newCategory: "",
	});
	const [filter, setFilter] = useState({
		status: "",
		category: "",
		search: "",
	});

	const { todos } = useSelector((state: RootState) => state.userTodo);
	const dispatch: AppDispatch = useAppDispatch();

	const todoActions = (
		id: number,
		actions: "edit" | "delete" | "toggle" | "add"
	) => {
		switch (actions) {
			case "add":
				setLoading(true);
				setTimeout(() => {
					setLoading(false);

					dispatch(
						addTodo({
							id: todos.length + 1,
							title: todoInput.title,
							category: todoInput.category,
							isEdited: false,
						})
					);

					setTodoInput({ ...todoInput, title: "", category: "" });
				}, 1000);
				break;
			case "edit":
				dispatch(
					editTodo({
						id,
						title: todoInput.newTitle,
						category: todoInput.newCategory,
					})
				);
				setTodoInput({ ...todoInput, newTitle: "", newCategory: "" });
				break;
			case "delete":
				dispatch(deleteTodo(id));
				break;
			case "toggle":
				dispatch(toggleTodo(id));
				break;
			default:
				break;
		}
	};

	function groupByCategory(todos: Todo[]) {
		// Filtered todos based on the provided filters
		const filteredTodos = todos.filter((todo) => {
			// Filter by status
			if (filter.status === "completed") {
				if (!todo.completed) return false;
			} else if (filter.status === "uncompleted") {
				if (todo.completed) return false;
			}

			// Filter by category
			if (filter.category && todo.category !== filter.category) return false;

			// Filter by search keyword
			if (
				filter.search &&
				!todo.title.toLowerCase().includes(filter.search.toLowerCase())
			)
				return false;

			return true;
		});

		const grouped: any = {};
		filteredTodos.forEach((todo) => {
			if (!grouped[todo.category]) {
				grouped[todo.category] = [];
			}
			grouped[todo.category].push(todo);
		});
		return grouped;
	}

	const groupedTodos = groupByCategory(todos);

	// const onDragEnd = (result: DropResult) => {
	// 	// Check if the drop was outside of the droppable area
	// 	if (!result.destination) return;

	// 	const reorderedTodos = Array.from(groupedTodos);
	// 	const [removed] = reorderedTodos.splice(result.source.index, 1);
	// 	reorderedTodos.splice(result.destination.index, 0, removed);
	// };

	return (
		<div className="w-full bg-[#1A1A1A] h-screen flex gap-16 flex-col">
			{/* input */}
			<div className="flex justify-center relative">
				<AddInput
					placeholder="Description"
					categoryValue={todoInput.category}
					onCategoryChange={(e) =>
						setTodoInput({ ...todoInput, category: e.target.value })
					}
					value={todoInput.title}
					onChange={(e) =>
						setTodoInput({ ...todoInput, title: e.target.value })
					}
					onAdd={() => todoActions(0, "add")}
					onLoading={loading}
				/>
			</div>

			<Filter todos={todos} filter={filter} setFilter={setFilter} />

			{/* TODO LIST */}
			<div className="flex justify-center items-start h-full max-w-7xl mx-auto min-w-[50%]">
				<div className="flex items-center justify-center flex-col gap-6 w-full">
					<div className="flex items-center w-full text-sm justify-between">
						{/* tasks created label */}
						<div className="font-bold flex gap-2">
							<span className="text-primary font-bold">Tasks Created</span>
							<span className="bg-[#333333] rounded-xl px-1.5">
								{todos.length}
							</span>
						</div>

						{/* finished label */}
						<div className="flex items-center gap-2">
							<span className="text-secondary">Finished</span>
							<span className="bg-[#333333] rounded-xl px-1.5">
								{todos.filter((todo) => todo.completed).length} of{" "}
								{todos.length}
							</span>
						</div>
					</div>

					<div className="w-full space-y-10">
						{todos.length !== 0 ? (
							<ul className="flex flex-col gap-4">
								{Object.keys(groupedTodos).map((category) => (
									<div key={category} className="flex flex-col gap-4">
										<span className="bg-[#4A4A4A] text-xs px-2 py-1 rounded-lg w-fit">
											{category}
										</span>
										{groupedTodos[category].map((todo: Todo) => (
											<li
												key={todo.id}
												className={`flex items-center justify-between bg-[#333333] p-3 rounded-xl gap-5 w-full hover:bg-[#2C2C2C] transition-all duration-300 ease-in-out
												${todo.completed && !todo.isEdited && "line-through text-gray-400"}
												`}
											>
												{!todo.isEdited ? (
													<Checkbox
														checked={todo.completed ? true : false}
														setChecked={() => todoActions(todo.id, "toggle")}
														label={todo.title}
													/>
												) : (
													<input
														type="text"
														className="bg-transparent text-white w-full focus:outline-none "
														defaultValue={todo.title}
														value={todoInput.newTitle}
														onChange={(e) =>
															setTodoInput({
																...todoInput,
																newTitle: e.target.value,
															})
														}
													/>
												)}
												<div className="flex gap-4">
													{todo.isEdited ? (
														<>
															<IconTrash
																size={18}
																stroke={1.5}
																color="gray"
																onClick={() => dispatch(toggleEdit(todo.id))}
															/>
															<IconCheck
																size={18}
																stroke={1.5}
																color="gray"
																onClick={() => todoActions(todo.id, "edit")}
															/>
														</>
													) : (
														<Dropdown
															menu={[
																{
																	name: "Edit",
																	icon: (
																		<IconEdit
																			size={18}
																			stroke={1.5}
																			color="gray"
																		/>
																	),
																	onClick: () => {
																		dispatch(toggleEdit(todo.id));
																		setTodoInput({
																			...todoInput,
																			newTitle: todo.title,
																			newCategory: todo.category,
																		});
																	},
																},
																{
																	name: "Delete",
																	icon: (
																		<IconTrash
																			size={18}
																			stroke={1.5}
																			color="gray"
																		/>
																	),
																	onClick: () => todoActions(todo.id, "delete"),
																},
															]}
														>
															<IconDotsVertical
																size={18}
																stroke={1.5}
																color="gray"
															/>
														</Dropdown>
													)}
												</div>
											</li>
										))}
									</div>
								))}
							</ul>
						) : (
							<>
								<Divider />
								<div className="flex items-center justify-center flex-col gap-4">
									<IconNotesOff
										size={100}
										stroke={1.5}
										color="gray"
										className="opacity-30"
									/>
									<span className="text-wrap text-custom-gray font-bold">
										No tasks created yet! 🥲
									</span>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
