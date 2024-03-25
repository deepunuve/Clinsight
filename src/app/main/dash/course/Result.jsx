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
import { motion } from 'framer-motion';
import { blue, green } from '@mui/material/colors';
import { Pagination } from '@mui/material';



/**
 * The Course page.
 */
function Result() {
	// const [data, setData] = useState([]);
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
	const data = [
		{
			id: 1,
			name: "Diabetes mellitus refers to a group of diseases that affect how the body uses blood sugar (glucose)",
			age: 'Diabetes mellitus refers to a group of diseases that affect how the body uses blood sugar (glucose)'
		},
		{
			id: 2,
			name: "Jane",
			age: 25
		},
		{
			id: 3,
			name: "Alice",
			age: 35
		}
	];


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
										<Typography
											color="text.secondary"
											className="mx-16 mb-24 text-13"
										>
											{data.length} results
										</Typography>
									</motion.div>

									{data.map((_item) => (
										<Paper
											component={motion.div}
											variants={item}
											className="w-full mx-auto mb-16 overflow-hidden rounded-16 p-16 shadow"
											key={_item.id}
										>
											<Typography
												className="cursor-pointer text-18 font-medium"
												sx={{
													color: blue[800]
												}}
											>
												{_item.name}
											</Typography>
											<Typography
												className="my-4"
												sx={{
													color: green[800]
												}}
											>
												{_item.age}
											</Typography>
											<Typography>{_item.name}</Typography>
										</Paper>
									))}
								</motion.div>
							)}
						</div>
					</div>
					<div className="mt-48 flex justify-center">
						<Pagination
							count={10}
							variant="outlined"
							color="secondary"
						/>
					</div>
				</div>
			}
			scroll="content"
			ref={pageLayout}
		/>
	);
}

export default Result;
