import React from 'react';
import Elena from "../../assets/Elena.png";
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate=useNavigate()
    const handleNavigate=()=>{
        navigate(-1)
    }
  return (
    <div className="h-[100vh] flex justify-center items-center bg-[var(--secondary)]">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center max-w-2xl w-full md:m-0 m-2">
        <img
          src={Elena}
          alt="Elena Logo"
          className="w-25 h-auto mb-4"
        />
        <hr className="w-full border-t-2 border-gray-200 mb-10" />

       <p className="font-bold text-gray-400 mb-2 text-[4em]">404</p>

        <p className="text-gray-600 text-center mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
          <hr className="w-full border-t-2 border-gray-200 mb-4 mt-10" />
        <button
        onClick={handleNavigate}
          className="mt-2 px-4 py-2 bg-[var(--primary)] border-1 border-[var(--primary)] text-white rounded hover:bg-white hover:text-[var(--primary)] hover:border-1 hover:border-[var(--primary)] transition cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
