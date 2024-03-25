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
function Sources() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const theme = useTheme();
	const pageLayout = useRef(null);
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	const [study, setStudy] = useState(null);
	const [nih, setNih] = useState(false);
	const [studyCount, setStudyCount] = useState(0);

	useEffect(() => {
		
	}, [isMobile]);
	const { t } = useTranslation('Sourse Selection');
	
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
								<a href={`/Dashboard/Clinical/`}><img src="assets/images/dash/NIH.png" alt="Logo" class="logo-doc-img" /></a>
							</div>
							<div class="logo-box-doc">
								<img src="assets/images/dash/chembl.png" alt="Logo" class="logo-doc-img" />
							</div>
							<div class="logo-box-doc">
								<img src="assets/images/dash/pubmed.png" alt="Logo" class="logo-doc-img" />
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
			}
		/>
	);
}

export default Sources;
