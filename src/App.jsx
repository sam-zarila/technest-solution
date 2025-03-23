import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, StarsCanvas } from "./components";
import Train from "./components/train";
import FrontEndCourse from "./courses/frontend/frontEndCourse";
import ShopCourse from "./shop/ShopCourse"; // Import the ShopCourse component

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
                <Train />
                <Feedbacks />
                <div className='relative z-0'>
                  <Contact />
                  <StarsCanvas />
                </div>
              </>
            }
          />

          {/* Route to FrontEndCourse Page */}
          <Route path="/courses/frontend" element={<FrontEndCourse />} />

          {/* Route to Course Shopping Page */}
          <Route path="/shop" element={<ShopCourse />} /> {/* Add this line for the shopping page */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
