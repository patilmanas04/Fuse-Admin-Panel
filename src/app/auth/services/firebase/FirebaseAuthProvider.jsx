import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseInitialized } from './initializeFirebase';

const defaultAuthContext = {
	isLoading: false,
	user: null,
	updateUser: null,
	signIn: null,
	signUp: null,
	signOut: null,
	refreshToken: null,
	setIsLoading: () => {},
	authStatus: 'configuring'
};
export const FirebaseAuthContext = createContext(defaultAuthContext);

function FirebaseAuthProvider(props) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [authStatus, setAuthStatus] = useState('configuring');
	const { children } = props;
	useEffect(() => {
		const unsubscribe =
			firebase.apps.length &&
			firebase.auth().onAuthStateChanged(
				(firebaseUser) => {
					if (firebaseUser && authStatus !== 'authenticated') {
						firebase
							.database()
							.ref(`users/${firebaseUser.uid}`)
							.once('value')
							.then((snapshot) => {
								const userSnapshot = snapshot.val();
								setUser(userSnapshot);
								setAuthStatus('authenticated');
							});
					} else if (authStatus !== 'unauthenticated') {
						setUser(null);
						setAuthStatus('unauthenticated');
					}

					setIsLoading(false);
				},
				(error) => {
					setAuthStatus('unauthenticated');
					setIsLoading(false);
				}
			);
		return () => {
			setAuthStatus('configuring');
			unsubscribe?.();
		};
	}, []);
	const signIn = useCallback(({ email, password }) => {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}, []);
	const signUp = useCallback(({ email, password, displayName }) => {
		const signUpResponse = new Promise((resolve, reject) => {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then((userCredential) => {
					resolve(userCredential);
				})
				.catch((_error) => {
					const error = _error;
					reject(error);
				});
		});
		return signUpResponse;
	}, []);
	const signOut = useCallback(() => {
		return firebase.auth().signOut();
	}, []);
	const updateUser = useCallback((_user) => {
		if (!_user) {
			return Promise.reject(new Error('No user is signed in'));
		}

		firebase.database().ref(`users/${_user.uid}`).set(_user);
		return Promise.resolve(_user);
	}, []);
	const authContextValue = useMemo(
		() => ({
			user,
			authStatus,
			isLoading,
			signIn,
			signUp,
			signOut,
			updateUser,
			setIsLoading
		}),
		[user, isLoading, signIn, signUp, signOut, updateUser, setIsLoading]
	);
	return firebaseInitialized ? (
		<FirebaseAuthContext.Provider value={authContextValue}>{children}</FirebaseAuthContext.Provider>
	) : null;
}

export default FirebaseAuthProvider;
