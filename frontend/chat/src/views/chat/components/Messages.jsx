import { Box, CardActions, CardContent, CircularProgress, Divider, IconButton, InputBase, Typography, } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { Send } from "@mui/icons-material";
import ReactFileReader from "react-file-reader";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ContextProvider, useStateContext } from "../../../context/ContextProvider";
import axiosClient from "../../../axios-client";
import { toast } from 'react-toastify';
import ChatMessageItem from "./MessageItem";
import UserHeader from "./UserHeader";
import DefaultHeader from "./DefaultHeader";
import { useDispatch } from "react-redux";
import { fetchUserChats } from "../../../redux/services/chat.servise";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;

export default function Messages({ chatMessages, secondUser }) {

    
    const [messages, setMessages] = useState(chatMessages);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);
    const [images, setImages] = useState([]);
    const { user, appTheme } = useStateContext(ContextProvider);
    const [sending, setSending] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setMessages(chatMessages);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        connect();
    }, [chatMessages]);



    function getConversationMessages() {
        axiosClient.get('/chats/chat_messages?userId=' + user.id + '&secondPersonId=' + secondUser.id).then((data) => {
            setMessages(data.data.data);
          
            dispatch(fetchUserChats(user.id));

        }).catch((err) => { console.log(err) });
    }



    const notify = (message) => toast(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        stompClient.subscribe('/user/'+user.id+'/private', 
        

        //on receive message
        (payload)=>{
            const newMessage = JSON.parse(payload.body);
        
            if(messages.length<2){
                getConversationMessages();
            }
            setMessages([newMessage, ...messages]);

            var senderId = newMessage.senderId;
            dispatch(fetchUserChats(user.id));

            
/* 
            if(senderId !== secondUser.id){
                notify(newMessage.message);
            } */
        });
    }


    const onError = (err) => {
        console.log(err);
    }





    const sendMessage = () => {
        setSending(true);
        const payload = {
            senderId: user.id,
            receiverId: secondUser.id,
            message: message,
            images: images
        };

        axiosClient.post('/chats/send', payload).then((data) => {
            if (data.data.success) {

                const newMessage = data.data.data;
                setMessages([newMessage, ...messages]);
                setMessage('');
                setImages([]);
                setSending(false);
                stompClient.send("/app/private-message", {}, JSON.stringify( newMessage));

                dispatch(fetchUserChats(user.id));

            }
        }).catch((err) => { console.log(err); setSending(false); });
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const handleFiles = (files) => {
        setImages(files.base64);
    };


    const dates = new Set();
    const renderDate = (dateNum) => {
        dates.add(dateNum);
        return (
            <Box elevation={2} sx={{ width: 'fit-content', margin: 'auto', p: 1, backgroundColor:'#dcf8c6', borderRadius:3 }} justifyContent="center" >
              <Typography sx={{ p: 1, }} color={'text.secondary'} variant="caption"> {dateNum }</Typography>
            </Box>)
    };


    return (
        <>
            <Box sx={{ width: '100%',   }}>

                {secondUser.id ?
                    <UserHeader secondUser={secondUser} />
                    :
                    <DefaultHeader />
                }

                {secondUser.id ?
                
                <CardContent sx={{
                    

                    backgroundImage: appTheme === 'light' ? `url(../assets/chat_black.png)` : `url(../assets/chat.png)` ,
                    marginX: 0,
                    overflowY: 'auto', height: '530px', display: 'flex',
                    flexDirection: 'column-reverse',
                }}>
                    <div ref={messagesEndRef} style={{ margin: '10px' }} />
                    {
                        messages.map((message) => {
                            const chatDate = message.createdDate.substring(0, 7);

                            return (
                                <Fragment key={message.id}>
                                    {dates.has(chatDate) ? null : renderDate(chatDate)}
                                    <ChatMessageItem key={message.id} messageItem={message} />
                                </Fragment >
                            )
                        })
                    }

                </CardContent>
                :
                <Box sx={{
                    justifyContent:'center',
                    alignItems: 'center',
                    height: '530px', display: 'flex',
                }}>
                    <Typography variant="h4" alignSelf={'center'}>
                        select chat to start conversation
                    </Typography>

                </Box>
                }






                <Divider orientation="horizontal" flexItem />
                {
                    images.map((img) => {
                        return (
                            <img key={img} src={img} height={'200px'} alt={"message".img} />
                        )
                    })
                }


                {secondUser.id ?
                    <CardActions>
                        <ReactFileReader multipleFiles fileTypes={[".png", ".jpg"]} base64 handleFiles={handleFiles} >
                            <IconButton variant="contained" ><AddAPhotoIcon /> </IconButton>
                        </ReactFileReader>

                        <Box sx={{ paddingX: 2, width: '100%', backgroundColor: 'background.default', borderRadius: 3, m: 1 }}>
                            <InputBase
                                onChange={(e) => { setMessage(e.target.value) }}
                                value={message}
                                sx={{ ml: 1, flex: 1, width: '100%', height: '40px', }}
                                placeholder="Type in here…"
                                inputProps={{ 'aria-label': 'search Chat' }}
                            />
                        </Box>

                        {
                            sending
                                ?
                                <IconButton ><CircularProgress /></IconButton>
                                :
                                <IconButton onClick={sendMessage} ><Send /></IconButton>
                        }
                    </CardActions>
                    :
                    null
                }
            </Box>

        </>
    )
}