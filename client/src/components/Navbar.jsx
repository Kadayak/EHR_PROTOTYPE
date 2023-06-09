import React, { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, BellIcon, XIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import userImage from "../assets/userImage.png";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const mainNavItems = [
{ name: "Appointments", to: "/appointments", current: false },
{ name: "Calendar", to: "/calendar", current: false },
];

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [navItems, setNavItems] = useState(mainNavItems);
    
  function goToHome() {
    navigate("/");
  }

  useEffect(() => {
    updateNavigation();
  }, [user]);

  async function handleLogoutClick() {
    console.log("user logged out")

    await axios.delete("http://localhost:3001/api/auth/logout", 
    {
      data: {
        token: user.refreshToken
      },
    } )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })

    setUser(null);
    setNavItems(mainNavItems);
    navigate("/login");
  }

  function updateNavigation() {
    if (user && user.role === "doctor") {
      // Add the "Patients" option to navigation for doctors
      setNavItems([ // TODO Why not just do navigation.push()
      { name: "Patients", to: "/patients", current: false },
        ...navItems,
      ]);
      setActiveNavItem();
    }
  }

  function setActiveNavItem() {
    navItems.forEach((navItem) => {
      const updatedItem = navItems.find(
        (item) => item.name === navItem.name
      );
      if (updatedItem) {
        navItem.current = updatedItem.current;
      }
    });
  }

  return (
    <React.Fragment>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <button>
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src="favicon2.ico"
                        alt="EHR Solutions"
                        onClick={goToHome}
                      />
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src="favicon2.ico"
                        alt="EHR Solutions"
                        onClick={goToHome}
                      />
                    </button>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {user &&
                        navItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            className={`
                              ${
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                              }
                              px-3 py-2 rounded-md text-sm font-medium
                            `}
                          >
                            {item.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {user ? (
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={userImage}
                            alt="User Avatar"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } block px-4 py-2 text-sm text-gray-700`}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogoutClick}
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <button className="bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 rounded-full">
                      <Link to="/login">Log In</Link>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {user &&
                  navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={`
                        ${
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                        block px-3 py-2 text-base font-medium rounded-md
                      `}
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </React.Fragment>
  );
};

export default Navbar;