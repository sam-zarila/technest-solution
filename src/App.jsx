// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, StarsCanvas, Works } from "./components";
// import Train from "./components/Train";
// import FrontEndCourse from "./courses/frontend/frontEndCourse";
// import ShopCourse from "./shop/ShopCourse";
// import TeamPage from "./components/Team";
// import BackendCourse from "./courses/Backend/BackendCourse";
// import PackagesPage from "./components/packages";
// import ContactUs from "./contact/ContactUs";
// import BackendhoppingPage from "./shop/backend/ShopBackendCourse";
// import FullstackCourse from "./courses/fullstack/FullStackCourse";
// import FlutterCourse from "./courses/flutter/FlutterCourse";
// import JavaCourse from "./courses/java/JavaCourse";
// import TrainingCourse from "./courses/training/Training";
// import FullstackShoppingPage from "./shop/fullstack/ShopFullStack";
// import FlutterShoppingPage from "./shop/flutter/ShopFlutter";
// import VideoSection from "./components/video";
// import ForSale from "./components/ForSale";


// // Import your registration component
// import StudentCourseRegistrationForm from "./components/Registration/register";
// import PaymentPage from "../virtuals/spotify/spotifyPayment";
// import ChatgptPaymentPage from "../virtuals/chatgpt/chatgptpayents";
// import ApplemusicPaymentPage from "../virtuals/applemusic/applemusicpayment";
// import NetflixPaymentPage from "../virtuals/netflix/netflixpayment";
// import PaymentSuccess from "../virtuals/paymentsuccess/PaymentSuccess";
// import AdderalpayementPage from "../virtuals/adderall/adderallpayments";
// import AdderalPaymentSuccess from "../virtuals/adderalpaymentsucess/adderalpaymentsucess";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className="relative z-0 bg-primary">
//         {/* Navbar is shown on all pages */}
//         <Navbar />

//         <Routes>
//           {/* Default Route */}
//           <Route 
//             path="/" 
//             element={
//               <>
//                 <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
//                   <Hero />
//                 </div>
//                 <ForSale/>
//                 <About />
//                 <Experience />
                
//                 <PackagesPage />
//                 <Works />
//                 <VideoSection />
//                 <Train />
//                 <Feedbacks />
//                 <TeamPage />
//                 <div className="relative z-0">
//                   <Contact />
//                   <StarsCanvas />
//                 </div>
//               </>
//             }
//           />

//           {/* Registration Route */}
//           <Route path="/registration" element={<StudentCourseRegistrationForm />} />

//           {/* Other Routes */}
//           <Route path="/courses/frontend" element={<FrontEndCourse />} />
//           <Route path="/courses/Backend" element={<BackendCourse />} />
//           <Route path="/courses/fullstack" element={<FullstackCourse />} />
//           <Route path="/courses/flutter" element={<FlutterCourse />} />
//           <Route path="/courses/java" element={<JavaCourse />} />
//           <Route path="/courses/training" element={<TrainingCourse />} />
//           <Route path="/contact" element={<ContactUs />} />
//           <Route path="/shop" element={<ShopCourse />} /> 
//           <Route path="/shop/backend" element={<BackendhoppingPage />} /> 
//           <Route path="/shop/fullstack" element={<BackendhoppingPage />} /> 
//           <Route path="/shop/flutter" element={<FlutterShoppingPage />} />
//           <Route path="/virtuals/spotify" element={<PaymentPage />} />
//           <Route path="/virtuals/chatgpt" element={<ChatgptPaymentPage />} />
//           <Route path="/virtuals/applemusic" element={<ApplemusicPaymentPage />} />
//           <Route path="/virtuals/netflix" element={<NetflixPaymentPage />} />
//           <Route path="/virtuals/paymentsuccess" element={<PaymentSuccess />} />
//           <Route path="/virtuals/adderall" element={<AdderalpayementPage />} />
//           <Route path="/virtuals/paymentsuccess" element={<AdderalPaymentSuccess />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, StarsCanvas, Works } from "./components";
import Train from "./components/Train";
import FrontEndCourse from "./courses/frontend/frontEndCourse";
import ShopCourse from "./shop/ShopCourse";
import TeamPage from "./components/Team";
import BackendCourse from "./courses/Backend/BackendCourse";
import PackagesPage from "./components/packages";
import ContactUs from "./contact/ContactUs";
import BackendShoppingPage from "./shop/backend/ShopBackendCourse";
import FullstackCourse from "./courses/fullstack/FullStackCourse";
import FlutterCourse from "./courses/flutter/FlutterCourse";
import JavaCourse from "./courses/java/JavaCourse";
import TrainingCourse from "./courses/training/Training";
import FullstackShoppingPage from "./shop/fullstack/ShopFullStack";
import FlutterShoppingPage from "./shop/flutter/ShopFlutter";
import VideoSection from "./components/video";
import ForSale from "./components/ForSale";

// Registration and payment components
import StudentCourseRegistrationForm from "./components/Registration/register";
import PaymentPage from "./virtuals/spotify/spotifyPayment";
import ChatgptPaymentPage from "./virtuals/chatgpt/chatgptpayents";
import ApplemusicPaymentPage from "./virtuals/applemusic/applemusicpayment";
import NetflixPaymentPage from "./virtuals/netflix/netflixpayment";
import PaymentSuccess from "./virtuals/paymentsuccess/PaymentSuccess";
import AdderalpayementPage from "./virtuals/adderall/adderallpayments";
import AdderalPaymentSuccess from "./virtuals/adderalpaymentsucess/adderalpaymentsucess";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* Navbar is shown on all pages */}
        <Navbar />

        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                  <Hero />
                </div>
                <ForSale />
                <About />
                <Experience />
                <PackagesPage />
                <Works />
                <VideoSection />
                <Train />
                <Feedbacks />
                <TeamPage />
                <div className="relative z-0">
                  <Contact />
                  <StarsCanvas />
                </div>
              </>
            }
          />

          {/* Registration Route */}
          <Route path="/registration" element={<StudentCourseRegistrationForm />} />

          {/* Course Routes */}
          <Route path="/courses/frontend" element={<FrontEndCourse />} />
          <Route path="/courses/Backend" element={<BackendCourse />} />
          <Route path="/courses/fullstack" element={<FullstackCourse />} />
          <Route path="/courses/flutter" element={<FlutterCourse />} />
          <Route path="/courses/java" element={<JavaCourse />} />
          <Route path="/courses/training" element={<TrainingCourse />} />

          {/* Shop Routes */}
          <Route path="/shop" element={<ShopCourse />} />
          <Route path="/shop/backend" element={<BackendShoppingPage />} />
          <Route path="/shop/fullstack" element={<FullstackShoppingPage />} />
          <Route path="/shop/flutter" element={<FlutterShoppingPage />} />

          {/* Payment Form Routes */}
          <Route path="/virtuals/spotify" element={<PaymentPage />} />
          <Route path="/virtuals/chatgpt" element={<ChatgptPaymentPage />} />
          <Route path="/virtuals/applemusic" element={<ApplemusicPaymentPage />} />
          <Route path="/virtuals/netflix" element={<NetflixPaymentPage />} />
          <Route path="/virtuals/adderall" element={<AdderalpayementPage />} />

          {/* Success Pages */}
          <Route path="/virtuals/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/virtuals/adderalpaymentsucess" element={<AdderalPaymentSuccess />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
