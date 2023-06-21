import { Box, Card, Typography } from "@mui/material";
import { ContextProvider, useStateContext } from "../../../context/ContextProvider";


export default function ChatMessageItem({ messageItem }) {
    const { user } = useStateContext(ContextProvider);
    const date = new Date(messageItem.createdDate);
    const timeString = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });

    return (
            <Box  display="flex" sx={{ my: 1, }} justifyContent={messageItem.senderId === Number(user.id) ? "flex-end" : "flex-start"}>
                <Card elevation={1} sx={{ maxWidth: 1 / 2, backgroundColor: messageItem.senderId === Number(user.id) ? '#dcf8c6' : '#ece5dd' }}>
                    <Box >
                        <Typography sx={{ p: 1 }} color={'text.secondary'} variant="subtitle2">{messageItem.message}</Typography>
                        <Typography sx={{ p: 1,  fontStyle: 'italic' }} color={'text.secondary'} variant="caption"> {timeString }</Typography>

                    </Box>
                </Card>
            </Box>
    )
}