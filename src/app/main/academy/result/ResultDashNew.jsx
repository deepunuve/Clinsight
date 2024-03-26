import FusePageSimple from '@fuse/core/FusePageSimple';
import 'react-chatbot-kit/build/main.css';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { Step, StepContent, StepLabel } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FuseLoading from '@fuse/core/FuseLoading';
import CourseInfo from '../CourseInfo';
import CourseProgress from '../CourseProgress';
import Error404Page from '../../404/Error404Page';
import { useGetAcademyCourseQuery, useUpdateAcademyCourseMutation } from '../AcademyApi';
import Graph from '../graph/Graph';
import ResultHeader from '../result/ResultHeader';
import { motion } from 'framer-motion';
import CourseHeader from '../course/CourseHeader';
import InputBase from '@mui/material/InputBase';
import SourceViewer from '../doc/SourceViewer';
import { height } from '@mui/system';
import ResultContent from './ResultContent';
import { getStudyDetails } from '../../../store/apiServices';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GraphNew from '../graph/GraphNew';
import { tr } from 'date-fns/locale';
import ResultContentSummary from './ResultContentSummary';
import Loader from './../loader';
import { postContentData, getResultDetails } from '../../../store/apiServices';


const container = {
    show: {
        transition: {
            staggerChildren: 0.04
        }
    }
};
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};
/**
 * The Course page.
 */
