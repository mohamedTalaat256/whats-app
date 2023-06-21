import { Avatar, Box, CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import imagesUrl from "../../../imagesUrl";

export default function UserHeader({ secondUser }) {
    return (
        <Box
        sx={{
            backgroundColor:'#128c7e',
            paddingBottom:1,
            height:'90px',
            color:'#ffffff'
        }}>
            <CardHeader
                avatar={
                    <Avatar
                     src={imagesUrl+ secondUser.image} sx={
                        { width: '55px', height: '55px', backgroundColor: 'background.paper' }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={secondUser.fullName}
                subheader={secondUser.status ? 'online' : 'online'}
            />
            
        </Box>
    )
}