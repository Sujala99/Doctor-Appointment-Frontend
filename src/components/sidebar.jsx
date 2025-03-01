import React, { useState } from "react";
import { FiMenu, FiBell, FiLogOut, FiFileText } from "react-icons/fi";
import {
  MdOutlineDashboard,
  MdPersonAddAlt,
  MdLocalHospital,
  MdPerson,
} from "react-icons/md";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false);
  const [isDoctorDropdownOpen, setIsDoctorDropdownOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-purple-700 text-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="h-full p-4">
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <ul className="space-y-4">
            <li>
              <Link to="/admin">
                <button className="flex items-center p-3 w-full rounded-lg hover:bg-purple-600">
                  <MdOutlineDashboard className="text-2xl" />
                  <span className="ml-3">Dashboard</span>
                </button>
              </Link>
            </li>

            {/* Patient Dropdown */}
            <li>
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setIsPatientDropdownOpen(!isPatientDropdownOpen)}
                  className="flex items-center p-3 w-full rounded-lg hover:bg-purple-600"
                >
                  <MdLocalHospital className="text-2xl" />
                  <span className="ml-3 flex-1">Patient</span>
                  <FiMenu
                    className={`cursor-pointer text-lg transition-transform ${
                      isPatientDropdownOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {isPatientDropdownOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link to="/viewPatient">
                        <button className="flex items-center p-2 pl-6 w-full rounded-lg hover:bg-purple-500">
                          <MdPerson className="text-xl" />
                          <span className="ml-2">View Patients</span>
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/addPatient">
                        <button className="flex items-center p-2 pl-6 w-full rounded-lg hover:bg-purple-500">
                          <MdPersonAddAlt className="text-xl" />
                          <span className="ml-2">Add Patient</span>
                        </button>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>

            {/* Doctor Dropdown */}
            <li>
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setIsDoctorDropdownOpen(!isDoctorDropdownOpen)}
                  className="flex items-center p-3 w-full rounded-lg hover:bg-purple-600"
                >
                  <MdLocalHospital className="text-2xl" />
                  <span className="ml-3 flex-1">Doctor</span>
                  <FiMenu
                    className={`cursor-pointer text-lg transition-transform ${
                      isDoctorDropdownOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {isDoctorDropdownOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link to="/viewDoctor">
                        <button className="flex items-center p-2 pl-6 w-full rounded-lg hover:bg-purple-500">
                          <MdPerson className="text-xl" />
                          <span className="ml-2">View Doctors</span>
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/addDoctor">
                        <button className="flex items-center p-2 pl-6 w-full rounded-lg hover:bg-purple-500">
                          <MdPersonAddAlt className="text-xl" />
                          <span className="ml-2">Add Doctor</span>
                        </button>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>

            {/* Other Sidebar Items */}
            <li>
              <Link to="/blogpage">
                <button className="flex items-center p-3 w-full rounded-lg hover:bg-purple-600">
                  <FiFileText className="text-2xl" />
                  <span className="ml-3"> Blog</span>
                </button>
              </Link>
            </li>
            <li>
              <button className="flex items-center p-3 w-full rounded-lg hover:bg-purple-600">
                <FiBell className="text-2xl" />
                <span className="ml-3">Notification</span>
              </button>
            </li>
            <li>
              <Link to= "/logout">
              <button className="flex items-center p-3 w-full rounded-lg hover:bg-purple-600">
                <FiLogOut className="text-2xl" />
                <span className="ml-3">Logout</span>
              </button>
              </Link>
             
            </li>
          </ul>
        </div>
      </aside>

         </div>
  );
}

export default Sidebar;
