"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";

const Sidebar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside className="bg-gray-800 text-white w-64 h-screen p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Aplikasi Chat</h2>
      <ul className="flex-grow">
        {" "}
        {/* Tambahkan flex-grow di sini */}
        <li className="mb-2">
          <Link
            href="#"
            className="hover:bg-gray-700 px-4 py-2 rounded-md block"
          >
            Chat
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="#"
            className="hover:bg-gray-700 px-4 py-2 rounded-md block"
          >
            Profil
          </Link>
        </li>
      </ul>
      {/* Pindahkan menu pengaturan ke bawah */}
      <li className="relative">
        <button
          onClick={toggleDropdown}
          className="hover:bg-gray-700 px-4 py-2 rounded-md block w-full text-left flex items-center"
        >
          <FiSettings className="mr-2" />
          Pengaturan
          <svg
            className={`h-4 w-4 ml-auto transition-transform transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <ul
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } absolute left-0 bottom-12 w-full bg-gray-700 rounded-md shadow-lg`}
        >
          {/* Item menu di sini */}

          <li>
            <Link
              href="#"
              className="hover:bg-gray-600 px-4 py-2 block whitespace-no-wrap"
            >
              Opsi 1
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:bg-gray-600 px-4 py-2 block whitespace-no-wrap"
            >
              Opsi 2
            </Link>
          </li>
        </ul>
      </li>
    </aside>
  );
};

export default Sidebar;
