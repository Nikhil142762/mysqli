import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Includes/Navbar'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Dashborad from './Components/Pages/Dashborad'
import Add from './Components/Pages/Add'
import AddUser from './Components/Pages/AddUser'
import User from "./Components/Pages/User"
function App(props) {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/nav' element={<Navbar/>}/>
      <Route path='/users' element={<User/>}/>
      <Route path='/add' element={ <AddUser/>}/>
    </Routes>
      </BrowserRouter>
      

      {/* <Navbar/>
      <div className="col-md-12" style={{display:"flex"}}>
      <Dashborad property={{content:"Some quick example text to build on the card title and make up the bulk of the card's content.", imageUrl:"https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW58ZW58MHx8MHx8fDA%3D"}} />
      <Dashborad property={{content:"Some quick example text to build on the card title and make up the bulk of the card's content.", imageUrl:"https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW58ZW58MHx8MHx8fDA%3D"}} />
      <Dashborad property={{content:"Some quick example text to build on the card title and make up the bulk of the card's content.", imageUrl:"https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW58ZW58MHx8MHx8fDA%3D"}} />
      </div> */}
    </>
  )
}

export default App
