import { useSelector } from "react-redux";
import { IconRocket, IconLoader2 } from "@tabler/icons-react";

import { RootState } from "../../../store";

export default function Header() {
	const { error, loading, city, weather } = useSelector(
		(state: RootState) => state.userInformation
	);

	return (
		<section className="flex w-full h-full py-16 flex-col items-center">
			<div className="flex items-center gap-1.5">
				<IconRocket size={50} stroke={1.5} color="#5E60CE" className="mt-1" />
				<h1 className="text-primary font-extrabold text-4xl">
					to<span className="text-secondary">do</span>
				</h1>
			</div>

			<p className="text-custom-gray mt-3">
				{loading ? (
					<span className="flex items-center gap-2">
						<span>Loading weather data for your location...</span>
						<IconLoader2 size={20} stroke={1.5} className="animate-spin" />
					</span>
				) : error ? (
					"Error fetching data"
				) : city ? (
					`Hello 👋, Weather in ${city}: ${weather.description} and ${weather.temp}°C`
				) : (
					"No weather data available"
				)}
			</p>
		</section>
	);
}
