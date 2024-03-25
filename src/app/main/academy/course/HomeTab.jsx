import { motion } from 'framer-motion';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
/**
 * The HomeTab component.
 */
function HomeTab() {
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
	return (
		<motion.div
			className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
			variants={container}
			initial="hidden"
			animate="show"
		>
			<motion.div variants={item}>
				<Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
					<div className="flex items-center justify-between px-8 pt-12">
						<Typography
							className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
							color="text.secondary"
						>
							Overdue
						</Typography>
						<IconButton
							aria-label="more"
							size="large"
						>
							<FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
						</IconButton>
					</div>
					<div className="text-center mt-8">
						<Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-blue-500">
							{String(12)}
						</Typography>
						<Typography className="text-lg font-medium text-blue-600">Tasks</Typography>
					</div>
					<Typography
						className="flex items-baseline justify-center w-full mt-20 mb-24"
						color="text.secondary"
					>
						<span className="truncate">Yesterdays Tasks</span>:<b className="px-8">{String(14)}</b>
					</Typography>
				</Paper>
			</motion.div>
			<motion.div variants={item}>
				<Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
					<div className="flex items-center justify-between px-8 pt-12">
						<Typography
							className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
							color="text.secondary"
						>
							Overdue
						</Typography>
						<IconButton
							aria-label="more"
							size="large"
						>
							<FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
						</IconButton>
					</div>
					<div className="text-center mt-8">
						<Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-red-500">
							{String(12)}
						</Typography>
						<Typography className="text-lg font-medium text-red-600">Tasks</Typography>
					</div>
					<Typography
						className="flex items-baseline justify-center w-full mt-20 mb-24"
						color="text.secondary"
					>
						<span className="truncate">Yesterdays Tasks</span>:<b className="px-8">{String(14)}</b>
					</Typography>
				</Paper>
			</motion.div>
			<motion.div variants={item}>
				<Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
					<div className="flex items-center justify-between px-8 pt-12">
						<Typography
							className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
							color="text.secondary"
						>
							Overdue
						</Typography>
						<IconButton
							aria-label="more"
							size="large"
						>
							<FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
						</IconButton>
					</div>
					<div className="text-center mt-8">
						<Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-green-500">
							{String(12)}
						</Typography>
						<Typography className="text-lg font-medium text-green-600">Tasks</Typography>
					</div>
					<Typography
						className="flex items-baseline justify-center w-full mt-20 mb-24"
						color="text.secondary"
					>
						<span className="truncate">Yesterdays Tasks</span>:<b className="px-8">{String(14)}</b>
					</Typography>
				</Paper>
			</motion.div>
			<motion.div variants={item}>
				<Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
					<div className="flex items-center justify-between px-8 pt-12">
						<Typography
							className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
							color="text.secondary"
						>
							Overdue
						</Typography>
						<IconButton
							aria-label="more"
							size="large"
						>
							<FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
						</IconButton>
					</div>
					<div className="text-center mt-8">
						<Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-yellow-500">
							{String(12)}
						</Typography>
						<Typography className="text-lg font-medium text-yellow-600">Tasks</Typography>
					</div>
					<Typography
						className="flex items-baseline justify-center w-full mt-20 mb-24"
						color="text.secondary"
					>
						<span className="truncate">Yesterdays Tasks</span>:<b className="px-8">{String(14)}</b>
					</Typography>
				</Paper>
			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4"
			>

			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-2"
			>

			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-2"
			>

			</motion.div>
		</motion.div>
	);
}

export default HomeTab;
