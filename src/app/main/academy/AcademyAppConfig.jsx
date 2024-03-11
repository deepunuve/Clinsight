import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Content from './courses/Content';

const AcademyApp = lazy(() => import('./AcademyApp'));
const Course = lazy(() => import('./course/Course'));
const Courses = lazy(() => import('./courses/Courses'));
const ResultDash = lazy(() => import('./result/ResultDash'));
/**
 * The Academy app config.
 */
const AcademyAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/academy',
			element: <AcademyApp />,
			children: [
				{
					path: '',
					element: <Navigate to="/apps/academy/courses" />
				},
				{
					path: 'courses/:courseId/*',
					element: <Course />
				},
				{
					path: 'results/:courseId/*',
					element: <ResultDash />
				},
				{
					path: 'content/:courseId/*',
					element: <Content />
				},
				{
					path: 'courses',
					element: <Courses />
				}
			]
		}
	]
};
export default AcademyAppConfig;
