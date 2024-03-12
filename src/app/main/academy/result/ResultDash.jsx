import FusePageSimple from '@fuse/core/FusePageSimple';
import 'react-chatbot-kit/build/main.css'
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
function ResultDash() {
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
    const { data: course, isLoading } = useGetAcademyCourseQuery(
        { courseId },
        {
            skip: !courseId
        }
    );
    const [updateCourse] = useUpdateAcademyCourseMutation();
    useEffect(() => {
        /**
         * If the course is opened for the first time
         * Change ActiveStep to 1
         */
        if (course && course?.progress?.currentStep === 0) {
            updateCourse({ courseId, data: { progress: { currentStep: 1 } } });
        }
    }, [course]);
    useEffect(() => {
        setLeftSidebarOpen(!isMobile);
        setRightSidebarOpen(!isMobile);
    }, [isMobile]);
    const currentStep = course?.progress?.currentStep || 0;

    const handleClickInChild = () => {
        alert("");
        // Do something here...
    };

    function updateCurrentStep(index) {
        if (course && (index > course.totalSteps || index < 0)) {
            return;
        }

        updateCourse({ courseId, data: { progress: { currentStep: index } } });
    }
    function handleInputChange(e) {

        setInputValue(e.target.value);
    };
    function handleNext() {
        updateCurrentStep(currentStep + 1);
    }

    function handleBack() {
        updateCurrentStep(currentStep - 1);
    }

    function handleStepChange(index) {
        updateCurrentStep(index + 1);
    }
    function handleSubmit(e) {
        e.preventDefault();
        let value = inputValue.trim();
        let datahtml = '';
        if (value !== '') {
            if (value.includes("graph")) {

                const newHtmlData = '<div class="react-chatbot-kit-user-chat-message-container">' +
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
                setMessages(messages + newHtmlData);
            }

            else {
                if (childRef.current) {
                    childRef.current.handleChildClick(value);
                }
                const newHtmlData = '<div class="react-chatbot-kit-user-chat-message-container">' +
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
                setMessages(messages + newHtmlData);
            }
            setInputValue('');
        }
    };
    const activeStep = currentStep !== 0 ? currentStep : 1;

    if (isLoading) {
        return <FuseLoading />;
    }

    if (!course) {
        return <Error404Page />;
    }

    return (
        <FusePageSimple
            header={
                <CourseHeader
                    leftSidebarToggle={() => {
                        setLeftSidebarOpen(!leftSidebarOpen);
                    }}
                    rightSidebarToggle={() => {
                        setRightSidebarOpen(!rightSidebarOpen);
                    }}
                    course={course}
                    page="2"
                />
            }
            content={
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
                    variants={container}
                    initial="hidden"
                    animate="show">

                    <motion.div variants={item} className="sm:col-span-2 md:col-span-4" >
                        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                            <div className="flex flex-col sm:flex-row items-start justify-between">
                                <Graph ref={childRef} />
                            </div>
                        </Paper>
                    </motion.div>
                    <motion.div variants={item} className="sm:col-span-2 md:col-span-4" >
                        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                            <div className="flex flex-col sm:flex-row items-start justify-between">
                                <SourceViewer />
                            </div>
                        </Paper>
                    </motion.div>
                    <motion.div variants={item} className="sm:col-span-2 md:col-span-4" >
                        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                            <div className="flex flex-col sm:flex-row items-start justify-between">
                                <ResultContent course={course} />
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
                    <div className="p-4">
                        <Button
                           to={`/apps/academy/courses/${course.id}/${course.slug}`}
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
                            Back to Studies
                        </Button>

                    </div>
                    <Divider />
                    <div className="chat-box" style={{ padding: "10px" }}>
                        <div class="chatbot">
                            <div class="react-chatbot-kit-chat-container border"  >
                                <div class="react-chatbot-kit-chat-inner-container" >
                                    <div class="react-chatbot-kit-chat-header">Conversation with Nuve-bot</div>
                                    <div class="react-chatbot-kit-chat-message-container">
                                        <div class="react-chatbot-kit-chat-bot-message-container" >
                                            <div class="react-chatbot-kit-chat-bot-message" ><span>how may I help you</span></div>
                                        </div>
                                        <div class="react-chatbot-kit-chat-bot-message-container" >
                                            <div class="react-chatbot-kit-chat-bot-message" ><span>Please select a document from above graph to proceed</span></div>
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: messages }}></div>
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
                </>
            }
            scroll="content"
            ref={pageLayout}
        />
    );
}

export default ResultDash;
