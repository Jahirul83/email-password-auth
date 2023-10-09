import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import Root from './components/Root/Root'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import HeroRegister from './components/HeroRegister/HeroRegister';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element: <Login/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/heroRegister",
        element: <HeroRegister></HeroRegister>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
