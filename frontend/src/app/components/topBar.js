'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchUserDetails, fetchGoogleUserDetails } from "../utils/api";

export default function Topbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible); 
  };

   
useEffect(() => {
  const getUserData = async () => {
    try {
      // Check login method to determine which API to use
      const urlParams = new URLSearchParams(window.location.search);
      const fromOAuth = urlParams.get('from') === 'oauth';
      const isGoogleUser = localStorage.getItem('isGoogleUser') === 'true';
      
      let userData;
      if (fromOAuth || isGoogleUser) {
        // User logged in with Google - use session-based API
        console.log('Detected Google login, fetching Google user details');
        try {
          userData = await fetchGoogleUserDetails();
          console.log('Fetched Google user data:', userData);
          // Confirm Google user status
          localStorage.setItem('isGoogleUser', 'true');
        } catch (googleError) {
          console.log('Google user fetch failed, trying regular user fetch:', googleError.message);
          // If Google API fails, clear the Google flag and try regular API
          localStorage.removeItem('isGoogleUser');
          userData = await fetchUserDetails();
          console.log('Fetched regular user data after Google failure:', userData);
        }
      } else {
        // User logged in with email/password - use JWT token API
        console.log('Detected regular login, fetching user details with token');
        // Clear any existing Google user flag
        localStorage.removeItem('isGoogleUser');
        userData = await fetchUserDetails(); 
        console.log('Fetched regular user data:', userData);
      }
      
      setUser(userData);  
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Clear potentially invalid flags on error
      localStorage.removeItem('isGoogleUser');
      setUser({ name: "Anonymous", plan: "Free" });  
    }
  };

  getUserData();

  // Also listen for storage changes (when authToken is updated)
  const handleStorageChange = (e) => {
    if (e.key === 'authToken' && e.newValue) {
      console.log('Auth token updated, refetching user data');
      getUserData();
    }
    // Also listen for changes to Google user flag
    if (e.key === 'isGoogleUser') {
      console.log('Google user status changed, refetching user data');
      getUserData();
    }
  };

  window.addEventListener('storage', handleStorageChange);
  
  // Check if we just came from OAuth and refresh user data
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('from') === 'oauth') {
    setTimeout(() => getUserData(), 100); // Small delay to ensure session is set
  }

  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="relative flex items-center justify-between h-20 px-6 rounded-3xl shadow text-white">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg border border-white/20 rounded-3xl pointer-events-none" />

      <div className="relative z-10 flex items-center">
        <div className="flex flex-col items-center gap-1">
          <Image
            src="/images/topbar/logo.svg"
            alt="COMMENTS'USION Logo"
            width={200}
            height={40}
            className="block"
          />
          <div className="text-center text-[12px] italic leading-none">
            Comments with solution
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center space-x-6 text-sm">
        <span>Connected 0/0</span>
        <span>Creators 0/0</span>
        <span>Keywords 0/0</span>
      </div>

  
      <div className="relative z-10 flex items-center space-x-6">
      
        <div className="flex items-center space-x-2" onClick={handleDropdownToggle}>
          <div className="flex flex-col items-center gap-0">
            <span className="text-sm">{user ? user.name :"Anonymous"}</span>
            <span className="text-[12px]">{user ? user.plan : "Free"}</span>
          </div>
          <Image
            src="/images/topbar/userIcon.svg"
            alt="User Icon"
            width={30}
            height={30}
            className="block"
          />
        </div>

     
{dropdownVisible && (
  <div
    ref={dropdownRef}
    className="absolute right-0 mt-2 bg-[#33C6F4] text-white rounded-xl shadow-lg w-48 max-w-xs p-2 z-50"
    style={{ position: "absolute", top: "50px", right: "20px", zIndex: 10000 }}
  >
    <ul className="space-y-2">
      <li className="flex items-center space-x-2">
        <Image src="/images/topbar/settings.svg" 
        alt="Settings Icon" width={20} height={20} />
       
        <Link href="/settings" className="block py-2 px-4 hover:bg-transparent hover:bg-gray-800 transition">
          My Settings
        </Link>
      </li>
      <li className="flex items-center space-x-2">
        <Image src="/images/topbar/faqs.svg" alt="FAQ Icon" width={20} height={20} />
       
        <Link href="/#faq-section" className="block py-2 px-4 hover:bg-transparent hover:bg-gray-800 transition">
          FAQ’s
        </Link>
      </li>
      <li className="flex items-center space-x-2">
        <Image src="/images/topbar/community.svg" alt="Community Icon" width={20} height={20} />
        
        <Link href="/community" className="block py-2 px-4 hover:bg-transparent hover:bg-gray-800 transition">
          Community
        </Link>
      </li>
      <li className="flex items-center space-x-2">
        <Image src="/images/topbar/logout.svg" alt="Logout Icon" width={20} height={20} />
       
        <Link href="/signup-login" className=" block py-2 px-4 hover:bg-transparent hover:bg-gray-800 transition">
          Log out
        </Link>
      </li>

      <Link href="/plans">
  <button className="w-full mt-2 flex items-center justify-center px-0 py-1 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition">
    <img
      src="/images/sidebar/upgradeIcon.svg"
      alt="Upgrade"
      className="w-5 h-5 mr-2"
    />
    Upgrade plan
  </button>
</Link>
    </ul>
  </div>
)}
        
      </div>
    </header>
  );
}