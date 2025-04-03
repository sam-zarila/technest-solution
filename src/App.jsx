import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, StarsCanvas, Works } from "./components";
import Train from "./components/Train";
import FrontEndCourse from "./courses/frontend/frontEndCourse";
import ShopCourse from "./shop/ShopCourse"; // Import the ShopCourse component
import TeamPage from "./components/Team";
import BackendCourse from "./courses/Backend/BackendCourse";
import PackagesPage from "./components/packages";
import ContactUs from "./contact/ContactUs";
import BackendhoppingPage from "./shop/backend/ShopBackendCourse";
import FullstackCourse from "./courses/fullstack/FullStackCourse";
import FlutterCourse from "./courses/flutter/FlutterCourse";
import JavaCourse from "./courses/java/JavaCourse";
import TrainingCourse from "./courses/training/Training";
import FullstackShoppingPage from "./shop/fullstack/ShopFullStack";
import FlutterShoppingPage from "./shop/flutter/ShopFlutter";
import VideoSection from "./components/video";
import ForSale from "./components/ForSale";




const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        {/* Navbar is shown on all pages */}
        <Navbar />

        <Routes>
          {/* Default Route to Train Page */}
          <Route 
            path="/" 
            element={
              <>
                <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                  <Hero />
                </div>
                <About />
                <Experience />
                <ForSale/>
                <PackagesPage />
                <Works />
                <VideoSection />
             
                <Train />
            
                <Feedbacks />
            
              {/* Add the carousel here */}
                <TeamPage />
                
                <div className='relative z-0'>
                  <Contact />
                  <StarsCanvas />
                </div>
              </>
            }
          />

          {/* Route to FrontEndCourse Page */}
          <Route path="/courses/frontend" element={<FrontEndCourse />} />
          <Route path="/courses/Backend" element={<BackendCourse />} />
          <Route path="/courses/fullstack" element={<FullstackCourse />} />
          <Route path="/courses/flutter" element={< FlutterCourse />} />
          <Route path="/courses/java" element={< JavaCourse />} />
          <Route path="/courses/training" element={< TrainingCourse />} />

          <Route path="/contact" element={<ContactUs />} />

          {/* Route to Course Shopping Page */}
          <Route path="/shop" element={<ShopCourse />} /> 
          <Route path="/shop/backend" element={<BackendhoppingPage />} /> 
          <Route path="/shop/fullstack" element={<BackendhoppingPage />} /> 
          <Route path="/shop/flutter" element={<FlutterShoppingPage />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
