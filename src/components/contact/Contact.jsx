import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { MdEmail, MdPhone } from 'react-icons/md';

const Contact = () => {
  const form = useRef();

  const [inputs, setInputs] = useState({
    from_name: '',
    user_email: '',
    message: ''
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_k2h3ymh',
        'template_98hu6yk',
        form.current,
        'maSj09WtzQgLjTT8_'
      )
      .then(
        (result) => {
          console.log(result.text);
          setInputs({ from_name: '', user_email: '', message: '' });
          form.current.reset();
          toast.success("Email sent successfully");
        },
        (error) => {
          console.log(error.text);
          toast.error("Failed to send email. Please try again later.");
        }
      );
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  return (
    <section className="bg-white border-t text-gray-800 py-12 h-screen" id="contact">
      <Toaster />
      <div className="container mx-auto px-6 py-12 flex flex-col justify-center h-full">
        <h2 className={`text-4xl mb-8 ${isMobile ? 'text-center' : 'text-left'}`}>
          Contact Me
        </h2>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-2/5">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="flex flex-col gap-5"
            >
              <input
                type="text"
                name="from_name"
                value={inputs.from_name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="border border-gray-500 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
              <input
                type="email"
                name="user_email"
                value={inputs.user_email}
                onChange={handleChange}
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                placeholder="Email Id"
                required
                className="border border-gray-500 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
              <textarea
                name="message"
                value={inputs.message}
                onChange={handleChange}
                placeholder="Message"
                className="border border-gray-500 p-3 rounded-lg h-32 resize-none focus:outline-none focus:ring-1 focus:ring-gray-800"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-gray-800 w-40 text-white py-3 px-6 rounded-lg shadow hover:bg-gray-900 transition duration-300 hover:-translate-y-2"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="w-full md:w-3/5 flex flex-col gap-5">
            <div className="flex items-center gap-2 hover:underline hover:text-lg">
              <MdEmail className="text-gray-900" style={{ fontSize: 24 }} />
              <a href="mailto:arshalanquasain.01@gmail.com" className="font-medium text-gray-900">
                arshalanquasain.01@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 hover:underline hover:text-lg">
              <MdPhone className="text-gray-900" style={{ fontSize: 24 }} />
              <a href="tel:+91 8290718156" className="font-medium text-gray-900">
                +91 8290718156
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
