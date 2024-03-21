import { Typography } from '@mui/material';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { postContentData, getResultDetails } from '../../../store/apiServices';
import FuseLoading from '@fuse/core/FuseLoading';

export default class ResultContentSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            content: '',
            isloading: false
        };
    }
    async componentDidMount() {
        const sessionData = sessionStorage.getItem('resultSum');
        if (sessionData) {
            this.setState({
                content: sessionData,
            });
        }
        else {
            if (this.props.data)
                await this.getResultDetailsData(this.props.data);
        }
    }

    async componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            try {
                this.setState({ isloading: true });
                await this.getResultDetailsData(this.props.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
    // getResultDetailsData = async (inputData) => {
    //     try {
    //         if (this.props.data) {
    //             let input = JSON.stringify(inputData)
    //             console.log(input);
    //             const sessionData = sessionStorage.getItem('resultSum');
    //             if (sessionData) {
    //                 this.setState({ content: sessionData });
    //             }
    //             await getResultDetails(input).
    //                 then(response => {
    //                     let updatedContent = '';
    //                     if (sessionData) {
    //                         updatedContent = sessionData + '<span style="color:green;font-weight: bold;">Qn. ' + inputData.query + ' ?</span>\n\n' + response.introduction + '\n\n';
    //                     }
    //                     else {
    //                         updatedContent = '<span style="color:green;font-weight: bold;">Qn. ' + inputData.query + ' ?</span>\n\n' + response.introduction + '\n\n'; // Add new content after two new lines
    //                     }
    //                     sessionStorage.setItem('resultSum', updatedContent);
    //                     this.setState({
    //                         content: updatedContent,
    //                     });

    //                 });
    //             this.setState({ isloading: false });
    //         }

    //     } catch (error) {
    //     }
    // };
    getResultDetailsData = async (inputData) => {
        try {
            if (this.props.data) {
                let payload = {
                    'query': inputData.query
                };
                console.log(payload);
                const sessionData = sessionStorage.getItem('resultSum');
                if (sessionData) {
                    this.setState({ content: sessionData });
                }
                await postContentData(payload).
                    then(response => {
                        let updatedContent = '';
                        if (sessionData) {
                            updatedContent = sessionData + '<span style="color:green;font-weight: bold;">Qn. ' + inputData.query + ' ?</span>\n\n' + response + '\n\n';
                        }
                        else {
                            updatedContent = '<span style="color:green;font-weight: bold;">Qn. ' + inputData.query + ' ?</span>\n\n' + response + '\n\n'; // Add new content after two new lines
                        }
                        sessionStorage.setItem('resultSum', updatedContent);
                        this.setState({
                            content: updatedContent,
                        });

                    });

                this.setState({ isloading: false });
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
                        <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
                        {this.state.isloading && <FuseLoading />}
                    </div>
                </div>
            </div>
        );
    }
}

