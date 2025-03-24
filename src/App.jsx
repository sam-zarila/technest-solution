import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, StarsCanvas, Works } from "./components";
import Train from "./components/Train";
import FrontEndCourse from "./courses/frontend/frontEndCourse";
import ShopCourse from "./shop/ShopCourse"; // Import the ShopCourse component
import TeamPage from "./components/Team";
import BackendCourse from "./courses/Backend/BackendCourse";
import PackagesPage from "./components/packages";

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
                <Tech />
                <Works />
                <Train />
                <Feedbacks />
                <TeamPage />
                <PackagesPage />
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

          {/* Route to Course Shopping Page */}
          <Route path="/shop" element={<ShopCourse />} /> {/* Add this line for the shopping page */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
