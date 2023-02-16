import React, { useEffect } from 'react';
import styles from './App.module.css';
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage,PlaceOrderPage } from './pages'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector, useAppDispatch } from './redux/hooks'
import { getShoppingCart } from './redux/shoppingCart/slice'


const PrivateRoute = ({ children }) => {
  const jwt = useSelector(state => state.user.token)
  return jwt ? children : <Navigate to='/signIn' />
}

function App() {
  const jwt = useSelector(state => state.user.token)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  },[jwt])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signIn' element={<SignInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          {/* <Route path='/search/' element={<h1>暂时未找到相关路线，请输入关键词</h1>} /> */}
          <Route path='/search/:keywords?' element={<SearchPage />} />
          <Route path='/detail/:touristRouteId' element={<DetailPage />} />
          <Route
            path="/shoppingCart"
            element={
              <PrivateRoute>
                <ShoppingCartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/placeOrder"
            element={
              <PrivateRoute>
                <PlaceOrderPage />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<h1>404 not found 页面去火星了</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
