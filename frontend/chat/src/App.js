import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Router from './routes';
import ThemeProvider from './theme';
import { ContextProvider } from './context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
      <ContextProvider >
        <HelmetProvider>
          <BrowserRouter>
            <ThemeProvider >
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </HelmetProvider>
      </ContextProvider>
      <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />

    </>
  );
}

export default App;
