import { Navigate, Outlet } from 'react-router-dom';
import { ContextProvider, useStateContext } from '../../context/ContextProvider';


import AppNavBar from '../../components/appNavBar/AppNavBar';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const {token } = useStateContext(ContextProvider);
  if (!token) {
    return <Navigate to="/login" />
  }

  return (
   <>
    
    <AppNavBar />
    <Outlet/>
    
    <Box sx={{padding:10}}>
    </Box>

   </>
  );
}
