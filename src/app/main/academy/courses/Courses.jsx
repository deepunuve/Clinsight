import _ from '@lodash';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import FusePageSimple from '@fuse/core/FusePageSimple';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FuseLoading from '@fuse/core/FuseLoading';
import CourseCard from './CourseCard';
import { useGetAcademyCategoriesQuery, useGetAcademyCoursesQuery } from '../AcademyApi';
import { getStudiesLocal, getStudyType } from '../../../store/apiServices';
import { any } from 'zod';

const container = {
	show: {
		transition: {
			staggerChildren: 0.04
		}
	}
};
const item = {
	hidden: {
		opacity: 0,
		y: 10
	},
	show: {
		opacity: 1,
		y: 0
	}
};

/**
 * The Courses page.
 */
function Courses() {
	const [studies, setStudies] = useState([]);
	const [studyType, setStudyType] = useState([]);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [filteredData, setFilteredData] = useState(studies);
	const [searchText, setSearchText] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [hideCompleted, setHideCompleted] = useState(false);
	const [isLoading, setIsLoading] = useState(true);


	useEffect(() => {
		const fetchData = async () => {
			await getStudiesLocal().
				then(response => {
					setStudies(response);
					setIsLoading(false);
				});
		};
		if (studies.length === 0) {
			fetchData(); // Call the async function
		}
		const fetchType = async () => {
			await getStudyType().
				then(response => {
					setStudyType(response);
				});
		};
		if (studyType.length === 0) {
			fetchType(); // Call the async function
		}
		function getFilteredArray() {
			if (studies && searchText.length === 0 && selectedCategory === 'all' && !hideCompleted) {
				return studies;
			}
			return _.filter(studies, (item) => {
				if (selectedCategory !== 'all' && item.study_type !== selectedCategory) {
					return false;
				}
				if (hideCompleted && item.study_status ==='Completed') {
					return false;
				}

				return item.title.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (studies) {
			setFilteredData(getFilteredArray());
		}
	}, [studies, hideCompleted, searchText, selectedCategory]);

	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}

	function handleSearchText(event) {
		setSearchText(event.target.value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}
	return (
		<FusePageSimple
			content={
				<div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
					<div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
						<div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
							<FormControl
								className="flex w-full sm:w-136"
								variant="outlined"
							>
								<InputLabel id="category-select-label">Study Type</InputLabel>
								<Select
									labelId="category-select-label"
									id="category-select"
									label="Category"
									value={selectedCategory}
									onChange={handleSelectedCategory}
								>
									<MenuItem value="all">
										<em> All </em>
									</MenuItem>
									{studyType?.map((category) => (
										<MenuItem
											value={category.title}
											key={category.id}
										>
											{category.title}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<TextField
								label="Search for a study"
								placeholder="Enter a keyword..."
								className="flex w-full sm:w-256 mx-8"
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={handleSearchText}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						</div>

						<FormControlLabel
							label="Hide completed"
							control={
								<Switch
									onChange={(ev) => {
										setHideCompleted(ev.target.checked);
									}}
									checked={hideCompleted}
									name="hideCompleted"
								/>
							}
						/>
					</div>
					{filteredData &&
						(filteredData.length > 0 ? (
							<motion.div
								className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 mt-32 sm:mt-40"
								variants={container}
								initial="hidden"
								animate="show"
							>
								{filteredData.map((study) => {
									return (
										<motion.div
											variants={item}
											key={study.id}
										>
											<CourseCard course={study} />
										</motion.div>
									);
								})}

							</motion.div>
						) : (
							<div className="flex flex-1 items-center justify-center">
								<Typography
									color="text.secondary"
									className="text-24 my-24"
								>
									No courses found!									
								</Typography>
							</div>
						))}
				</div>
			}
			scroll={isMobile ? 'normal' : 'page'}
		/>
	);
}

export default Courses;
