import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./Components/Pages/Home"
import Signup from './Components/Pages/Signup'
import Listing from './Components/Pages/Users/Listing'
import Edit from './Components/Pages/Users/Edit'
import ResetPassword from './Components/Pages/ResetPassword'
import Profile from './Components/Pages/Profile'
import Aboutus from './Components/Cms/Aboutus'
import PrivateComponent from './Components/Pages/PrivateComponent'
import PrivacyPolicy from "./Components/Cms/PrivacyPolicy"
import TermsConditions from "./Components/Cms/TermsConditions"
import Contactus from './Components/Pages/Contactus'
import Categories from './Components/Categories/Categories'
import Editcategory from "./Components/Categories/Editcategory"
import Products from './Components/Products/Products'
import Addcategory from './Components/Categories/Addcategory'
import Editproduct from './Components/Products/Editproduct'
import Subcategory from './Components/Subcategory/Subcategory'
import Editsubcategory from './Components/Subcategory/Editsubcategory'
import Listsubcategory from './Components/Subcategory/Listsubcategory'
import Categorielist from './Components/Categories/Categorielist'
import Productlist from './Components/Products/Productlist'
import LineGraph from './Components/Pages/LineGraph'
import Addsubcategory from './Components/Subcategory/Addsubcategory'
import Addproduct from './Components/Products/Addproduct'
import Chat from "./Components/Pages/Chat"




function App() {
  return (
    <>


      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComponent />}>

            <Route path="/dashboard"  element={<Home />} />
            <Route path="/passwordreset/:id" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/line" element={<LineGraph/>}/>
            <Route path="/about" element={<Aboutus />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/terms&conditions" element={<TermsConditions />} />
            <Route path="/contactus" element={<Contactus />} />

            {/* // user // */}
            <Route path="/users/list" element={<Listing />} />
            <Route path="/users/edit/:id" element={<Edit />} />

            {/* // Category // */}
            <Route path="/categories/list" element={<Categories />} />
            <Route path='/categories/view/:id' element={<Categorielist/>}/>
            <Route path="/categories/add" element={<Addcategory />} />
            <Route path="/categories/editcategory/:id" element={<Editcategory />} />

            {/* // Products // */}
            <Route path="/products/list" element={<Products />} />
            <Route path='/products/view/:id' element={<Productlist/>} />
            <Route path="/products/editproduct/:id" element={<Editproduct />} />
            <Route path='/products/add' element={<Addproduct/>}/>

            {/* // Subcategory // */}
            <Route path="/subcategory/list" element={<Subcategory/>}/>
            <Route path="/subcategory/editsubcategory/:id" element={<Editsubcategory/>}/>
            <Route path="/subcategory/view/:id" element={<Listsubcategory/>}/>
            <Route path='/subcategory/add' element={<Addsubcategory/>}/>

          </Route>
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
