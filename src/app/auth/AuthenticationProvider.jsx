import { createContext, useCallback, useMemo, useState } from 'react';
import Authentication from './Authentication';
import AWSAuthProvider from './services/aws/AWSAuthProvider';
import JwtAuthProvider from './services/jwt/JwtAuthProvider';
import FirebaseAuthProvider from './services/firebase/FirebaseAuthProvider';

export const AuthContext = createContext({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	setAuthProvider: () => {},
	getAuthProvider: () => null,
	resetAuthProvider: () => null
});
const authProviderLocalStorageKey = 'fuseReactAuthProvider';

function AuthenticationProvider(props) {
	const { children } = props;
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	/**
	 * Get auth provider
	 */
	const getAuthProvider = useCallback(() => {
		return localStorage.getItem(authProviderLocalStorageKey);
	}, []);
	/**
	 * Set auth provider
	 */
	const setAuthProvider = useCallback((authProvider) => {
		if (authProvider) {
			localStorage.setItem(authProviderLocalStorageKey, authProvider);
		}
	}, []);
	/**
	 * Remove auth provider
	 */
	const resetAuthProvider = useCallback(() => {
		localStorage.removeItem(authProviderLocalStorageKey);
	}, []);
	const contextValue = useMemo(
		() => ({
			setIsAuthenticated,
			isAuthenticated,
			getAuthProvider,
			setAuthProvider,
			resetAuthProvider
		}),
		[getAuthProvider, setAuthProvider, resetAuthProvider, setIsAuthenticated, isAuthenticated]
	);
	return (
		<AuthContext.Provider value={contextValue}>
			<JwtAuthProvider>
				<AWSAuthProvider>
					<FirebaseAuthProvider>
						<Authentication>{children}</Authentication>
					</FirebaseAuthProvider>
				</AWSAuthProvider>
			</JwtAuthProvider>
		</AuthContext.Provider>
	);
}

export default AuthenticationProvider;
