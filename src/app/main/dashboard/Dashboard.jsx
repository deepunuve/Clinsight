import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FuseLoading from '@fuse/core/FuseLoading';
import { getStudyDetails } from '../../store/apiServices';
import { Link, useParams } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Divider from '@mui/material/Divider';
import { Step, StepContent, StepLabel } from '@mui/material';


const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {}
}));

function Dashboard() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const theme = useTheme();
	const pageLayout = useRef(null);
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	const [study, setStudy] = useState(null);
	const [studyCount, setStudyCount] = useState(0);

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
		const fetchData = async () => {
			await getStudyDetails().
				then(response => {
					setStudyCount(response.source.length);
					setStudy(response);
					updateSessionData(response);
				});
		};
		fetchData();
	}, [isMobile]);
	const { t } = useTranslation('Sourse Selection');


	if (!study) {
		return <FuseLoading />;
	}
	return (
		<Root
			header={
				<div className="p-24">
					<h4>Sourse Selection</h4>
				</div>
			}
			content={
				<div className="w-full">
					<div className="flex justify-center p-16 pb-16  sm:pb-16  md:pb-16">
						<Paper className="w-full mx-auto p-16 pb-16  sm:pb-16  md:pb-16 rounded-16 shadow overflow-hidden">
							<div className="text-center mt-8">
								<Typography className="ttext-lg font-medium tracking-tight leading-6 truncate">
									Do you want to enrich your information with Internal Sources
								</Typography>
								<Typography className="text-lg font-medium text-blue-600 dark:text-blue-500">
									Please choose highlighted one below</Typography>
							</div>

							<div class="logo-box-doc">
								<img src="assets/images/dash/oracle.png" alt="Logo" class="logo-doc-img" />
							</div>
							<div class="logo-box-doc">
								<img src="assets/images/dash/medidata.png" alt="Logo" class="logo-doc-img" />
							</div>
							<div class="logo-box-doc">
								<img src="assets/images/dash/Teradata_.png" alt="Logo" class="logo-doc-img" />
							</div>
							<div class="logo-box-doc">
								<img src="assets/images/dash/postgrel.png" alt="Logo" class="logo-doc-img" />
							</div>
							<div class="logo-box-doc">
								<img src="assets/images/dash/mysql.png" alt="Logo" class="logo-doc-img" />
							</div>

						</Paper>

					</div>
					<div className="flex justify-center p-16 ">
						<Paper className="w-full mx-auto p-16  rounded-16 shadow overflow-hidden">
							<div className="text-center mt-8">
								<Typography className="ttext-lg font-medium tracking-tight leading-6 truncate">
									Do you want to enrich your information with External Knowledge Base
								</Typography>
								<Typography className="text-lg font-medium text-blue-600 dark:text-blue-500">Please choose highlighted one below</Typography>
							</div>

							<div class="logo-box-doc">
								<img src="assets/images/dash/chembl.png" alt="Logo" class="logo-doc-img" />
							</div>
							<div class="logo-box-doc">
								<img src="assets/images/dash/pubmed.png" alt="Logo" class="logo-doc-img" />
							</div>
							<div class="logo-box-doc">
								<img src="assets/images/dash/NIH.png" alt="Logo" class="logo-doc-img" />
							</div>
							<div class="logo-box-doc">
								<img src="assets/images/dash/drugbank.png" alt="Logo" class="logo-doc-img" />
							</div>
							<div class="logo-box-doc">
								<img src="assets/images/dash/Snomed.png" alt="Logo" class="logo-doc-img" />
							</div>
						</Paper>

					</div>
				</ div>
			} leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			leftSidebarWidth={300}
			leftSidebarContent={
				<>

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
										// onClick={() => handleStepChange(step.order)}
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
		/>
	);
}

export default Dashboard;
