import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Check if the user is authenticated before rendering
  if (!authState.token) {
    return <div>Loading...</div>;  // Or redirect to login page if token is null
  }

  return (
    <div className='h-screen w-screen flex flex-col gap-10 justify-center items-center bg-gradient-to-b from-[#000f0e]/95 via-[#011d1d]/95 to-[#06b7b4]/95'>
      <h1 className='text-5xl text-white font-bold font-poppins'>Hello, {authState.user?.username}</h1>
      <button
        onClick={handleLogout}
        className='bg-[#06b7b4] text-white px-5 py-2 rounded-md'
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
