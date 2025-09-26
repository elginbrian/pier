"use client";

import React, { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = "" }) => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchValue);
  };

  return (
    <nav className={`w-full bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between" style={{ minHeight: 64 }}>
          <div className="flex-shrink-0">
            <img src="/logo-pelindo.png" alt="Pelindo Logo" className="h-8 w-auto" />
          </div>

          <div className="flex-1 max-w-xl mx-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search your report history here..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-3 py-2 pr-10 rounded-full border border-transparent bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          <div className="hidden md:block">
            <div className="ml-6 flex items-baseline space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 px-2 py-1 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-2 py-1 text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-2 py-1 text-sm font-medium transition-colors">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-2 py-1 text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="ml-4 flex items-center gap-3">
            {!user ? (
              <Button variant="primary" size="sm" onClick={() => router.push("/auth/login")}>
                Login
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
                  Dashboard
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={async () => {
                    try {
                      await signOut();
                      router.replace("/");
                    } catch (e) {
                      console.error("Logout failed", e);
                    }
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
