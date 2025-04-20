import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import ContentPopup from '../components/ContentPopup';
import MuteButton from '../components/MuteButton';
import { playButtonClickSound } from '../utils/sound';
import Wave from 'react-wavify';

const IndexPage = () => {
  const [activePopups, setActivePopups] = useState({
    about: false,
    links: false,
    work: false,
    contact: false
  });
  const [popupOrder, setPopupOrder] = useState({
    about: 0,
    links: 0,
    work: 0,
    contact: 0
  });
  const [buttonPositions, setButtonPositions] = useState({
    about: { x: 0, y: 0 },
    links: { x: 0, y: 0 },
    work: { x: 0, y: 0 },
    contact: { x: 0, y: 0 }
  });
  const [isMobile, setIsMobile] = useState(false);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleCardClick = (type) => {
    if (!activePopups[type]) {
      playButtonClickSound();
    }
    
    setActivePopups(prev => ({
      ...prev,
      [type]: true
    }));

    // Update the order for this popup
    setPopupOrder(prev => {
      const newOrder = { ...prev };
      const maxOrder = Math.max(...Object.values(newOrder));
      newOrder[type] = maxOrder + 1;
      return newOrder;
    });
    
    // Get the button position
    const button = document.getElementById(`${type}-button`);
    if (button) {
      const rect = button.getBoundingClientRect();
      
      // Set different positions for each card type
      let position = { x: 0, y: 0 };
      
      switch(type) {
        case 'about':
          position = {
            x: Math.max(20, rect.left - 150),
            y: Math.max(20, rect.top - 250)
          };
          break;
        case 'links':
          position = {
            x: Math.max(20, rect.left - 200),
            y: Math.max(20, rect.top - 50)
          };
          break;
        case 'work':
          position = {
            x: Math.max(20, rect.left - 50),
            y: Math.max(20, rect.top - 150)
          };
          break;
        case 'contact':
          position = {
            x: Math.max(20, rect.left - 200),
            y: Math.max(20, rect.top - 50)
          };
          break;
      }
      
      setButtonPositions(prev => ({
        ...prev,
        [type]: position
      }));
    }
  };

  const handleClose = (type) => {
    setActivePopups(prev => ({
      ...prev,
      [type]: false
    }));
    setPopupOrder(prev => ({
      ...prev,
      [type]: 0
    }));
  };

  const aboutContent = (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#222] dark:text-white">about me</h3>
      <p className="text-gray-600 dark:text-gray-300">
        i'm a passionate developer with expertise in web technologies and a keen eye for design. 
        with years of experience in creating beautiful and functional websites, i specialize in 
        modern web development practices and user-centered design.
      </p>
      <div className="mt-4">
          <h4 className="text-lg font-semibold text-[#222] dark:text-gray-200">skills</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">react</span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">javascript</span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">gatsby</span>
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm">tailwind css</span>
        </div>
      </div>
    </div>
  );

  const workContent = (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#222] dark:text-white">my work</h3>
      <p className="text-gray-600 dark:text-gray-300">
        here are some of my recent projects that showcase my skills and expertise.
      </p>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="text-lg font-semibold text-[#222] dark:text-white">project one</h4>
          <p className="text-gray-600 dark:text-gray-300 mt-2">a modern e-commerce platform built with react and node.js</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="text-lg font-semibold text-[#222] dark:text-white">project two</h4>
          <p className="text-gray-600 dark:text-gray-300 mt-2">a responsive portfolio website using gatsby and tailwind css</p>
        </div>
      </div>
    </div>
  );

  const contactContent = (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#222] dark:text-white">contact me</h3>
      <p className="text-gray-600 dark:text-gray-300">
        feel free to reach out for collaborations or just a friendly hello!
      </p>
      <div className="mt-4 space-y-3">
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-[#222] dark:text-gray-300">email@example.com</span>
        </div>
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-[#222] dark:text-gray-300">+1 (123) 456-7890</span>
        </div>
      </div>
    </div>
  );

  const linksContent = (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#222] dark:text-white">links</h3>
      <p className="text-gray-600 dark:text-gray-300">
        connect with me on various platforms and explore my work.
      </p>
      <div className="mt-4">
          <h4 className="text-lg font-semibold text-[#222] dark:text-gray-200">quick links</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">github</span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">linkedin</span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">twitter</span>
        </div>
      </div>
    </div>
  );

  // Content for mobile view
  const renderMobileContent = (type) => {
    switch(type) {
      case 'about':
        return aboutContent;
      case 'work':
        return workContent;
      case 'contact':
        return contactContent;
      case 'links':
        return linksContent;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Wave Background */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2">
          <Wave
            fill='#3b82f6'
            paused={false}
            options={{
              height: 20,
              amplitude: 30,
              speed: 0.15,
              points: 3
            }}
            className="absolute bottom-0 left-0 right-0 opacity-20"
          />
          <Wave
            fill='#2563eb'
            paused={false}
            options={{
              height: 20,
              amplitude: 20,
              speed: 0.2,
              points: 2
            }}
            className="absolute bottom-0 left-0 right-0 opacity-15"
          />
          <Wave
            fill='#1d4ed8'
            paused={false}
            options={{
              height: 20,
              amplitude: 15,
              speed: 0.25,
              points: 2
            }}
            className="absolute bottom-0 left-0 right-0 opacity-10"
          />
        </div>

        {/* Header with Sound Button */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-gray-50 dark:bg-gray-900 z-50">
          <div className="w-full px-4 h-full flex items-center justify-start max-w-none mx-0">
            <MuteButton />
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-16 relative z-10">
          {/* Hero Section */}
          <div className="flex justify-center items-center h-screen">
            {/* Home Container */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-96 border-2 border-gray-300 dark:border-gray-600">
            <div className="bg-blue-600 p-2 rounded-t-lg">
              <h2 className="text-white font-bold text-base text-left">
                home
              </h2>
            </div>
            <div className="px-4 pt-4 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                hi! <span className="text-blue-600">i'm ari</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300">website developer, data analyst, finance</p>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-full w-full sm:w-96 md:w-[40rem] mx-auto">
              {/* About Logo */}
              <div 
                ref={aboutRef}
                className={`flex justify-center items-center cursor-pointer`}
                onClick={() => handleCardClick('about')}
                id="about-button"
              >
                <a href="#" className="block w-28 h-28">
                  <img
                    src="/path/to/about-logo.png"
                    alt="About Logo"
                    className="w-full h-full object-contain"
                  />
                </a>
              </div>
                {/* Links Logo */}
                <div 
                  className={`flex justify-center items-center cursor-pointer`}
                  onClick={() => handleCardClick('links')}
                  id="links-button"
                >
                  <a href="#" className="block w-20 h-20">
                    <img
                      src="/path/to/links-logo.png"
                      alt="Links Logo"
                      className="w-full h-full object-contain"
                    />
                  </a>
                </div>
                {/* Work Logo */}
                <div 
                  ref={workRef}
                  className={`flex justify-center items-center cursor-pointer`}
                  onClick={() => handleCardClick('work')}
                  id="work-button"
                >
                  <a href="#" className="block w-20 h-20">
                    <img
                      src="/path/to/work-logo.png"
                      alt="Work Logo"
                      className="w-full h-full object-contain"
                    />
                  </a>
                </div>
                {/* Contact Logo */}
                <div 
                  ref={contactRef}
                  className={`flex justify-center items-center cursor-pointer`}
                  onClick={() => handleCardClick('contact')}
                  id="contact-button"
                >
                  <a href="#" className="block w-20 h-20">
                    <img
                      src="/path/to/contact-logo.png"
                      alt="Contact Logo"
                      className="w-full h-full object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Popups */}
          <>
            {/* Links Popup */}
            {activePopups.links && (
              <ContentPopup
                title="links"
                content={linksContent}
                isOpen={activePopups.links}
                onClose={() => handleClose('links')}
                buttonPosition={buttonPositions.links}
                zIndex={popupOrder.links}
              />
            )}
            {/* About Popup */}
            {activePopups.about && (
              <ContentPopup
                title="about me"
                content={aboutContent}
                isOpen={activePopups.about}
                onClose={() => handleClose('about')}
                buttonPosition={buttonPositions.about}
                zIndex={popupOrder.about}
              />
            )}
            {/* Work Popup */}
            {activePopups.work && (
              <ContentPopup
                title="my work"
                content={workContent}
                isOpen={activePopups.work}
                onClose={() => handleClose('work')}
                buttonPosition={buttonPositions.work}
                zIndex={popupOrder.work}
              />
            )}
            {/* Contact Popup */}
            {activePopups.contact && (
              <ContentPopup
                title="contact information"
                content={contactContent}
                isOpen={activePopups.contact}
                onClose={() => handleClose('contact')}
                buttonPosition={buttonPositions.contact}
                zIndex={popupOrder.contact}
              />
            )}
          </>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
