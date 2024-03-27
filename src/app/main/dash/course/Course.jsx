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
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FuseLoading from '@fuse/core/FuseLoading';
import CourseInfo from '../CourseInfo';
import CourseProgress from '../CourseProgress';
import Error404Page from '../../404/Error404Page';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const defaultValues = {
	from: { email: 'johndoe@creapond.com' },
	to: '',
	cc: [],
	bcc: [],
	subject: '',
	message: ''
};
const schema = z.object({
	from: z.object({
		email: z.union([z.string().email('You must enter a valid e-mail.'), z.null()])
	}),
	to: z.string().email('You must enter a valid e-mail.'),
	cc: z.array(z.string().email('Must be a valid email')),
	bcc: z.array(z.string().email('Must be a valid email')),
	subject: z.string(),
	message: z.string()
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

function createData(
	number,
	queries,
	publications,
	LastRuns,
	Actions
) {
	return { number, queries, publications, LastRuns, Actions };
}

const rows = [
	createData(1, 'pa=set', '12542312', '12355423', 4.0),
	createData(2, 'pa=set', '12542312', '12355423', 4.0),
	createData(3, 'pa=set', '12542312', '12355423', 4.0),
	createData(4, 'pa=set', '12542312', '12355423', 4.0),
	createData(5, 'pa=set', '12542312', '12355423', 4.0),
	createData(6, 'pa=set', '12542312', '12355423', 4.0),
];

/**
 * The Course page.
 */
function Course(props) {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const theme = useTheme();
	const pageLayout = useRef(null);
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const routeParams = useParams();
	const { courseId } = routeParams;
	const { className } = props;
	const [openDialog, setOpenDialog] = useState(false);
	const { handleSubmit, formState, control } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});
	const { isValid, dirtyFields, errors } = formState;
	
	const [alignment, setAlignment] = useState('web');

	const handleChange = (
		event,
		newAlignment,
	) => {
		setAlignment(newAlignment);
	};





	return (
		<FusePageSimple
			content={
				<div className="w-full">
					<div className="flex justify-center p-16 pb-16  sm:pb-16  md:pb-16">
						<Paper className="w-full mx-auto p-16 pb-16  sm:pb-16  md:pb-16 rounded-16 shadow overflow-hidden">
							<div className="text-center mt-8">

							</div>

							<form
								noValidate
								// onSubmit={handleSubmit(onSubmit)}
								className="flex flex-col"
							>
								<DialogContent classes={{ root: 'p-16 pb-0 sm:p-32 sm:pb-0' }}>
									<Controller
										name=""
										control={control}
										render={({ field }) => (
											<div>
												<ToggleButtonGroup
													color="primary"
													value={alignment}
													exclusive
													style={{ 'margin-right': '15px' }}
													onChange={handleChange}
													aria-label="Platform"
												>
													<ToggleButton value="web">AND</ToggleButton>
													<ToggleButton value="android">OR</ToggleButton>
													<ToggleButton value="ios">NOT</ToggleButton>
												</ToggleButtonGroup>

												<TextField
													{...field}
													className=" mb-16"
													label="Title, Abstract and claim"
													id="from"
													variant="outlined"
													style={{ width: '60%' }}
													size='small'
												/>
											</div>

										)}
									/>

									<Controller
										name="to"
										control={control}
										render={({ field }) => (
											<div>
												<ToggleButtonGroup
													color="primary"
													value={alignment}
													exclusive
													style={{ 'margin-right': '15px' }}
													onChange={handleChange}
													aria-label="Platform"
												>
													<ToggleButton value="web">AND</ToggleButton>
													<ToggleButton value="android">OR</ToggleButton>
													<ToggleButton value="ios">NOT</ToggleButton>
												</ToggleButtonGroup>

												<TextField
													{...field}
													className="mt-8 mb-16"
													label="Assignee"
													autoFocus
													id="to"
													error={!!errors.to}
													helperText={errors?.to?.message}
													variant="outlined"
													style={{ width: '60%' }}
													size='small'
												/>
											</div>


										)}
									/>

									<Controller
										name="cc"
										control={control}
										render={({ field }) => (
											<div>
												<ToggleButtonGroup
													color="primary"
													value={alignment}
													exclusive
													style={{ 'margin-right': '15px' }}
													onChange={handleChange}
													aria-label="Platform"
												>
													<ToggleButton value="web">AND</ToggleButton>
													<ToggleButton value="android">OR</ToggleButton>
													<ToggleButton value="ios">NOT</ToggleButton>
												</ToggleButtonGroup>

												<TextField
													{...field}
													className="mt-8 mb-16"
													label="Country"
													id="cc"
													variant="outlined"
													style={{ width: '60%' }}
													size='small'
												/>
											</div>

										)}
									/>

									<Controller
										name="bcc"
										control={control}
										render={({ field }) => (
											<div>
												<ToggleButtonGroup
													color="primary"
													value={alignment}
													exclusive
													style={{ 'margin-right': '15px' }}
													onChange={handleChange}
													aria-label="Platform"
												>
													<ToggleButton value="web">AND</ToggleButton>
													<ToggleButton value="android">OR</ToggleButton>
													<ToggleButton value="ios">NOT</ToggleButton>
												</ToggleButtonGroup>

												<TextField
													{...field}
													className="mt-8 mb-16"
													label="Publication Date"
													id="bcc"
													name="bcc"
													variant="outlined"
													style={{ width: '60%' }}
													size='small'
												/>
											</div>

										)}
									/>

									<Controller
										name="subject"
										control={control}
										render={({ field }) => (
											<div>
												<ToggleButtonGroup
													color="primary"
													value={alignment}
													exclusive
													style={{ 'margin-right': '15px' }}
													onChange={handleChange}
													aria-label="Platform"
												>
													<ToggleButton value="web">AND</ToggleButton>
													<ToggleButton value="android">OR</ToggleButton>
													<ToggleButton value="ios">NOT</ToggleButton>
												</ToggleButtonGroup>

												<TextField
													{...field}
													className="mt-8 mb-16"
													label="Previous Query"
													id="subject"
													name="subject"
													variant="outlined"
													style={{ width: '60%' }}
													size='small'
												/>
											</div>
										)}
									/>

									<Controller
										name="subject"
										control={control}
										render={({ field }) => (
											<div>
												<ToggleButtonGroup
													color="primary"
													value={alignment}
													exclusive
													style={{ 'margin-right': '15px' }}
													onChange={handleChange}
													aria-label="Platform"
												>
													<ToggleButton value="web">AND</ToggleButton>
													<ToggleButton value="android">OR</ToggleButton>
													<ToggleButton value="ios">NOT</ToggleButton>
												</ToggleButtonGroup>

												<TextField
													{...field}
													className="mt-8 mb-16"
													label="Command Language Query"
													id="subject"
													name="subject"
													variant="outlined"
													style={{ width: '60%' }}
													size='small'
												/>
											</div>

										)}
									/>



									<div className="pt-8">
										{/* <MailAttachment
											fileName="attachment-2.doc"
											size="12 kb"
										/>
										<MailAttachment
											fileName="attachment-1.jpg"
											size="350 kb"
										/> */}
									</div>
								</DialogContent>

								<DialogActions className="flex flex-col sm:flex-row sm:items-center justify-between py-16 sm:py-24 px-24">


									<div className="flex items-center space-x-8 mt-16 sm:mt-0">
										<Button
											variant="outlined"
											color="secondary"
										// onClick={handleDiscard}
										>
											Discard
										</Button>


										<Button
											variant="contained"
											color="secondary"
											type="submit"
											to={`/apps/academy/result/12121212`}
											component={Link}
										>
											Search Result
										</Button>
									</div>
								</DialogActions>
							</form>
						</Paper>

					</div>
					<div className="flex justify-center p-16 pb-16  sm:pb-16  md:pb-16">
						<Paper className="w-full mx-auto p-16 pb-16  sm:pb-16  md:pb-16 rounded-16 shadow overflow-hidden">
							<Typography variant="h5">Search History</Typography>
							<div style={{ height: '20px' }}></div>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 700 }} aria-label="customized table">
									<TableHead>
										<TableRow>
											<StyledTableCell>#</StyledTableCell>
											<StyledTableCell align="right">Queries</StyledTableCell>
											<StyledTableCell align="right">Publications</StyledTableCell>
											<StyledTableCell align="right">Last Runs</StyledTableCell>
											<StyledTableCell align="right">Actions</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rows.map((row) => (
											<StyledTableRow key={row.name}>
												<StyledTableCell component="th" scope="row">
													{row.number}
												</StyledTableCell>
												<StyledTableCell align="right">{row.queries}</StyledTableCell>
												<StyledTableCell align="right">{row.publications}</StyledTableCell>
												<StyledTableCell align="right">{row.LastRuns}</StyledTableCell>
												<StyledTableCell align="right">{row.Actions}</StyledTableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper></div>
				</ div>
			}
			scroll="content"
			ref={pageLayout}
		/>
	);
}

export default Course;
