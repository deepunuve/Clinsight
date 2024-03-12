import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectQuickPanelData, selectQuickPanelOpen, toggleQuickPanel } from './quickPanelSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const StyledSwipeableDrawer = styled(SwipeableDrawer)(() => ({
	'& .MuiDrawer-paper': {
		width: 320
	}
}));

/**
 * The quick panel.
 */
function QuickPanel() {
	const dispatch = useAppDispatch();
	const data = useAppSelector(selectQuickPanelData);
	const open = useAppSelector(selectQuickPanelOpen);
	const [checked, setChecked] = useState(['notifications']);
	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};
	return (
		<StyledSwipeableDrawer
			open={open}
			anchor="right"
			onOpen={() => {}}
			onClose={() => dispatch(toggleQuickPanel())}
			disableSwipeToOpen
		>
			<FuseScrollbars>
				<div className="p-32">
					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<div>
							<Typography variant="h6" gutterBottom>
								Filter
							</Typography>
							<TextField
								required
								id="outlined-required"
								label="Required"
								defaultValue="Hello World"
							/>
							<TextField
								disabled
								id="outlined-disabled"
								label="Disabled"
								defaultValue="Hello World"
							/>
							<TextField
								id="outlined-password-input"
								label="Password"
								type="password"
								autoComplete="current-password"
							/>
							<TextField
								id="outlined-read-only-input"
								label="Read Only"
								defaultValue="Hello World"
								InputProps={{
									readOnly: true,
								}}
							/>

						</div>
						<div>
							<TextField
								required
								id="filled-required"
								label="Required"
								defaultValue="Hello World"
								variant="filled"
							/>

						</div>

					</Box>
				</div>
			</FuseScrollbars>
		</StyledSwipeableDrawer>
	);
}

export default QuickPanel;
