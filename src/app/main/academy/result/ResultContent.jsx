import { Typography } from '@mui/material';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default class ResultContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps) {
    }
    toggleExpand = () => {
        this.setState((prevState) => ({
            expanded: !prevState.expanded
        }));

    };

    render() {
        const { expanded } = this.state;
        const { course } = this.props;

        return (
            <div className='container'>
                <div className="flex shrink-0 items-center">
                    <IconButton onClick={this.toggleExpand} aria-label="toggle sidebar" >
                        <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
                    </IconButton>
                    <h4 style={{"padding":'10px'}}>Result Data</h4>
                    <Button
                        to={`/apps/academy/content/${course.id}/${course.slug}`}
                        component={Link}
                        className="px-16 min-w-128"
                        variant="contained"
                        endIcon={<FuseSvgIcon size={20}>heroicons-solid:arrows-expand</FuseSvgIcon>}
                    >
                    </Button>
                </div>

                <div className={`animated-div ${expanded ? 'show' : 'hide'}`} style={{ "margin-top": "30px" }}>
                    <Typography>
                        Diabetes is a chronic disease that occurs either when the pancreas does not produce enough insulin or when the body cannot effectively use the insulin it produces.
                        Insulin is a hormone that regulates blood glucose. Hyperglycaemia, also called raised blood glucose or raised blood sugar, is a common effect of uncontrolled diabetes and over time leads to serious damage to many of the bodys systems, especially the nerves and blood vessels.

                    </Typography>

                    <a href="https://www.who.int/news-room/fact-sheets/detail/diabetes#:~:text=Overview,hormone%20that%20regulates%20blood%20glucose.">source diabetics</a>
                </div>
            </div>
        );
    }
}

