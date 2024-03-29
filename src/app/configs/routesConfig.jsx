import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import AcademyAppConfig from '../main/academy/AcademyAppConfig';
import SourceAppConfig from '../main/dash/AcademyAppConfig';

const routeConfigs = [SourceAppConfig, AcademyAppConfig, SignOutConfig, SignInConfig, SignUpConfig];
/**
 * The routes of the application.
 */
const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/TA" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: '/',
		element: <Navigate to="/source" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <FuseLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];
export default routes;