function ResultDashNew(props) {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const theme = useTheme();
    const pageLayout = useRef(null);
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState('');
    const routeParams = useParams();
    const { courseId } = routeParams;
    const childRef = React.createRef();
    const [study, setStudy] = useState(null);
    const [studyCount, setStudyCount] = useState(0);
    const [tabValue, setTabValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGraph, setIsLoadingGraph] = useState(false);
    const [dataUpdate, setDataUpdate] = useState('');
    const [dataSumUpdate, setDataSumUpdate] = useState('');
    const [node, setNode] = useState('');
    const messagesEndRef = useRef(null);
    // const { data } = state;
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    function handleChangeTab(event, value) {
        setTabValue(value);
    }
    let chatData = null;
    useEffect(() => {
        
        setLeftSidebarOpen(!isMobile);
        setRightSidebarOpen(!isMobile);
        const storedSessionData = sessionStorage.getItem('sessionData');
        chatData = sessionStorage.getItem('chatData');
        if (storedSessionData) {
            let sData = JSON.parse(storedSessionData);
            setStudy(sData);
            setStudyCount(sData.source.length);
            setMessages(chatData);
        }

    }, [isMobile, study]);

    function handleInputChange(e) {

        setInputValue(e.target.value);
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };
    const graphClick = (childValue) => {
        const newHtmlData = '<div class="react-chatbot-kit-chat-bot-message-container" >' +
            '<div class="react-chatbot-kit-chat-bot-message" ><span>Clicked node <span class="bold-italic">"' + childValue[0].source_name + '"</span> is loaded here. Now you can explore based on this .</span></div>' +
            '</div>';
        setNode(childValue[0].source_name);
        if (messages) {
            setMessages(messages + newHtmlData);
            sessionStorage.setItem('chatData', messages + newHtmlData);
        }
        else {
            setMessages(newHtmlData);
            sessionStorage.setItem('chatData', newHtmlData);
        }
    };

    async function handleSubmit(e) {
        setIsLoadingGraph(true);
        e.preventDefault();
        let value = inputValue.trim().toLowerCase();
        let datahtml = '';
        if (value !== '') {
            let newHtmlData = '';
            const postData = {
                node: node,
                query: value
            };
            if (value.includes("summarize")) {
                setDataSumUpdate(postData);
                setTabValue(0);
                newHtmlData = '<div class="react-chatbot-kit-user-chat-message-container">' +
                    '<div class="react-chatbot-kit-user-chat-message">' + value +
                    '<div class="react-chatbot-kit-user-chat-message-arrow"></div>' +
                    '</div>' +
                    '<div class="react-chatbot-kit-user-avatar">' +
                    '<div class="react-chatbot-kit-user-avatar-container">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="react-chatbot-kit-user-avatar-icon">' +
                    '<path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path>' +
                    '</svg>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            else {
                if (childRef.current) {
                    childRef.current.handleChildClick(value);
                }
                newHtmlData = '<div class="react-chatbot-kit-user-chat-message-container">' +
                    '<div class="react-chatbot-kit-user-chat-message">' + value +
                    '<div class="react-chatbot-kit-user-chat-message-arrow"></div>' +
                    '</div>' +
                    '<div class="react-chatbot-kit-user-avatar">' +
                    '<div class="react-chatbot-kit-user-avatar-container">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="react-chatbot-kit-user-avatar-icon">' +
                    '<path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path>' +
                    '</svg>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

            }

            await getResultDetails(postData).
                then(response => {
                    newHtmlData = newHtmlData + '<div class="react-chatbot-kit-chat-bot-message-container" >' +
                        '<div class="react-chatbot-kit-chat-bot-message" ><span>' + response.answer + '</span></div>' +
                        '</div>';
                });

            if (messages) {
                setMessages(messages + newHtmlData);
                sessionStorage.setItem('chatData', messages + newHtmlData);
            }
            else {
                setMessages(newHtmlData);
                sessionStorage.setItem('chatData', newHtmlData);
            }
            setIsLoadingGraph(false);
            setInputValue('');
        }
    };


    if (isLoading) {
        return <FuseLoading />;
    }

    if (!study) {
        return <FuseLoading />;
    }
    return (
        <FusePageSimple

            content={
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
                    variants={container}
                    initial="hidden"
                    animate="show">

                    <motion.div variants={item} className="sm:col-span-2 md:col-span-4 lg:col-span-2" >
                        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                            <div className="flex flex-col sm:flex-row items-start justify-between">
                                <div className="chat-box" style={{ padding: "10px" }} >
                                    <div class="chatbot" >
                                        <div class="react-chatbot-kit-chat-container border"  >
                                            <div class="react-chatbot-kit-chat-inner-container" >
                                                <div class="react-chatbot-kit-chat-header">Conversation with Nuve-bot</div>
                                                <div class="react-chatbot-kit-chat-message-container">
                                                    <div class="react-chatbot-kit-chat-bot-message-container" >
                                                        <div class="react-chatbot-kit-chat-bot-message" ><span>how may I help you</span></div>
                                                    </div>
                                                    {/* <div class="react-chatbot-kit-chat-bot-message-container" >
                                                        <div class="react-chatbot-kit-chat-bot-message" ><span>Please select a node from the graph to proceed.</span></div>
                                                    </div> */}
                                                   
                                                    <div dangerouslySetInnerHTML={{ __html: messages }}></div>
                                                    {isLoadingGraph && <Loader />}
                                                    <div ref={messagesEndRef}></div>
                                                </div>

                                                <div class="react-chatbot-kit-chat-input-container">
                                                    <form class="react-chatbot-kit-chat-input-form" >
                                                        <input class="react-chatbot-kit-chat-input" value={inputValue} onChange={handleInputChange} />
                                                        <button class="react-chatbot-kit-chat-btn-send" fdprocessedid="zbcfao" onClick={handleSubmit}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="react-chatbot-kit-chat-btn-send-icon">
                                                                <path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path>
                                                            </svg>
                                                        </button>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </motion.div>

                    <motion.div variants={item} className="sm:col-span-2 md:col-span-4 lg:col-span-2" >
                        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden" style={{ height: '520px', 'overflow-y': 'auto' }}>
                            <div className="flex flex-col sm:flex-row items-start justify-between" >
                                <GraphNew data={study} ref={childRef} onClick={graphClick} />
                            </div>
                        </Paper>
                    </motion.div>
                    <motion.div variants={item} className="sm:col-span-2 md:col-span-4" >
                        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                            <div className="flex flex-col sm:flex-row items-start justify-between">
                                <div className="w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
                                    <Tabs
                                        value={tabValue}
                                        onChange={handleChangeTab}
                                        indicatorColor="secondary"
                                        textColor="inherit"
                                        variant="scrollable"
                                        scrollButtons={false}
                                        className="w-full px-24 -mx-4 min-h-40"
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

                                        <Tab
                                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                            disableRipple
                                            label="Summarize"
                                        />
                                        <Tab
                                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                            disableRipple
                                            label="Extract"
                                        />
                                    </Tabs>
                                    {tabValue === 0 && <ResultContentSummary course={study} data={dataSumUpdate} />}
                                    {tabValue === 1 && <div></div>}
                                </div>

                            </div>
                        </Paper>
                    </motion.div>
                </motion.div>

            }
            leftSidebarOpen={leftSidebarOpen}
            leftSidebarOnClose={() => {
                setLeftSidebarOpen(false);
            }}
            leftSidebarWidth={300}
            leftSidebarContent={
                <>
                    <div className="p-32">
                        <Button
                            to={`/TA/clinical/${study.id}`}
                            component={Link}
                            className="mb-24"
                            color="secondary"
                            variant="text"
                            startIcon={
                                <FuseSvgIcon size={20}>
                                    {theme.direction === 'ltr'
                                        ? 'heroicons-outline:arrow-sm-left'
                                        : 'heroicons-outline:arrow-sm-right'}
                                </FuseSvgIcon>
                            }
                        >
                            Back to study
                        </Button>
                        <Button
                            to={`/TA/sourceView/${study.id}`}
                            component={Link}
                            style={{ background: 'none', "margin-top": '-10%' }}
                            variant="contained"
                            endIcon={<FuseSvgIcon size={20}>heroicons-solid:folder-open</FuseSvgIcon>}
                        >
                        </Button>
                        <Divider />
                        <CourseInfo course={study} />
                    </div>
                    <Divider />
                    <Stepper
                        classes={{ root: 'p-32' }}
                        activeStep={studyCount}
                        orientation="vertical"
                    >
                        {study.source && (
                            study.source.map((source, index) => {
                                return (
                                    <Step
                                        key={index}
                                        sx={{
                                            '& .MuiStepLabel-root, & .MuiStepContent-root': {
                                                cursor: 'pointer!important'
                                            },
                                            '& .MuiStepContent-root': {
                                                color: 'text.secondary',
                                                fontSize: 13
                                            }
                                        }}
                                        // onClick={() => handleStepChange(step.order)}
                                        expanded
                                    >
                                        <StepLabel
                                            className="font-medium"
                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    color: 'background.default',
                                                    '& .MuiStepIcon-text': {
                                                        fill: (_theme) => _theme.palette.text.secondary
                                                    },
                                                    '&.Mui-completed': {
                                                        color: 'secondary.main',
                                                        '& .MuiStepIcon-text ': {
                                                            fill: (_theme) => _theme.palette.secondary.contrastText
                                                        }
                                                    },
                                                    '&.Mui-active': {
                                                        color: 'secondary.main',
                                                        '& .MuiStepIcon-text ': {
                                                            fill: (_theme) => _theme.palette.secondary.contrastText
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            {source.source_name}
                                        </StepLabel>
                                        {/* <StepContent>{step.subtitle}</StepContent> */}
                                    </Step>
                                );
                            }))
                        }
                    </Stepper>
                </>
            }
            scroll="content"
            ref={pageLayout}
        />
    );
}

export default ResultDashNew;
