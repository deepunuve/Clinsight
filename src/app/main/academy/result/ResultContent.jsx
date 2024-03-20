import { Typography } from '@mui/material';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getResultDetails } from '../../../store/apiServices';

export default class ResultContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            content: '',
        };
    }
    componentDidMount() {
    }

    async componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            try {
                await this.getResultDetailsData(this.props.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
    getResultDetailsData = async (inputData) => {
        try {
            if (this.props.data) { 
                let input = JSON.stringify(inputData)
                console.log(input);
                await getResultDetails(input).
                    then(response => {
                        const updatedContent = this.state.content + response.data + '\n\n'; // Add new content after two new lines
                        this.setState({
                            content: updatedContent,
                        });
                    });
            }

        } catch (error) {
        }
    };
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
                    <Button
                        to={`/TA/content/694e4e5f-f25f-470b-bd0e-26b1d4f64028`}
                        component={Link}
                        style={{ background: "none" }}
                        variant="contained"
                        endIcon={<FuseSvgIcon size={20}>heroicons-solid:arrows-expand</FuseSvgIcon>}
                    >
                    </Button>
                </div>

                <div className={`animated-div ${expanded ? 'show' : 'hide'}`} style={{ marginTop: "30px" }}>
                    <div style={{ whiteSpace: 'pre-line' }}>
                        {this.state.content}
                    </div>
                </div>
            </div>
        );
    }
}

