import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Content from './courses/Content';

const AcademyApp = lazy(() => import('./AcademyApp'));
const Course = lazy(() => import('./course/Course'));
const Courses = lazy(() => import('./courses/Courses'));
const ResultDashNew = lazy(() => import('./result/ResultDashNew'));
const GraphView = lazy(() => import('./result/GraphView'));
const SourceView = lazy(() => import('./result/SourceView'));
/**
 * The Academy app config.
 */
const AcademyAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'TA',
			element: <AcademyApp />,
			children: [
				{
					path: '',
					element: <Navigate to="/TA/clinical" />
				},
				{
					path: 'clinical/:courseId/*',
					element: <Course />
				},
				{
					path: 'results/:courseId/*',
					element: <ResultDashNew state={{ key: 'value' }} />
				},
				{
					path: 'content/:courseId/*',
					element: <Content />
				},
				{
					path: 'graphView/:courseId/*',
					element: <GraphView />
				},
				{
					path: 'sourceView/:courseId/*',
					element: <SourceView />
				},
				{
					path: 'clinical',
					element: <Courses />
				}
			]
		}
	]
};
export default AcademyAppConfig;
