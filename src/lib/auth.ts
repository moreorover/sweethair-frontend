import { Providers, SvelteKitAuth } from 'sk-auth';
import type { OAuth2ProviderConfig } from 'sk-auth/dist/providers/oauth2';

// this is the domain we set up in our Cognito Pool
const DOMAIN = 'sweethair.auth.eu-west-2.amazoncognito.com';

// these are the configuration settings for our OAUTH2 provider
const config: OAuth2ProviderConfig<any, any> = {
	accessTokenUrl: `https://${DOMAIN}/oauth2/token`,
	profileUrl: `https://${DOMAIN}/oauth2/userInfo`,
	authorizationUrl: `https://${DOMAIN}/oauth2/authorize`,
	clientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
	clientSecret: import.meta.env.VITE_COGNITO_CLIENT_SECRET,
	scope: ['openid', 'email'],
	id: 'cognito', // IMPORTANT: this is the id that we'll use to identify our provider
	contentType: 'application/x-www-form-urlencoded'
};

const oauthProvider = new Providers.OAuth2Provider(config);

// exposing our auth object
export const appAuth = new SvelteKitAuth({
	providers: [oauthProvider]
});
