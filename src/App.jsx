import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, ProductDetailed, Purchases, User, Signup } from './pages/index'
import { Cart, Footer, Loader, NavBar, ProtectedRoutes } from './components'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {

  useEffect(() => {
    AOS.init();
  }, [])

  const isLoading = useSelector(state => state.isLoading)
  const isShowingCart = useSelector(state => state.isShowingCart)

  return (
    <HashRouter>
      <div className="App">
        {isLoading && <Loader />}
        <NavBar />
        {isShowingCart && <Cart />}
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/product/:productId' element={<ProductDetailed />}/>

          <Route element={<ProtectedRoutes />}>            
            <Route path='/purchases' element={<Purchases />} />
            <Route path='/user' element={<User />}/>
          </Route>
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
