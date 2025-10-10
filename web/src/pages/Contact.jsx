import React, { useState, useEffect } from "react";

// SVG Arrow Icon
const ArrowIcon = () => (
  <svg
    width="48"
    height="16"
    viewBox="0 0 48 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 md:w-12"
  >
    <path d="M0 8H46" stroke="black" strokeWidth="2" />
    <path d="M39 1L46 8L39 15" stroke="black" strokeWidth="2" />
  </svg>
);

const Contact = () => {
  const formspreeUrl = import.meta.env.VITE_CONTACT_URL;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    try {
      const res = await fetch(formspreeUrl, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
        e.target.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:max-w-7xl mx-auto text-black font-sans antialiased">
      <div className="container mx-auto min-h-screen px-8 py-16 lg:py-24">

        {/* Header */}
        <header className="mb-8 md:mb-8 mt-12 mb:mt-0">
          <h1 className="text-7xl text-orange-400 sujoy md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter">
            Contact Us
          </h1>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          
          {/* Left Info Section */}
          <div className="flex flex-col justify-between space-y-8">
            <div>
              <p className="text-2xl md:text-3xl sujoy3 font-light leading-snug max-w-lg">
                Let's unlock together the next level of possibilities!
                <br />
                Reach out.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-md font-semibold uppercase tracking-widest text-gray-500 mb-2">
                  Social Media
                </h2>
                <p className="font-medium text-lg">
                  <a href="#" className="hover:text-orange-400 transition-opacity cursor-pointer">TWITTER</a> — 
                  <a href="#" className="hover:text-orange-400 transition-opacity cursor-pointer"> INSTAGRAM</a> — 
                  <a href="#" className="hover:text-orange-400 transition-opacity cursor-pointer"> GITHUB</a> — 
                  <a href="#" className="hover:text-orange-400 transition-opacity cursor-pointer"> FACEBOOK</a>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-md font-semibold uppercase tracking-widest text-gray-500 mb-2">
                    Get in touch
                  </h2>
                  <p className="font-medium text-lg hover:opacity-75 transition-opacity cursor-pointer">
                    <a href="mailto:revoxstudio.site@gmail.com">revoxstudio.site@gmail.com</a>
                  </p>
                </div>
                <div>
                  <h2 className="text-md font-semibold uppercase tracking-widest text-gray-500 mb-2">
                    Location
                  </h2>
                  <p className="font-medium text-lg">WEST BENGAL - INDIA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="w-full">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                  
                  {/* Name */}
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="peer h-10 w-full border-b-2 border-gray-300 text-black placeholder-transparent focus:outline-none focus:border-black bg-transparent"
                      placeholder="John Doe"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </div>

                  {/* Company */}
                  <div className="relative">
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-black placeholder-transparent focus:outline-none focus:border-black bg-transparent"
                      placeholder="Awesome Inc."
                    />
                    <label
                      htmlFor="company"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Company
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="peer h-10 w-full border-b-2 border-gray-300 text-black placeholder-transparent focus:outline-none focus:border-black bg-transparent"
                      placeholder="john.doe@example.com"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email
                    </label>
                  </div>

                  {/* Budget in ₹ */}
                  <div className="relative">
                    <div className="flex items-center border-b-2 border-gray-300 focus-within:border-black">
                      <span className="text-lg text-gray-500 pr-2">₹</span>
                      <input
                        id="budget"
                        name="budget"
                        type="number"
                        className="peer h-10 w-full text-black placeholder-transparent focus:outline-none bg-transparent"
                        placeholder="5000"
                      />
                    </div>
                    <label
                      htmlFor="budget"
                      className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all"
                    >
                      Budget
                    </label>
                  </div>

                  {/* Message */}
                  <div className="relative sm:col-span-2">
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      className="peer h-auto w-full border-b-2 border-gray-300 text-black placeholder-transparent focus:outline-none focus:border-black bg-transparent"
                      placeholder="Your message here..."
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Message
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-16 sm:mt-24">
                  <button
                    type="submit"
                    disabled={loading}
                    className="text-4xl md:text-5xl font-bold group flex items-center gap-4 transition-all duration-300 ease-in-out hover:gap-6 cursor-pointer disabled:opacity-50"
                  >
                    <span className="bg-left-bottom hover:text-orange-500 bg-gradient-to-r from-orange-400 to-orange-800 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      {loading ? "SENDING..." : "SUBMIT"}
                    </span>
                    <div className="transform transition-transform duration-300 group-hover:translate-x-3">
                      <ArrowIcon />
                    </div>
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-start justify-center h-full space-y-6 animate-fadeIn">
                <h2 className="text-6xl font-bold text-black sujoy">Thank You!</h2>
                <p className="text-lg sujoy3 text-gray-600 max-w-md">
                  Your message has been received. I’ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-base sujoy3 font-semibold border border-black px-5 py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contact;
