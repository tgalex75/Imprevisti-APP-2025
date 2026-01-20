import React, { useState } from "react";

const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  //const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const menuItems = [
    { label: "Home", submenu: [] },
    { label: "Deutsch", submenu: ["Ûber Mich", "Standorte", "Kontact"] },
    { label: "Italiano", submenu: ["Chi sono", "Sedi", "Contatti"] },
    { label: "English", submenu: ["About me", "Headquarters", "Contacts"] },
  ];

  return (
    <nav className="bg-[#800020] shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / Titolo (opzionale) */}
        <div className="text-lg font-bold text-gray-300">Logo</div>

        {/* Hamburger Menu (allineato a destra) */}
        <button
          onClick={toggleMenu}
          className="p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menu Mobile (esplode verso destra) */}
      <div
        className={`fixed right-0 top-0 z-20 h-full w-64 bg-[#800020] shadow-lg transition-transform duration-300 ease-in-out md:h-1/2 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <div className="p-4">
          <button
            onClick={toggleMenu}
            className="mb-4 p-2"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index} className="relative">
                <button
                  onClick={() => toggleSubmenu(index)}
                  className="flex w-full justify-between px-4 py-2 hover:bg-gray-200/10"
                >
                  {item.label}
                  {item.submenu.length > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform ${
                        openSubmenu === index ? "rotate-90" : "rotate-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </button>

                {/* Submenu Mobile */}
                <ul
                  className={`pl-4 transition-opacity duration-200 ease-in-out ${
                    openSubmenu === index
                      ? "opacity-100"
                      : "h-0 overflow-hidden opacity-0"
                  }`}
                >
                  {item.submenu.map((sub, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-50/10"
                      >
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;
