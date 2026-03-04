import { User, Mail, Lock, IdCard, Building2, ChevronDown } from "lucide-react";
import googleLogo from "../assets/google-logo.webp";
import React from "react";
import DB from '../../../backend/src/database&auth/RTDBstruct'
import authWithFirebase from '../../../backend/src/database&auth/authentication';

const SignupForm = ({userRole,Identification,Task}) => {
    
    const [name, setName] = React.useState("");
    const [employeeId,setEmployeeId] = React.useState("");

    async function signupFnc(){
        console.log("signup button is clicked");
        if(name.length == 0 || employeeId == 0){
            alert('Please fill all the required field');
            return;
        }
        const user = await authWithFirebase.loginGoogle();
        console.warn(`this is from ui page ${user}`);
        
        if(user != null){
            DB.saveUserToRTDB(user);
        }
    }

    async function loginFnc(){
        console.log("login button is clicked");
        authWithFirebase.loginGoogle();
    }


    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdfbfb] p-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                Sign up as {userRole}
            </h1>

            <div className="w-full max-w-[440px] bg-white border border-red-50/50 shadow-[0_8px_30px_rgb(239,68,68,0.06)] rounded-2xl p-6 sm:p-8">
                <form className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="block text-[14px] font-semibold text-[#545a6b] mb-1.5">
                            Full Name
                        </label>
                        <div className="flex items-center px-4 py-2.5 border border-gray-200 rounded-xl focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all">
                            <User className="w-4 h-4 text-[#ef4444] mr-3 shrink-0 stroke-[2]" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full bg-transparent outline-none text-[#545a6b] placeholder-[#a0aab8] text-[14px]"
                                onChange = {(e)=>setName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Email Address */}
                    {/* <div>
                        <label className="block text-[14px] font-semibold text-[#545a6b] mb-1.5">
                            Email Address
                        </label>
                        <div className="flex items-center px-4 py-2.5 border border-gray-200 rounded-xl focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all">
                            <Mail className="w-4 h-4 text-[#ef4444] mr-3 shrink-0 stroke-[2]" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent outline-none text-[#545a6b] placeholder-[#a0aab8] text-[14px]"
                            />
                        </div>
                    </div> */}

                    {/* Password */}
                    {/* <div>
                        <label className="block text-[14px] font-semibold text-[#545a6b] mb-1.5">
                            Password
                        </label>
                        <div className="flex items-center px-4 py-2.5 border border-gray-200 rounded-xl focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all">
                            <Lock className="w-4 h-4 text-[#ef4444] mr-3 shrink-0 stroke-[2]" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-transparent outline-none text-[#545a6b] tracking-wider placeholder-[#a0aab8] text-[14px]"
                            />
                        </div>
                        <p className="text-[12px] text-[#9ca3af] mt-1.5 font-medium px-1">
                            Must be at least 6 characters
                        </p>
                    </div> */}

                    {/* Identification (Employee ID / Roll No) */}
                    <div>
                        <label className="block text-[14px] font-semibold text-[#545a6b] mb-1.5">
                            {Identification}
                        </label>
                        <div className="flex items-center px-4 py-2.5 border border-gray-200 rounded-xl focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all">
                            <IdCard className="w-4 h-4 text-[#ef4444] mr-3 shrink-0 stroke-[2]" />
                            <input
                                type="text"
                                placeholder={Identification}
                                className="w-full bg-transparent outline-none text-[#545a6b] placeholder-[#a0aab8] text-[14px]"
                                onChange={(e)=>setEmployeeId(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Department and Subject/Semester Row */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Department */}
                        {/* <div>
                            <label className="block text-[14px] font-semibold text-[#545a6b] mb-1.5">
                                Department
                            </label>
                            <div className="relative flex items-center border border-gray-200 rounded-xl focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all bg-white">
                                <span className="absolute left-4 z-10">
                                    <Building2 className="w-4 h-4 text-[#ef4444] shrink-0 stroke-[2]" />
                                </span>
                                <select
                                    className="w-full appearance-none bg-transparent outline-none text-[#545a6b] text-[14px] pl-11 pr-10 py-2.5 cursor-pointer"
                                    defaultValue=""
                                >
                                    <option value="" disabled hidden>Department</option>
                                    <option value="CS">Computer Science</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="ECE">Electronics</option>
                                </select>
                                <span className="absolute right-4 pointer-events-none text-[#a0aab8]">
                                    <ChevronDown className="w-4 h-4 stroke-[2]" />
                                </span>
                            </div>
                        </div> */}

                        {/* Subject / Semester */}
                        {/* { <div>
                            <label className="block text-[14px] font-semibold text-[#545a6b] mb-1.5">
                                {Task}
                            </label>
                            <div className="relative flex items-center border border-gray-200 rounded-xl focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all bg-white">
                                <select
                                    className="w-full appearance-none bg-transparent outline-none text-[#545a6b] text-[14px] pl-4 pr-10 py-2.5 cursor-pointer"
                                    defaultValue=""
                                >
                                    <option value="" disabled hidden>Select {Task}</option>
                                    <option value="S1">Programming</option>
                                    <option value="S2">Networking</option>
                                    <option value="S3">Database</option>
                                </select>
                                <span className="absolute right-4 pointer-events-none text-[#a0aab8]">
                                    <ChevronDown className="w-4 h-4 stroke-[2]" />
                                </span>
                            </div>
                        </div>} */}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="button"
                            className="w-full bg-[#ef4444] hover:bg-[#e63e3e] text-white font-medium py-3 rounded-xl transition-all shadow-md shadow-red-200 text-[15px]"
                            onClick={signupFnc}
                        >
                            Create Account with Google
                        </button>
                    </div>

                    {/* Bottom Redirect */}
                    {/* <div className="mt-6 text-center">
                        <span className="text-[14px] text-[#545a6b] font-medium">
                            Already have an account?{' '}
                        </span>
                        <a href="/login" className="text-[14px] text-[#ef4444] hover:text-[#d73d3d] font-semibold transition-colors">
                            Login
                        </a>
                    </div> */}

                    <div className="flex items-center gap-3">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="text-[14px] text-[#9ca3af] font-medium">Already have an account? Log in</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <div>
                        <button
                            type="button"
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-xl transition-all shadow-sm shadow-gray-200 text-[15px] flex items-center justify-center"
                            onClick={loginFnc}
                        >
                            <img src={googleLogo} alt="Google Logo" className="w-10 h-10 mr-3" />
                            Login in with Google
                        </button>
                    </div>

                </form>

                <div className="mt-5 text-center">
                    <a href="/" className="inline-block text-[15px] text-[#9ca3af] hover:text-gray-600 transition-colors font-medium">
                        Back to Role Selection
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;
