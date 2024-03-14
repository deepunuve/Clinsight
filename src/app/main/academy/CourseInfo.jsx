import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import clsx from 'clsx';
import Chip from '@mui/material/Chip';

/**
 * The CourseInfo component.
 */
function CourseInfo(props) {
	const { course, className } = props;

	if (!course) {
		return null;
	}

	return (
		<div className={clsx('w-full', className)}>
			<div className="flex items-center justify-between mb-16">
				<Chip
					className="font-semibold text-12"
					label={course.study_type}
					sx={{
						color: (theme) =>
							theme.palette.mode === 'light' ? 'black' : 'white',
						backgroundColor: (theme) =>
							theme.palette.mode === 'light' ? '#90EE90' : '#FFFFE0'
					}}
					size="small"
				/>

				{/* {course.progress.completed > 0 && ( */}
				<FuseSvgIcon
					className="text-green-600"
					size={20}
				>
					heroicons-solid:badge-check
				</FuseSvgIcon>
				{/* )} */}
			</div>

			<Typography className="text-16 font-medium line-clamp-2">{course.title}</Typography>

			<Typography
				className="text-13 mt-2 line-clamp-2"
				color="text.secondary"
			>
				{course.brief_summary}
			</Typography>

			<Divider
				className="w-48 my-24 border-1"
				light
			/>

			<Typography
				className="flex items-center space-x-6 text-13"
				color="text.secondary"
			>
				<FuseSvgIcon
					color="disabled"
					size={20}
				>
					heroicons-solid:document
				</FuseSvgIcon>
				<span className="whitespace-nowrap leading-none">{`${course.id}`}</span>
			</Typography>
			<Typography
				className="flex items-center space-x-6 text-13 mt-8"
				color="text.secondary"
			>
				<FuseSvgIcon
					color="disabled"
					size={20}
				>
					heroicons-solid:academic-cap
				</FuseSvgIcon>
				<span className="whitespace-nowrap leading-none">
					{course.study_status}
				</span>
			</Typography>
		</div>
	);
}

export default CourseInfo;
