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
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';
import HomeTab from './HomeTab';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`
	}
}));
/**
 * The Course page.
 */
function Dashboard() {
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
	const [tabValue, setTabValue] = useState(0);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

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
		sessionStorage.removeItem('sessionData');
		sessionStorage.removeItem('result');
		sessionStorage.removeItem('resultSum');
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


	function handleStepChange(index) {
		updateCurrentStep(index + 1);
	}
	function handleClick() {
		const destination = `/TA/results/${study.id}`;
		const state = { data: study };
		navigate(destination, { state });
	}

	// const activeStep = currentStep !== 0 ? currentStep : 1;

	if (isLoading) {
		return <FuseLoading />;
	}
	if (!sessionData) {
		return <FuseLoading />;
	}
	if (!study) {
		return <FuseLoading />;
	}

	return (
		<Root
			header={<div className="flex flex-col w-full px-24 sm:px-32">
				<div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
					<div className="flex flex-auto items-center min-w-0">

						<div className="flex flex-col min-w-0 mx-16">
							<Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
								{`Protocol - ${study.id}!`}
							</Typography>

							<div className="flex items-center">
								<FuseSvgIcon
									size={20}
									color="action"
								>
									heroicons-solid:book-open
								</FuseSvgIcon>

								<Typography
									className="mx-6 leading-6 truncate"
									color="text.secondary"
								>
									{study.title}

								</Typography>

							</div>
						</div>
					</div>
					<div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
						<Button
							to={`/TA/clinical`}
							component={Link}
							className="whitespace-nowrap"
							variant="contained"
							color="primary"
							startIcon={<FuseSvgIcon size={20}>heroicons-solid:arrow-left</FuseSvgIcon>}
						>
							Studies
						</Button>
						<Button
							to={`/TA/clinical/${study.id}`}
							component={Link}
							className="whitespace-nowrap"
							variant="contained"
							color="secondary"
							startIcon={<FuseSvgIcon size={20}>heroicons-solid:chart-pie</FuseSvgIcon>}
						>
							Explore
						</Button>
					</div>
				</div>
				<div className="flex items-center">
					<Button
						// onClick={handleOpenProjectMenu}
						className="flex items-center border border-solid border-b-0 rounded-t-xl rounded-b-0 h-40 px-16 text-13 sm:text-16"
						sx={{
							backgroundColor: (theme) => theme.palette.background.default,
							borderColor: (theme) => theme.palette.divider
						}}
						endIcon={
							<FuseSvgIcon
								size={20}
								color="action"
							>
								heroicons-solid:chevron-down
							</FuseSvgIcon>
						}
					>

					</Button>

				</div>
			</div>

			}
			content={
				<div className="w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
					<Tabs
						value={tabValue}
						onChange={handleChangeTab}
						indicatorColor="secondary"
						textColor="inherit"
						variant="scrollable"
						scrollButtons={false}
						className="w-full px-24 -mx-4 min-h-40"
						classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
						TabIndicatorProps={{
							children: (
								<Box
									sx={{ bgcolor: 'text.disabled' }}
									className="w-full h-full rounded-full opacity-20"
								/>
							)
						}}
					>
						<Tab
							className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
							disableRipple
							label="Home"
						/>
						<Tab
							className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
							disableRipple
							label="Budget"
						/>
						<Tab
							className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
							disableRipple
							label="Team"
						/>
					</Tabs>
					{tabValue === 0 && <HomeTab />}
					{tabValue === 1 && <div></div>}
					{tabValue === 2 && <div></div>}
				</div>
			}

			scroll="content"
			ref={pageLayout}
		/>
	);
}

export default Dashboard;