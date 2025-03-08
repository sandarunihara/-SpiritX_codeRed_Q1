import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [ripples, setRipples] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const newRipple = {
      id: `${Date.now()}-${Math.random()}`,
      x: clientX,
      y: clientY,
    };

    setRipples((prev) => {
      const updatedRipples = [...prev, newRipple].slice(-3);
      return updatedRipples;
    });

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 1200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (name === "username" && value.trim() === "") {
      newErrors.username = "Username is required.";
    } else {
      newErrors.username = "";
    }

    if (name === "password" && value.trim() === "") {
      newErrors.password = "Password is required.";
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      setErrors({
        username: loginData.username ? "" : "Username is required.",
        password: loginData.password ? "" : "Password is required.",
      });
      return;
    }

    const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });
    const responseData = await response.json();
    console.log(responseData);
    if(responseData.success){
        toast.success("Login successful");
        login(responseData.token, responseData.user);
        navigate("/home");
    }
    
    if (!responseData.success) {
      setErrors({ ...errors, password: "Incorrect Username or password." });
      return;
    }

    // // If login is successful
     };

  
  return (
    <div className="flex justify-between items-center h-screen bg-white">
      <div className="flex flex-col justify-center items-center gap-10 bg-white w-1/2 h-screen">
        <div className="flex flex-col gap-5">
          <h1 className="text-center text-3xl text-[#4A4A4A] font-bold font-poppins">
            Login
          </h1>
          <div className="flex flex-col gap-8 w-[400px]">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                className="border-2 border-[#494949] rounded-xl pr-28 pl-5 focus:border-green-500 focus:outline-none focus:ring-0"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username}</span>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    className="w-full border-2 border-[#494949] rounded-xl pr-10 pl-5 focus:border-green-500 focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {passwordVisible ? (
                      <FaEyeSlash className="w-6 h-6" />
                    ) : (
                      <FaEye className="w-6 h-6" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            
          </div>
          <button
            onClick={handleSubmit}
            className="bg-[#06B7B4] font-poppins font-semibold border-white border-[2px] text-white py-3 px-10 rounded-xl hover:bg-[#069694] w-full transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </div>
      <div
        className="relative flex flex-col justify-center items-center gap-10 bg-gradient-to-b from-[#000f0e]/95 via-[#011d1d]/95 to-[#06b7b4]/95 rounded-tl-[50px] w-1/2 h-screen overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute w-[180px] h-[180px] rounded-full bg-[#06b7b4]/20 blur-3xl animate-ripple pointer-events-none"
            style={{
              top: ripple.y - 90,
              left: ripple.x - 90,
            }}
          />
        ))}

        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-5xl text-white font-bold font-poppins">
            Welcome Back!
          </h1>
          <p className="text-white font-poppins text-lg w-[320px] text-center">
            To keep connected with us please login with your personal info
          </p>
        </div>
        <button onClick={()=>navigate("/signup")} className="bg-transparent w-fit font-poppins font-semibold border-white border-[2px] text-white py-3 px-10 rounded-[50px] hover:bg-green-100 hover:text-black transition-all duration-300">
          <a >Sign Up</a>
        </button>
      </div>
    </div>
  );
};

export default Login;
