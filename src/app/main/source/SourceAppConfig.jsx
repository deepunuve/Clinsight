import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const SourceApp = lazy(() => import('./SourceApp'));
const Sources = lazy(() => import('./courses/Sources'));
/**
 * The Academy app config.
 */
const SourceAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'source',
			element: <SourceApp />,
			children: [
				{
					path: '',
					element: <Navigate to="source/nih" />
				},
				{
					path: 'nih',
					element: <Sources />
				}
			]
		}
	]
};
export default SourceAppConfig;
