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
import { motion } from 'framer-motion';
import { blue, green } from '@mui/material/colors';
import { Pagination } from '@mui/material';
import ValueSectionSmall from './ValueSectionSmall';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { getExternalDetails } from '../../../store/apiServices';
/**
 * The Course page.
 */
function Result() {
	const [data, setData] = useState([]);

	const resultData = async () => {
		await getExternalDetails().
			then(response => {
				setData(response);
			});
	};

	if (data.length === 0) {
		resultData();
	}
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(2); // Change this value to adjust items per page


	// Calculate the index of the first and last item to be displayed
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = data.length !== 0 ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);


	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const theme = useTheme();
	const pageLayout = useRef(null);
	useEffect(() => {
		setTimeout(() => {

		}, 100);
	}, []);
	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};
	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
	};



	return (
		<FusePageSimple
			content={
				<div className="w-full">
					<div className="flex justify-center p-16 pb-16  sm:pb-16  md:pb-16">
						<div className="w-full mx-auto p-16 pb-16  sm:pb-16  md:pb-16 rounded-16 shadow overflow-hidden">
							{data.length > 0 && (
								<motion.div
									variants={container}
									initial="hidden"
									animate="show"
								>
									<motion.div variants={item}>
										<div class="topSecContainer">
											<div class="topSecLeft">
												<Typography
													color="text.secondary"
													className="mx-16 mb-24 text-13"
												>
													{data.length} results
												</Typography>
											</div>
											<div class="topSecRight">
												<div class="sort-option">
													<Typography
														color="text.secondary"
														className="mx-16 mb-24 text-13"
													>
														<Button variant="contained" style={{ background: 'none' }}>
															<i class="icon"><FuseSvgIcon size={12}>heroicons-outline:chevron-double-down</FuseSvgIcon></i>
															<span class="text">Latest Published</span>
														</Button></Typography>
												</div>
												<div class="sort-option">
													<Typography
														color="text.secondary"
														className="mx-16 mb-24 text-13"
													>
														<Button variant="contained" style={{ background: 'none' }}>
															<i class="icon"><FuseSvgIcon size={12}>heroicons-outline:chevron-double-down</FuseSvgIcon></i>
															<span class="text">Publication</span>
														</Button></Typography>
												</div>
												<div class="sort-option">
													<Typography
														color="text.secondary"
														className="mx-16 mb-24 text-13"
													>
														<Button variant="contained" style={{ background: 'none' }}>
															<i class="icon"><FuseSvgIcon size={12}>heroicons-outline:pencil</FuseSvgIcon></i>
															<span class="text">Higlighting</span>
														</Button></Typography>
												</div>
											</div>
										</div>




									</motion.div>

									{currentItems.map((_item) => (
										<Paper
											component={motion.div}
											variants={item}
											className="w-full mx-auto mb-16 overflow-hidden rounded-16 p-16 shadow"
											key={_item.id}
										>


											<Typography variant="body1" sx={{
												color: blue[800]
											}}>
												<Button variant="contained" style={{ background: 'none' }}>
													<i class="icon"><FuseSvgIcon>heroicons-outline:clipboard-list</FuseSvgIcon></i>
													<span class="text">EDH4545434637463DDD</span>
												</Button>
											</Typography>
											<Typography
												variant="subtitle1"
												className="cursor-pointer font-medium"
												style={{ 'margin-left': '10px' }}
											>
												{_item.name}
											</Typography>
											<div className="hidden sm:flex items-center my-12 mx-8 rounded-xl border">
												<ValueSectionSmall
													title="Market Cap"
													unit="B"
													value="1232323"
												/>
												<Divider
													orientation="vertical"
													flexItem
												/>
												<ValueSectionSmall
													title="Volume"
													unit="B"
													value="1232323"
												/>
												<Divider
													orientation="vertical"
													flexItem
												/>
												<ValueSectionSmall
													title="Supply"
													unit="M"
													value="1232323"
												/>
												<Divider
													orientation="vertical"
													flexItem
												/>
												<ValueSectionSmall
													title="All Time High"
													value="1232323"
												/>
												<Divider
													orientation="vertical"
													flexItem
												/>
												<ValueSectionSmall
													title="All Time High"
													value="1232323"
												/>
												<Divider
													orientation="vertical"
													flexItem
												/>
												<ValueSectionSmall
													title="All Time High"
													value="1232323"
												/>
												<Divider
													orientation="vertical"
													flexItem
												/>
												<ValueSectionSmall
													title="All Time High"
													value="1232323"
												/>
												<Divider
													orientation="vertical"
													flexItem
												/>
											</div>
											<Typography
												className="cursor-pointer text-14 font-medium"
												sx={{
													color: blue[800]
												}}
												variant="body1"
											>
												<Button variant="contained" style={{ background: 'none' }}>
													<i class="icon"><FuseSvgIcon>heroicons-outline:clipboard-check</FuseSvgIcon></i>
													<span class="text">Abstract</span>
												</Button>

											</Typography>
											<Typography
												className="my-4"
												variant="body1"
												style={{ 'margin-left': '10px' }}
											>
												Frequent cannabis smoking may significantly increase a person’s risk for heart attack and stroke, according to an observational study supported by the National Institutes of Health. The study, published in the Journal of the American Heart Association, uses data from nearly 435,000 American adults, and is among the largest ever to explore the relationship between cannabis and cardiovascular events.
											</Typography>
											<Typography style={{ 'margin-left': '10px' }}>{_item.name}</Typography>
											<div className='space2'></div>
											<div class="boxContainer">
												<div class="boxData">
													<PopupState variant="popover" popupId="demo-popup-popover">
														{(popupState) => (
															<div>
																<Button variant="contained" {...bindTrigger(popupState)}>
																	<i class="icon"><FuseSvgIcon>heroicons-outline:chip</FuseSvgIcon></i>
																	<span class="text">Smart Summary</span>
																</Button>
																<Popover
																	{...bindPopover(popupState)}
																	anchorOrigin={{
																		vertical: 'bottom',
																		horizontal: 'center',
																	}}
																	transformOrigin={{
																		vertical: 'top',
																		horizontal: 'center',
																	}}
																>
																	<Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
																</Popover>
															</div>
														)}
													</PopupState>
												</div>
												<div class="boxData">
													<PopupState variant="popover" popupId="demo-popup-popover">
														{(popupState) => (
															<div>
																<Button variant="contained" {...bindTrigger(popupState)}>
																	<i class="icon"><FuseSvgIcon>heroicons-outline:cursor-click</FuseSvgIcon></i>
																	<span class="text">Claim Summary</span>
																</Button>
																<Popover
																	{...bindPopover(popupState)}
																	anchorOrigin={{
																		vertical: 'bottom',
																		horizontal: 'center',
																	}}
																	transformOrigin={{
																		vertical: 'top',
																		horizontal: 'center',
																	}}
																>
																	<Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
																</Popover>
															</div>
														)}
													</PopupState>
												</div>
												<div class="boxData">
													<PopupState variant="popover" popupId="demo-popup-popover">
														{(popupState) => (
															<div>
																<Button variant="contained" {...bindTrigger(popupState)}>
																	<i class="icon"><FuseSvgIcon>heroicons-outline:fire</FuseSvgIcon></i>
																	<span class="text">Family Tree</span>
																</Button>
																<Popover
																	{...bindPopover(popupState)}
																	anchorOrigin={{
																		vertical: 'bottom',
																		horizontal: 'center',
																	}}
																	transformOrigin={{
																		vertical: 'top',
																		horizontal: 'center',
																	}}
																>
																	<Typography sx={{ p: 2 }}>Frequent cannabis smoking may significantly increase a person’s risk for heart attack and stroke, according to an observational study supported by the National Institutes of Health. The study, published in the Journal of the American Heart Association, uses data from nearly 435,000 American adults, and is among the largest ever to explore the relationship between cannabis and cardiovascular events.

																		Diabetes mellitus refers to a group of diseases that affect how the body uses blood sugar (glucose)

																		.</Typography>
																</Popover>
															</div>
														)}
													</PopupState>
												</div>
											</div>


										</Paper>
									))}
								</motion.div>
							)}
						</div>
					</div>
					<div className="mt-48 flex justify-center">

						<div className="pagination">
							{/* Previous button */}
							<button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
								Previous
							</button>
							{/* Page numbers */}
							{Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
								<button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
									{i + 1}
								</button>
							))}
							{/* Next button */}
							<button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= data.length}>
								Next
							</button>
						</div>

						{/* <Pagination
							count={10}
							variant="outlined"
							color="secondary"
						/> */}
					</div>
					<div className='space2'></div>
				</div>
			}
			scroll="content"
			ref={pageLayout}
		/>
	);
}

export default Result;
