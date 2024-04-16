import { useEffect } from "react";

import { HomePage } from "./pages";

import { useAppDispatch, AppDispatch } from "./store";
import { showToast } from "./lib/toaster";
import { fetchWeather } from "./store/reducers/user-slicers";

export default function App() {
	const dispatch: AppDispatch = useAppDispatch();

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				dispatch(fetchWeather({ latitude, longitude }));
			},
			() =>
				showToast({
					message: "Please enable location services!",
					type: "warning",
				})
		);
	}, [dispatch]);

	return <HomePage />;
}
