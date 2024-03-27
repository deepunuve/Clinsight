import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';

/**
 * The ScheduleWidget widget.
 */
function ScheduleWidget() {

	const data = {
		"schedule": {
			"ranges": {
				"today": "Today",
				"tomorrow": "Tomorrow"
			},
			"series": {
				"today": [
					{
						"title": "Group Meeting",
						"time": "in 32 minutes",
						"location": "Conference room 1B"
					},
					{
						"title": "Coffee Break",
						"time": "10:30 AM"
					},
					{
						"title": "Public Beta Release",
						"time": "11:00 AM"
					},
					{
						"title": "Lunch",
						"time": "12:10 PM"
					},
					{
						"title": "Dinner with David",
						"time": "05:30 PM",
						"location": "Magnolia"
					},
					{
						"title": "Jane's Birthday Party",
						"time": "07:30 PM",
						"location": "Home"
					},
					{
						"title": "Overseer's Retirement Party",
						"time": "09:30 PM",
						"location": "Overseer's room"
					}
				],
				"tomorrow": [
					{
						"title": "Marketing Meeting",
						"time": "09:00 AM",
						"location": "Conference room 1A"
					},
					{
						"title": "Public Announcement",
						"time": "11:00 AM"
					},
					{
						"title": "Lunch",
						"time": "12:10 PM"
					},
					{
						"title": "Meeting with Beta Testers",
						"time": "03:00 PM",
						"location": "Conference room 2C"
					},
					{
						"title": "Live Stream",
						"time": "05:30 PM"
					},
					{
						"title": "Release Party",
						"time": "07:30 PM",
						"location": "CEO's house"
					},
					{
						"title": "CEO's Private Party",
						"time": "09:30 PM",
						"location": "CEO's Penthouse"
					}
				]
			}
		}
	};
	const [isLoading, setIsLoading] = useState(false);
	const widget = data.schedule;

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!widget) {
		return null;
	}

	const { series, ranges } = widget;
	const [tabValue, setTabValue] = useState(0);
	const currentRange = Object.keys(ranges)[tabValue];
	return (
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
			<div className="flex flex-col sm:flex-row items-start justify-between">
				<Typography className="text-lg font-medium tracking-tight leading-6 truncate">Schedule</Typography>
				<div className="mt-12 sm:mt-0 sm:ml-8">
					<Tabs
						value={tabValue}
						onChange={(ev, value) => setTabValue(value)}
						indicatorColor="secondary"
						textColor="inherit"
						variant="scrollable"
						scrollButtons={false}
						className="-mx-16 min-h-40"
						classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
						TabIndicatorProps={{
							children: (
								<Box
									sx={{ bgcolor: 'text.disabled' }}
									className="w-full h-full rounded-full opacity-20"
								/>
							)
						}}
					>
						{Object.entries(ranges).map(([key, label]) => (
							<Tab
								className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
								disableRipple
								key={key}
								label={label}
							/>
						))}
					</Tabs>
				</div>
			</div>
			<List className="py-0 mt-8 divide-y">
				{series[currentRange].map((item, index) => (
					<ListItem
						key={index}
						className="px-0"
					>
						<ListItemText
							classes={{ root: 'px-8', primary: 'font-medium' }}
							primary={item.title}
							secondary={
								<span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
									{item.time && (
										<span className="flex items-center">
											<FuseSvgIcon
												size={20}
												color="disabled"
											>
												heroicons-solid:clock
											</FuseSvgIcon>
											<Typography
												component="span"
												className="mx-6 text-md"
												color="text.secondary"
											>
												{item.time}
											</Typography>
										</span>
									)}

									{item.location && (
										<span className="flex items-center">
											<FuseSvgIcon
												size={20}
												color="disabled"
											>
												heroicons-solid:location-marker
											</FuseSvgIcon>
											<Typography
												component="span"
												className="mx-6 text-md"
												color="text.secondary"
											>
												{item.location}
											</Typography>
										</span>
									)}
								</span>
							}
						/>
						<ListItemSecondaryAction>
							<IconButton
								aria-label="more"
								size="large"
							>
								<FuseSvgIcon>heroicons-solid:chevron-right</FuseSvgIcon>
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</Paper>
	);
}

export default memo(ScheduleWidget);
