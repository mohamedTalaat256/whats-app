import { Box, Card, CardActions, CircularProgress, Container, Grid, ListItemIcon, ListItemText, MenuList, MenuItem, Typography, Divider, Avatar, Stack, IconButton, Badge } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContextProvider, useStateContext } from "../../context/ContextProvider";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Messages from "./components/Messages";
import { Helmet } from "react-helmet-async";
import axiosClient from "../../axios-client";
import useScreenType from "react-screentype-hook";
import { TransitionGroup } from 'react-transition-group';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { fetchUserChats } from "../../redux/services/chat.servise";
import imagesUrl from "../../imagesUrl";

const ChatsScreen = () => {
    const { user } = useStateContext(ContextProvider);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedUser, setSelectedUser] = useState({});
    const [messages, setMessages] = useState([]);


    const [checked, setChecked] = useState(false);
    const containerRef = useRef(null);
    const handleChange = () => setChecked((prev) => !prev);

    const screenType = useScreenType();

    const chats = useSelector((state) => state.chat.chats);
    const loading = useSelector((state) => state.chat.loading);
    const error = useSelector((state) => state.chat.error);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchUserChats(user.id));
    }, [dispatch]);








    function getUserInfo(secondPersonId) {
        axiosClient.get('/admin/users/' + secondPersonId).then((data) => {
            setSelectedUser(data.data.data);
        }).catch((err) => { console.log(err) });
    }

    const filteredChats = chats.filter((chat) => {
        return chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    function setUserMessages(secondPersonId) {
        getUserInfo(secondPersonId);
        axiosClient.get('/chats/chat_messages?userId=' + user.id + '&secondPersonId=' + secondPersonId).then((data) => {
            setMessages(data.data.data);
            setChecked(true);
            dispatch(fetchUserChats(user.id));

        }).catch((err) => { console.log(err) });
    }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const ChatsScreen = () => {
        return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ backgroundColor: '#128c7e', height:'90px',  p:3, width: '105%'}}>
                    <Box sx={{ paddingX: 2, backgroundColor:'background.default', borderRadius: 3, minWidth: '280px' }}>
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            onChange={handleSearch}
                            sx={{ flex: 1 }}
                            placeholder="Search Chat"
                            inputProps={{ 'aria-label': 'search Chat' }}
                        />

                    </Box>
                </Box>

                <Box sx={{ height: '600px', marginTop: 2, overflowY: 'scroll', }}>
                    {
                        loading
                            ?
                            <CircularProgress />
                            :
                            <MenuList sx={{ flexDirection: 'column-reverse' }}>
                                {
                                    filteredChats.map((chat) => {
                                        return (
                                            <MenuItem
                                                onClick={() => { setUserMessages(chat.id); }}
                                                key={chat.id}
                                                sx={{
                                                    paddingX: 2,
                                                    m: 2,
                                                    borderRadius: 2,
                                                    backgroundColor: selectedUser.id === chat.id ? '#CFCFCF69' : null
                                                }}>
                                                <ListItemIcon>
                                                    <Badge
                                                        overlap="circular"
                                                        color="primary"
                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                        badgeContent={chat.unread}
                                                    >
                                                        <Avatar src={imagesUrl + chat.image} sx={
                                                            { marginX: 2, width: '60px', height: '60px' }
                                                        } />
                                                    </Badge>
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Stack direction={'column'}>
                                                        <Typography variant="subtitle1" color="background.invert">
                                                            {chat.name}
                                                        </Typography>
                                                        <Typography alignSelf={'start'} variant="subtitle2" color="text.invert">
                                                            {chat.lastMessage}
                                                        </Typography>
                                                        <Typography alignSelf={'end'} variant="caption" color="text.invert">
                                                            {chat.lastMessageDate}
                                                        </Typography>
                                                    </Stack>
                                                </ListItemText>
                                            </MenuItem>
                                        )
                                    })
                                }
                            </MenuList>
                    }
                </Box>
            </Box>
        )
    }

    return (
        <>
            <Helmet>
                <title> Chats </title>
            </Helmet>
            <Box>
                <Container sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '53%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <Card elevation={1} >
                        <CardActions sx={{ backgroundColor: '#128c7e' }}>
                            {
                                screenType.isMobile ?
                                    <IconButton onClick={handleChange} >
                                        <ArrowBackIosNewIcon />
                                    </IconButton>
                                    :
                                    null
                            }

                            <Typography variant="h3" sx={{ m: 2 }} color={'#ffffff'} >Chats</Typography>

                        </CardActions>
                        {
                            screenType.isMobile
                                ?
                                <Box sx={{ width: '100%', height: '100%', }} ref={containerRef} >
                                    <TransitionGroup>
                                        {checked ? <Messages chatMessages={messages} secondUser={selectedUser} /> : <ChatsScreen />}
                                    </TransitionGroup>
                                </Box>
                                :
                                <Grid container spacing={1} columns={12}>
                                    <Grid item xs={12} xl={4} md={4} >
                                        <ChatsScreen />
                                        <Divider orientation="vertical" flexItem variant="middle" />
                                    </Grid>

                                    <Grid item xs={12} xl={8} md={8} >
                                        <Messages chatMessages={messages} secondUser={selectedUser} />
                                    </Grid>
                                </Grid>
                        }
                    </Card>
                </Container>
            </Box>
        </>
    )
}

export default ChatsScreen;