import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTheme } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import React, { useEffect, useRef, useState } from 'react';
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
import CourseHeader from '../course/CourseHeader';
import SourceViewer from '../doc/SourceViewer';
import { getStudyDetails } from '../../../store/apiServices';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

/**
 * The Course page.
 */
function SourceView() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const theme = useTheme();
	const pageLayout = useRef(null);
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	const routeParams = useParams();
	const { courseId } = routeParams;
	const childRef = React.createRef();
	const [study, setStudy] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [studyCount, setStudyCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const storedSessionData = sessionStorage.getItem('sessionData');
        if (storedSessionData) {
            let sData = JSON.parse(storedSessionData);
            setStudy(sData);
            setStudyCount(sData.source.length);
        }
	}, [isMobile, study]);

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

	function handleStepChange(index) {
		setSelectedFile(index);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!study) {
		return <Error404Page />;
	}

	return (
		<FusePageSimple

			content={
				<div className="w-full">
					<SwipeableViews>
						<div className="flex justify-center p-16 pb-64  sm:pb-64  md:pb-64">
							<Paper className="w-full mx-auto p-16 pb-64  sm:pb-64  md:pb-64 rounded-16 shadow overflow-hidden">
								<SourceViewer file={selectedFile} />
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
							to={`/TA/clinical/`}
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
							Back to studies
						</Button>

						<CourseInfo course={study} />
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
										onClick={() => handleStepChange(source.source_name)}
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

export default SourceView;
