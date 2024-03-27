import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { useState } from 'react';
/**
 * The IssuesWidget widget.
 */
function IssuesWidget(props) {
	const [isLoading, setIsLoading] = useState(false);
	const { value } = props;
	const widget = value.Protein;
	
	if (isLoading) {
		return <FuseLoading />;
	}

	if (!widget) {
		return null;
	}


	return (
		<Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
			<div className="flex items-center justify-between px-8 pt-12">
				<Typography
					className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
					color="text.secondary"
				>
					{widget.name}
				</Typography>
				<IconButton
					aria-label="more"
					size="large"
				>
					<FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
				</IconButton>
			</div>
			<div className="text-center mt-8">
				<Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-amper-500">
					{String(widget.count)}
				</Typography>
				<Typography className="text-lg font-medium text-amper-600">{widget.name}</Typography>
			</div>
			<Typography
				className="flex items-baseline justify-center w-full mt-20 mb-24"
				color="text.secondary"
			>
				{/* <span className="truncate">{data.extra.name}</span>:<b className="px-8">{String(data.extra.count)}</b> */}
			</Typography>
		</Paper>
	);
}

export default memo(IssuesWidget);