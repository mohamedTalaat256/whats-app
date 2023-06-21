import { Avatar, Box, Divider, Menu, MenuItem } from "@mui/material"
import { ContextProvider, useStateContext } from "../../../context/ContextProvider";
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import ListItemIcon from '@mui/material/ListItemIcon';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from "react-router-dom";
import { Logout, Settings } from "@mui/icons-material";
import appUrl from "../../../appUrl";
import imagesUrl from "../../../imagesUrl";

export default function PopupMenu({anchorEl, handleClose, onLogout}) {
  const { user, appTheme, setAppTheme } = useStateContext(ContextProvider);

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar src={imagesUrl + user.image} /> Profile
                </MenuItem>

                <Divider />
                <Box sx={{ display: { xs: '', md: 'none', lg: 'none' } }} >
                    {
                        appTheme === 'dark'
                            ?
                            <MenuItem onClick={() => { setAppTheme('light') }} >
                                <ListItemIcon>
                                    <LightModeIcon fontSize="small" />
                                </ListItemIcon>
                                light mode
                            </MenuItem>



                            :
                            <MenuItem onClick={() => { setAppTheme('dark') }} >
                                <ListItemIcon>
                                    <ModeNightIcon fontSize="small" />
                                </ListItemIcon>
                                dark mode
                            </MenuItem>

                    }

                </Box>
                <MenuItem to="/orders" component={Link}>
                    <ListItemIcon>
                        <ViewListIcon fontSize="small" />
                    </ListItemIcon>
                    my orders
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}