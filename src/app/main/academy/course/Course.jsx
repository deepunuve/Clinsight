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
import { getStudyDetails } from '../../../store/apiServices';
import ResultDashNew from '../result/ResultDashNew';
import QuickPanelToggleButton from 'app/theme-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DocumentGraphNew from '../graph/DocumentGraphNew';

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
	const [isLoading, setIsLoading] = useState(false);
	const [study, setStudy] = useState(null);
	const [studyCount, setStudyCount] = useState(0);
	const [childStateValue, setChildStateValue] = useState([]);
	const navigate = useNavigate();
	const location = useLocation();
	const state = location.state; // Access state object here

	const [sessionData, setSessionData] = useState(() => {
		// Retrieve data from sessionStorage on component mount
		const storedSessionData = sessionStorage.getItem('sessionData');
		return storedSessionData ? JSON.parse(storedSessionData) : null;
	});
	const updateSessionData = (newData) => {
		setSessionData(newData);
		// Store data in sessionStorage
		sessionStorage.setItem('sessionData', JSON.stringify(newData));
	};
	const clearSessionData = () => {
		setSessionData(null);
		// Clear data from sessionStorage
		sessionStorage.removeItem('sessionData');
	};
	const graphClick = (childValue) => {
		setChildStateValue(childValue);
		study.source = childValue;
		updateSessionData(study);
	};
	const fetchData = async () => {
		await getStudyDetails(courseId).
			then(response => {
				setStudyCount(response.source.length);
				setStudy(response);
				updateSessionData(response);
			});
	};
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
		if (!sessionData) {
			fetchData();
		}
		else {
			setStudyCount(sessionData.source.length);
			setStudy(sessionData);
		}
	}, [isMobile]);
	useEffect(() => {
		const previousData = JSON.parse(sessionStorage.getItem('sessionData'));
		const previousId = previousData ? previousData.id : null;

		// Clear session data if the id has changed
		if (courseId !== previousId) {
			clearSessionData();
			fetchData();
		}
	}, [location.search]);
	// const currentStep = course?.progress?.currentStep || 0;

	// function updateCurrentStep(index) {
	// 	if (course && (index > course.totalSteps || index < 0)) {
	// 		return;
	// 	}

	// 	updateCourse({ courseId, data: { progress: { currentStep: index } } });
	// }

	// function handleNext() {
	// 	updateCurrentStep(currentStep + 1);
	// }

	// function handleBack() {
	// 	updateCurrentStep(currentStep - 1);
	// }

	function handleStepChange(index) {
		updateCurrentStep(index + 1);
	}
	function handleClick() {
		const destination = `/apps/academy/results/${study.id}`;
		const state = { data: study };
		navigate(destination, { state });
	}

	// const activeStep = currentStep !== 0 ? currentStep : 1;

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!study) {
		return <FuseLoading />;
	}

	return (
		<FusePageSimple
			header={
				<div className="flex flex-col p-24 w-full sm:px-40">

					<div className="flex items-center w-full mt-8 -mx-10">

						<Typography
							component="h2"
							className="flex-1 text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate mx-10"
						>
							<Button
								onClick={handleClick}
								className="px-16 min-w-128"
								color="secondary"
								variant="contained"
								endIcon={<FuseSvgIcon size={20}>heroicons-solid:arrow-sm-right</FuseSvgIcon>}
							>
								Explore More
							</Button>
						</Typography>

						<div className="flex shrink-0 items-center">
							<QuickPanelToggleButton />
						</div>
					</div>
				</div>

			}
			content={
				<div className="w-full">
					<SwipeableViews>
						<div className="flex justify-center p-16 pb-64  sm:pb-64  md:pb-64">
							<Paper className="w-full mx-auto p-16 pb-64  sm:pb-64  md:pb-64 rounded-16 shadow overflow-hidden">
								{/* <DocumentGraph onClick={graphClick} /> */}
								<DocumentGraphNew onClick={graphClick}/>
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
						{study && (<CourseInfo course={study} />)}
					</div>
					<Divider />
					<Stepper
						classes={{ root: 'p-32' }}
						activeStep={studyCount}
						orientation="vertical"
					>

						{study.source && (
							study.source.map((source, index) => {
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
										// onClick={() => handleStepChange(source.id)}
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
											{source.source_name}
										</StepLabel>
										{/* <StepContent>{step.subtitle}</StepContent> */}
									</Step>
								);
							}))
						}
					</Stepper>
				</>
			}
			scroll="content"
			ref={pageLayout}
		/>
	);
}

export default Course;