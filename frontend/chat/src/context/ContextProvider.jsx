import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';



const StateContext = createContext({
  currentUser: null,
  token: null,
  refreshToken: null,
  cartCount: 0,
  cartTotal: 0,
  notification: null,
  setUser: () => { },
  setToken: () => { },
  setRefreshToken: () => { },
  setNotification: () => { },
  setCartCount: () => { },
  setCartTotal: () => { },
  appTheme: null,
  setAppTheme: () => { }
})

export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(JSON.parse(localStorage.getItem('USER')));
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [refreshToken, _setRefreshToken] = useState(localStorage.getItem('REFRESH_TOKEN'));
  const [notification, _setNotification] = useState('');
  const [appTheme, _setAppTheme] = useState(localStorage.getItem('THEME'));
  const [cartCount, _setCartCount] = useState(localStorage.getItem('CART_COUNT'));
  const [cartTotal, _setCartTotal] = useState(localStorage.getItem('CART_TOTAL'));

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);

    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }


  const setRefreshToken = (token) => {
    _setRefreshToken(token)
    if (token) {
      localStorage.setItem('REFRESH_TOKEN', token);

    } else {
      localStorage.removeItem('REFRESH_TOKEN');
    }
  }

  const setUser = (user) => {
    _setUser(user)
    if (user) {
      localStorage.setItem('USER', JSON.stringify(user, null, 2));

    } else {
      localStorage.removeItem('USER');
    }
  }

  const setNotification = message => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification('')
    }, 5000)
  }

  const setAppTheme = (appTheme) => {

    if (appTheme) {
      localStorage.setItem('THEME', appTheme);
      _setAppTheme(appTheme);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const setCartCount = (cartCount) => {
  
      _setCartCount(cartCount);

      if (cartCount) {
        localStorage.setItem('CART_COUNT', cartCount);
      }
    
  }

  const setCartTotal = (cartTotal) => {
      
    _setCartTotal(cartTotal);
    if (cartTotal) {
      localStorage.setItem('CART_TOTAL', cartTotal);
    }
  
}


  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      refreshToken,
      setToken,
      setRefreshToken,
      notification,
      setNotification,
      setAppTheme,
      appTheme,
      cartCount,
      cartTotal,
      setCartCount,
      setCartTotal
    }}>
      {children}
    </StateContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.object,
};

export const useStateContext = () => useContext(StateContext);
