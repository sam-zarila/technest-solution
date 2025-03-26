import React from "react";

const VideoSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 px-6 bg-gray-500">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-6">
        Explore Our <span className="text-[#915EFF]">Web Training School</span>
      </h2>
      <p className="text-lg text-gray-900 text-center max-w-3xl mb-10">
        Learn the latest web technologies and frameworks with hands-on training from experts.  
        Build real-world projects and accelerate your career in web development.
      </p>

      {/* Video Wrapper */}
      <div className="w-full max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black">
          <video
            className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl"
            controls
            autoPlay
            muted
            loop
          >
            <source src="/video/Video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
