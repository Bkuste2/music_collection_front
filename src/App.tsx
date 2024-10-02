import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import { AuthContextProvider } from "./contexts/auth-context";
import { AppRoutes } from "./routes";

const queryClient = new QueryClient();

export const App = () => {
	return (
		<ConfigProvider
			theme={{
				algorithm: [theme.darkAlgorithm],
				token: {
					colorPrimary: "#60B653",
				},
			}}
		>
			<AuthContextProvider>
				<QueryClientProvider client={queryClient}>
					<AppRoutes />
				</QueryClientProvider>
			</AuthContextProvider>
		</ConfigProvider>
	);
};
