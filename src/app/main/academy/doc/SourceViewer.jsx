import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';

export default class SourceViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileShow: false,
            expanded: true,
            pdfUrl: '',
            fileData: null,
            s3Key: '',
            isLoading: true
        };
    }
    componentDidMount() {
        this.getPdfDetails();
    }
    componentDidUpdate(prevProps) {

    }
    toggleExpand = () => {
        this.setState((prevState) => ({
            expanded: !prevState.expanded
        }));

    };
    getPdfDetails = async (file) => {

        //if (file) {
        // const formData = new FormData();
        // formData.append('file', file);
        // const s3fileName = await this.s3Service.putObject(file.name, file);
        // await axios.get('http://13.59.144.105:9003/process_pdf/')
        //   .then(async response => {
        //     console.log(response.data);
        //     var byteCharacters = atob(response.data);
        //     // Convert byte array to blob
        //     var byteNumbers = new Array(byteCharacters.length);
        //     for (var i = 0; i < byteCharacters.length; i++) {
        //       byteNumbers[i] = byteCharacters.charCodeAt(i);
        //     }
        //     var byteArray = new Uint8Array(byteNumbers);
        //     var blob = new Blob([byteArray], { type: 'application/pdf' });

        //     // Create URL for the blob
        //     var url = URL.createObjectURL(blob);
        //     this.setState({ pdfUrl: url });
        //   });
        // const pdfUrlData = await this.s3Service.getObject("trial/annotated_pdf_data/20240227_141854.pdf");
        this.setState({ pdfUrl: "assets/20240223_1521241.pdf" });        
        this.setState({ isLoading: false });
        //}

    };
    render() {
        const { expanded } = this.state;

        return (
            <div className='container'>
                <div className="flex shrink-0 items-center">
                    <IconButton onClick={this.toggleExpand} aria-label="toggle sidebar" >
                        <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
                    </IconButton>
                    <h4 style={{ "padding": '10px' }}>Source Viewer</h4>
                </div>
                <div className={`animated-div ${expanded ? 'show' : 'hide'}`}>
                    {this.state.isLoading && <FuseLoading />}
                    <iframe
                        src="assets/20240223_1521241.pdf"
                        title="PDF Viewer"
                        width="90%"
                        height="500px"
                        style={{ marginTop: '4%', marginLeft: '3%' }}
                    />
                </div>
            </div>
        );
    }
}

