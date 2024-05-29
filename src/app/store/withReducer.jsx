import { useEffect, useState } from 'react';
import { rootReducer } from './lazyLoadedSlices';
/**
 * A Higher Order Component that injects a reducer into the Redux store.
 */
const withReducer = (key, reducer) => (WrappedComponent) => {
	rootReducer.inject(
		{
			reducerPath: key,
			reducer
		},
		{
			overrideExisting: true
		}
	);
	/**
	 * The component that wraps the provided component with the injected reducer.
	 */
	return function WithInjectedReducer(props) {
		const [awaitRender, setAwaitRender] = useState(true);
		useEffect(() => {
			setTimeout(() => {
				setAwaitRender(false);
			}, 30000);
		}, []);
		return awaitRender ? null : <WrappedComponent {...props} />;
	};
};
export default withReducer;
