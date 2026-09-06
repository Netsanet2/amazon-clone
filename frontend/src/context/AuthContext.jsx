import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function getStoredUser() {
	try {
		const storedUser = localStorage.getItem("amazon-clone-user");
		return storedUser ? JSON.parse(storedUser) : null;
	} catch {
		return null;
	}
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(getStoredUser);

	const login = (email) => {
		const loggedInUser = {
			name: email.split("@")[0] || "Customer",
			email,
		};

		localStorage.setItem("amazon-clone-user", JSON.stringify(loggedInUser));
		setUser(loggedInUser);
	};

	const register = (name, email) => {
		const registeredUser = { name, email };

		localStorage.setItem("amazon-clone-user", JSON.stringify(registeredUser));
		setUser(registeredUser);
	};

	const logout = () => {
		localStorage.removeItem("amazon-clone-user");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used inside an AuthProvider");
	}

	return context;
}



