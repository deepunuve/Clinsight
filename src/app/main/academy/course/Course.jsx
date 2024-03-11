import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTheme } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { Step, StepContent, StepLabel } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FuseLoading from '@fuse/core/FuseLoading';
import CourseInfo from '../CourseInfo';
import CourseProgress from '../CourseProgress';
import Error404Page from '../../404/Error404Page';
import { useGetAcademyCourseQuery, useUpdateAcademyCourseMutation } from '../AcademyApi';
import DocumentGraph from '../graph/DocumentGraph';
import CourseHeader from './CourseHeader';

/**
 * The Course page.
 */
function Course() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const theme = useTheme();
	const pageLayout = useRef(null);
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	const routeParams = useParams();
	const { courseId } = routeParams;

	const { data: course, isLoading } = useGetAcademyCourseQuery(
		{ courseId },
		{
			skip: !courseId
		}
	);
	const [updateCourse] = useUpdateAcademyCourseMutation();
	useEffect(() => {
		/**
		 * If the course is opened for the first time
		 * Change ActiveStep to 1
		 */
		if (course && course?.progress?.currentStep === 0) {
			updateCourse({ courseId, data: { progress: { currentStep: 1 } } });
		}
	}, [course]);
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);
	const currentStep = course?.progress?.currentStep || 0;

	function updateCurrentStep(index) {
		if (course && (index > course.totalSteps || index < 0)) {
			return;
		}

		updateCourse({ courseId, data: { progress: { currentStep: index } } });
	}

	function handleNext() {
		updateCurrentStep(currentStep + 1);
	}

	function handleBack() {
		updateCurrentStep(currentStep - 1);
	}

	function handleStepChange(index) {
		updateCurrentStep(index + 1);
	}

	const activeStep = currentStep !== 0 ? currentStep : 1;

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!course) {
		return <Error404Page />;
	}

	return (
		<FusePageSimple
			header={
				<CourseHeader
					leftSidebarToggle={() => {
						setLeftSidebarOpen(!leftSidebarOpen);
					}}
					rightSidebarToggle={() => {
						setRightSidebarOpen(!rightSidebarOpen);
					}}
					course={course}
					page="1"
				/>
			}
			content={
				<div className="w-full">
					<SwipeableViews>
						<div className="flex justify-center p-16 pb-64  sm:pb-64  md:pb-64">
							<Paper className="w-full mx-auto p-16 pb-64  sm:pb-64  md:pb-64 rounded-16 shadow overflow-hidden">
								<DocumentGraph />
							</Paper>
						</div>
					</SwipeableViews>
				</div>
			}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			leftSidebarWidth={300}
			leftSidebarContent={
				<>
					<div className="p-32">
						<Button
							to="/apps/academy/courses"
							component={Link}
							className="mb-24"
							color="secondary"
							variant="text"
							startIcon={
								<FuseSvgIcon size={20}>
									{theme.direction === 'ltr'
										? 'heroicons-outline:arrow-sm-left'
										: 'heroicons-outline:arrow-sm-right'}
								</FuseSvgIcon>
							}
						>
							Back to Studies
						</Button>

						<CourseInfo course={course} />
					</div>
					<Divider />
					<Stepper
						classes={{ root: 'p-32' }}
						activeStep={activeStep - 1}
						orientation="vertical"
					>
						{course.steps.map((step, index) => {
							return (
								<Step
									key={index}
									sx={{
										'& .MuiStepLabel-root, & .MuiStepContent-root': {
											cursor: 'pointer!important'
										},
										'& .MuiStepContent-root': {
											color: 'text.secondary',
											fontSize: 13
										}
									}}
									onClick={() => handleStepChange(step.order)}
									expanded
								>
									<StepLabel
										className="font-medium"
										sx={{
											'& .MuiSvgIcon-root': {
												color: 'background.default',
												'& .MuiStepIcon-text': {
													fill: (_theme) => _theme.palette.text.secondary
												},
												'&.Mui-completed': {
													color: 'secondary.main',
													'& .MuiStepIcon-text ': {
														fill: (_theme) => _theme.palette.secondary.contrastText
													}
												},
												'&.Mui-active': {
													color: 'secondary.main',
													'& .MuiStepIcon-text ': {
														fill: (_theme) => _theme.palette.secondary.contrastText
													}
												}
											}
										}}
									>
										{step.title}
									</StepLabel>
									<StepContent>{step.subtitle}</StepContent>
								</Step>
							);
						})}
					</Stepper>
				</>
			}
			scroll="content"
			ref={pageLayout}
		/>
	);
}

export default Course;
