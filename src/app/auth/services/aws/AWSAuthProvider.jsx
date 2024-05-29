import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsAuthConfig from './awsAuthConfig';

Amplify.configure(awsAuthConfig);

function AWSAuthProvider(props) {
	const { children } = props;
	return <Authenticator.Provider>{children}</Authenticator.Provider>;
}

export default AWSAuthProvider;
