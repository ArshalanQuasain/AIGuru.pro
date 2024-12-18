import { useEffect, useState } from "react";

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Call it initially
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Dynamically load the script for embedding the HubSpot form
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "47638375",
          formId: "05d0a25e-3ff4-435b-b0f3-1f0bf5ad4897",
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script if the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="bg-white border-t text-gray-800 py-12 h-screen" id="contact">
      <div className="container mx-auto px-6 py-12 flex flex-col justify-center h-full">
        <h2 className={`text-4xl mb-8 ${isMobile ? 'text-center' : 'text-left'}`}>
          Contact Me
        </h2>
        {/* Placeholder for the embedded form */}
        <div id="hs-form" className="w-full"></div>
      </div>
    </section>
  );
};

export default Contact;
