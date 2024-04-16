import { useEffect, useState } from "react";

interface ItemMenu {
	name: string;
	icon: React.ReactNode;
	onClick: () => void;
}

interface Props {
	children: React.ReactNode;
	menu: ItemMenu[];
}

export default function Dropdown({ children, menu }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// Close dropdown when clicked outside

		function handleClickOutside(event: MouseEvent) {
			const target = event.target as HTMLElement;
			if (target.closest(".relative") !== null) return;
			setIsOpen(false);
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className="relative flex">
			<button onClick={() => setIsOpen(!isOpen)}>{children}</button>
			<div
				className={`absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg ${
					isOpen ? "block" : "hidden"
				}`}
				role="menu"
			>
				<ul className="p-2">
					{menu.map((item, index) => (
						<li key={index}>
							<button
								type="submit"
								className="flex w-full items-center justify-between gap-2 rounded-lg px-4 py-2 text-sm text-custom-gray hover:bg-gray-50"
								role="menuitem"
								onClick={() => {
									setIsOpen(false);
									item.onClick();
								}}
							>
								{item.name}
								{item.icon}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
