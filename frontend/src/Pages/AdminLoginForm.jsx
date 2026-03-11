import { CircleUserRound, Mail, Lock } from "lucide-react";
import googleLogo from "../assets/google-logo.webp";
import React from "react";
import authWithFirebase from "../../../backend/src/database&auth/authentication.js";

const AdminLoginPage = () => {
  const [instituteName, setInstituteName] = React.useState("");
  const [adminName, setAdminName] = React.useState("");

  async function loginFnc() {
    console.log("login button is clicked");
    authWithFirebase.loginGoogle();
  }

  async function signupFnc() {
    console.log("signup button is clicked");
    if (instituteName.length == 0 || adminName == 0) {
      alert("Please fill all the required field");
      return;
    }
    const user = await authWithFirebase.loginGoogle();
    console.warn(`this is from admin ui page ${user}`);

    const personalInfo = {
      instituteName: instituteName,
      adminName: adminName,
    };
    let existingUser;
    if(user != null){
        existingUser = authWithFirebase.weatherExists(user);
    }

    if (user != null && !existingUser) {
      const token = await user.getIdToken();
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/signup-withgoogle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              role: 'admin',
              personalInfo: personalInfo,
            }),
          },
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Signup failed");
        }
        console.log("Signup Success:", result.message);
        return result;
      } catch (error) {
        console.error("API Call Error:", error.message);
        alert(`Error: ${error.message}`);
        return null;
      }
    }else{
      alert('You already have an account,So login please');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdfbfb]">
      <div className="w-full max-w-[420px] bg-white border border-red-50/50 shadow-[0_8px_30px_rgb(239,68,68,0.05)] rounded-[2rem] p-8 sm:p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-red-50/60 rounded-full p-4 mb-4">
            <CircleUserRound className="text-[#ef4444] w-9 h-9 stroke-[1.5]" />
          </div>
          <h1 className="text-[1.7rem] font-medium text-[#474c5d] mb-2">
            Admin Login
          </h1>
          <span className="text-[#848a9b] text-[14px]">
            Online Attendance System
          </span>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-[15px] font-semibold text-[#545a6b] mb-2">
              Institutes Name
            </label>
            <div className="flex items-center px-4 py-3 border border-gray-200 rounded-xl focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all">
              <Mail className="w-[1.1rem] h-[1.1rem] text-[#ef4444] mr-3 shrink-0 stroke-[2]" />
              <input
                type="text"
                placeholder="Institutes Name"
                onChange={(e) => setInstituteName(e.target.value)}
                className="w-full bg-transparent outline-none text-[#545a6b] placeholder-[#a0aab8] text-[15px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[15px] font-semibold text-[#545a6b] mb-2">
              Admin name
            </label>
            <div className="flex items-center px-4 py-3 border border-gray-200 rounded-xl focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all">
              <Lock className="w-[1.1rem] h-[1.1rem] text-[#ef4444] mr-3 shrink-0 stroke-[2]" />
              <input
                type="password"
                placeholder="Admin name"
                className="w-full bg-transparent outline-none text-[#545a6b] tracking-wider placeholder-[#a0aab8] text-[15px]"
                onChange={(e) => setAdminName(e.target.value)}
              />
            </div>
            <p className="text-left text-[13px] text-[#9ca3af] mt-2 font-medium">
              Must be at least 6 characters
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              className="w-full bg-[#ef4444] hover:bg-[#e63e3e] text-white font-medium py-3.5 rounded-xl transition-all shadow-sm shadow-red-200 text-[15px]"
              onClick={signupFnc}
            >
              Create Account with Google
            </button>
          </div>

          {/* <div className="text-right">
                        <a href="#" className="inline-block text-[14px] text-[#9ca3af] hover:text-gray-600 transition-colors font-medium">
                            Forgot password?
                        </a>
                    </div> */}

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-[14px] text-[#9ca3af] font-medium">
              Already have an account? Log in
            </span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div>
            <button
              type="button"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-xl transition-all shadow-sm shadow-gray-200 text-[15px] flex items-center justify-center"
              onClick={loginFnc}
            >
              <img
                src={googleLogo}
                alt="Google Logo"
                className="w-10 h-10 mr-3"
              />
              login in with Google
            </button>
          </div>
        </form>

        <div className="mt-5 text-center">
          <a
            href="/"
            className="inline-block text-[15px] text-[#9ca3af] hover:text-gray-600 transition-colors font-medium"
          >
            Back to Role Selection
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
