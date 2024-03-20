import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import QuickPanelToggleButton from 'app/theme-layouts/shared-components/quickPanel/QuickPanelToggleButton';


/**
 * The DemoHeader component.
 */
function CourseHeader(props) {
    const { leftSidebarToggle, rightSidebarToggle, course, page } = props;

    function handleClick() { }

    return (

        <div className="flex flex-col p-24 w-full sm:px-40">

            <div className="flex items-center w-full mt-8 -mx-10">
                {leftSidebarToggle && (
                    <div className="flex shrink-0 items-center">
                        <IconButton
                            onClick={leftSidebarToggle}
                            aria-label="toggle sidebar"
                        >
                            <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
                        </IconButton>
                    </div>
                )}
                <Typography
                    component="h2"
                    className="flex-1 text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate mx-10"
                >
                    {page === "1" ? (
                        <Button
                            to={`/TA/results/${course.id}/${course.slug}`}
                            component={Link}
                            className="px-16 min-w-128"
                            color="secondary"
                            variant="contained"
                            endIcon={<FuseSvgIcon size={20}>heroicons-solid:arrow-sm-right</FuseSvgIcon>}
                        >
                            Explore More
                        </Button>
                    ) : ""}
                </Typography>
                
                <div className="flex shrink-0 items-center">
                    <QuickPanelToggleButton />
                </div>
                {/* {rightSidebarToggle && (
					<div className="flex shrink-0 items-center">
						<IconButton
							onClick={rightSidebarToggle}
							aria-label="toggle sidebar"
						>
							<FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
						</IconButton>
					</div>
				)} */}
            </div>
        </div>
    );
}

export default CourseHeader;
