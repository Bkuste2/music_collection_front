import React, {
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../hooks/useLocation.ts";
import { useService } from "../hooks/useService";
import { authService } from "@/services/auth.service.ts";
import { Spin } from "antd";
import { User } from "@/types/user.model.ts";

type AuthContextProps = {
	refreshUser: () => void;
	isAuthenticated: boolean;
	isLaboratory: boolean;
	handleAuthentication: (token: string) => void;
	handleLogout: () => void;
	user?: User;
};

const AuthContext = React.createContext<AuthContextProps>({
	isAuthenticated: false,
	isLaboratory: false,
	handleAuthentication: () => false,
	handleLogout: () => false,
	refreshUser: () => false,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLaboratory, setIsLaboratory] = useState<boolean>(false);
	const [user, setUser] = useState<User>();

	const [isFetching, fetchUserProfile] = useService(authService.profile, {
		autoStart: false,
		onData: (data: unknown) => {
			setIsAuthenticated(true);
			setUser(data as User);
		},
		onError: () => {
			setIsAuthenticated(false);
			setUser(undefined);
			navigate("/login", { replace: true });
		},
	});

	const handleAuthentication = useCallback((token: string) => {
		localStorage.setItem("access_token", token);
		console.log(token);
		fetchUserProfile();
		navigate("/");
		window.location.reload();
	}, []);

	const handleLogout = useCallback(() => {
		setIsAuthenticated(false);
		setIsLaboratory(false);
		setUser(undefined);
		localStorage.removeItem("access_token");
		sessionStorage.removeItem("access_token");
		navigate("/login");
	}, []);

	const refreshUser = useCallback(() => {
		fetchUserProfile();
	}, [fetchUserProfile]);

	useEffect(() => {
		if (localStorage.getItem("access_token")) {
			fetchUserProfile();
		} else {
			setIsAuthenticated(false);
			if (pathname.includes("login") || pathname.includes("register")) {
				return;
			}
			navigate("/login", { replace: true });
		}
	}, []);

	const state = useMemo<AuthContextProps>(() => {
		return {
			user,
			refreshUser,
			isLaboratory,
			isAuthenticated,
			handleAuthentication,
			handleLogout,
		};
	}, [isAuthenticated, isLaboratory, user]);

	return (
		<AuthContext.Provider value={state}>
			{isFetching ? (
				<div className="flex h-screen w-screen items-center justify-center">
					<Spin size="large" />
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext<AuthContextProps>(AuthContext);
