import { useContext } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import useJwtAuth from './services/jwt/useJwtAuth';
import { AuthContext } from './AuthenticationProvider';
import useFirebaseAuth from './services/firebase/useFirebaseAuth';

function useAuth() {
	const context = useContext(AuthContext);
	const { signOut: amplifySignOut } = useAuthenticator();
	const { signOut: jwtSignOut, updateUser: jwtUpdateUser } = useJwtAuth();
	const { signOut: firebaseSignOut, updateUser: firebaseUpdateUser } = useFirebaseAuth();

	if (!context) {
		throw new Error('useAuth must be used within a AuthRouteProvider');
	}

	const authProviders = {
		amplify: { signOut: amplifySignOut, updateUser: () => {} },
		jwt: { signOut: jwtSignOut, updateUser: jwtUpdateUser },
		firebase: { signOut: firebaseSignOut, updateUser: firebaseUpdateUser }
	};
	const signOut = () => {
		const authProvider = context.getAuthProvider();
		authProviders[authProvider]?.signOut();
	};
	const updateUser = (user) => {
		const authProvider = context.getAuthProvider();
		authProviders[authProvider]?.updateUser(user);
	};
	return { ...context, signOut, updateUser };
}

export default useAuth;
