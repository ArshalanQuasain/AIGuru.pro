import React, { useEffect } from 'react';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the page loads
  }, []);  

  useEffect(() => {
    // Only add the HubSpot form script once when component is loaded
    if (!document.querySelector('#hubspotForm > iframe')) {
      const script = document.createElement('script');
      script.src = "//js.hsforms.net/forms/embed/v2.js";
      script.charset = "utf-8";
      script.type = "text/javascript";
      script.onload = () => {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "47638375",
          formId: "0edfb5a6-1b23-4220-b4bc-7904a82b7fb8",
          target: "#hubspotForm"
        });
      };

      document.body.appendChild(script);
      
      return () => {
        // Cleanup by removing the script when component is unmounted
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="flex flex-col justify-center w-full m-2 items-center min-h-screen bg-gray-100 py-10 font-sans">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Contact Us</h1>
      <div id="hubspotForm" className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out"></div>
    </div>
  );
};

export default ContactUs;