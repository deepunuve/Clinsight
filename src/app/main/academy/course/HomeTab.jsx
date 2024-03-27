import { motion } from 'framer-motion';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
import TaskDistributionWidget from './widgets/TaskDistributionWidget';
import ScheduleWidget from './widgets/ScheduleWidget';
import GithubIssuesWidget from './widgets/GithubIssuesWidget';
import SummaryWidget from './widgets/SummaryWidget';
import OverdueWidget from './widgets/OverdueWidget';
import FeaturesWidget from './widgets/FeaturesWidget';
import IssuesWidget from './widgets/IssuesWidget';
import { getDashboardCount } from '../../../store/apiServices';
import { useEffect, useRef, useState } from 'react';
/**
 * The HomeTab component.
 */
function HomeTab(props) {
	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};
	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};
	const { studyId } = props;
	const [data, setData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			await getDashboardCount(studyId).
				then(response => {
					setData(response);
				});
		};
		if (!data) {
			fetchData();
		}
	}, []);

	if (data)
		return (
			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
				variants={container}
				initial="hidden"
				animate="show"
			>

				<motion.div variants={item}>
					<SummaryWidget value={data[0]} />
				</motion.div>
				<motion.div variants={item}>
					<OverdueWidget value={data[1]} />
				</motion.div>
				<motion.div variants={item}>
					<IssuesWidget value={data[2]} />
				</motion.div>
				<motion.div variants={item}>
					<FeaturesWidget value={data[3]} />
				</motion.div>
				<motion.div
					variants={item}
					className="sm:col-span-2 md:col-span-4"
				>
					<GithubIssuesWidget />
				</motion.div>

				<motion.div
					variants={item}
					className="sm:col-span-2 md:col-span-4 lg:col-span-2"
				>
					<TaskDistributionWidget />
				</motion.div>
				<motion.div
					variants={item}
					className="sm:col-span-2 md:col-span-4 lg:col-span-2"
				>
					<ScheduleWidget />
				</motion.div>
			</motion.div>
		);
}

export default HomeTab;
