import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import { store } from "./store";
// import {persistor} from "./store";
// import { PersistGate } from "redux-persist/integration/react";

export default function AppProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Provider store={store}>
			<Toaster position="top-center" richColors />
			{children}
			{/* <PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate> */}
		</Provider>
	);
}
