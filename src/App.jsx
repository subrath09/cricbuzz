import React, { useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import Hero from "./components/Hero";
import Herobottom from "./components/Herobottom";
import Intro from "./components/Intro";
import Service from "./components/Service";
import Solutions from "./components/Solutions";
import Clients from "./components/Clients";
import Scroll from "./components/Scroll";
import Connect from "./components/Connect";
import Events from "./components/Events";
import Footer from "./components/Footer";
import Counter from "./practice/Counter";
import Number from "./practice/Number";
import Form from "./practice/Form";
import World from "./practice/World";
import ToDo from "./practice/ToDo";
import Shopping from "./practice/Shopping";
import Api from "./api/Api";
import Comments from "./api/Comments";
import Users from "./api/Users";
import Photos from "./api/Photos";
import Weather from "./api/Weather";
import Store from "./api/Store";
import StoreProduct from "./api/StoreProduct";
import { Route, Routes, useNavigate } from "react-router";
import FormApi from "./api/FormApi";
import FormUi from "./api/FormUi";
import Basic from "./animations/Basic";
import New from "./api/New";
import Dashboard from "./api/Dashboard";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import app from "./firebase";
import Firestore from "./api/Firestore"
import Userdata from "./api/Userdata";
import Admin from "./api/Admin";
import Adminlogin from "./api/Adminlogin";
import Productsform from "./api/Productsform";
import CricketApp from "./RealDb/CricketApp";
import Scores from "./RealDb/Scores";
import AdminCric from "./RealDb/AdminCric";
import CricBuzz from "./RealDb/CricBuzz";

function App() {
  // const auth = getAuth(app);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigate("/");
  //     } else {
  //       navigate("/admin");
  //     }
  //   });
  // }, []);

  return (
    <div>
            

        <Routes>
  <Route path="/" element={<AdminCric />} />
  <Route path="/cricbuzz" element={<CricBuzz />} />
</Routes>
 
        
      

        {/* <Routes>
      <Route path="/" element={<Adminlogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/add-product" element={<Productsform />} />
      <Route path="/edit-product/:id" element={<Productsform />} />
    </Routes> */}
     


   {/* <Routes>
       <Route path="/" element={<Firestore />} />
       <Route path="/users" element={<Userdata />} />
     </Routes> */}


      {/* <New/> */}
{/* 
      <Routes>
        <Route path="/" element={<FormApi />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<New />} />
      </Routes> */}

      {/* <Routes>
        <Route path="/" element={<Store/>}/>
        <Route path="/details" element={<StoreProduct/>}/>
       </Routes> */}

      {/* <Basic/> */}
      {/* <Weather/> */}
      {/* <Photos/> */}
      {/* <Users/> */}
      {/* <Comments/> */}
      {/* <Api /> */}
      {/* <Shopping/> */}
      {/* <ToDo/> */}
      {/* <World/> */}
      {/* <Number/>  */}
      {/* <Form/> */}
      {/* <Counter/> */}
      {/* <Hero />
      <Herobottom />
      <Intro />
      <Service />
      <Solutions />
      <Clients />
      <Connect />
      <Events />
      <Footer />  */}
    </div>
  );
}

export default App;
