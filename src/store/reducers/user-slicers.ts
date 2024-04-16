import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface userInformation {
	city: string;
	weather: {
		description: string;
		icon: string;
		id: number;
		main: string;
		temp: number;
	};
	loading: boolean;
	error: string | null;
}

const initialState: userInformation = {
	city: "",
	weather: { description: "", icon: "", id: 0, main: "", temp: 0 },
	loading: false,
	error: null,
};

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeather = createAsyncThunk<
	{
		city: string;
		weather: {
			description: string;
			icon: string;
			id: number;
			main: string;
		};
		temp: number;
	},
	{ latitude: number; longitude: number },
	{ rejectValue: string }
>("user-information", async ({ latitude, longitude }, thunkAPI) => {
	try {
		const res = await axios.get(
			`${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
		);

		const weather = res.data.weather[0];
		const city = res.data.name;
		const temp = res.data.main.temp;

		return {
			city,
			weather,
			temp,
		};
	} catch (err) {
		return thunkAPI.rejectWithValue("Failed to fetch weather");
	}
});

export const usersSlice = createSlice({
	name: "user-information",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchWeather.fulfilled, (state, action) => {
			state.weather = {
				...action.payload.weather,
				temp: Math.round(action.payload.temp - 273.15),
			};
			state.city = action.payload.city;
			state.loading = false;
			state.error = null;
		});
		builder.addCase(fetchWeather.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(fetchWeather.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as string;
		});
	},
});

export default usersSlice.reducer;
