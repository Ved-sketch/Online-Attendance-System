import { CircleUserRound, Mail, Lock } from "lucide-react";

const AdminLoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#fdfbfb]">
            <div className="w-full max-w-[420px] bg-white border border-red-50/50 shadow-[0_8px_30px_rgb(239,68,68,0.05)] rounded-[2rem] p-8 sm:p-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-red-50/60 rounded-full p-4 mb-4">
                        <CircleUserRound className="text-[#ef4444] w-9 h-9 stroke-[1.5]" />
                    </div>
                    <h1 className="text-[1.7rem] font-medium text-[#474c5d] mb-2">Admin Login</h1>
                    <span className="text-[#848a9b] text-[14px]">Online Attendance System</span>
                </div>

                <form className="space-y-5">
                    <div>
                        <label className="block text-[15px] font-semibold text-[#545a6b] mb-2">
                            Admin ID
                        </label>
                        <div className="flex items-center px-4 py-3 border border-gray-200 rounded-xl focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all">
                            <Mail className="w-[1.1rem] h-[1.1rem] text-[#ef4444] mr-3 shrink-0 stroke-[2]" />
                            <input
                                type="text"
                                placeholder="Admin ID"
                                className="w-full bg-transparent outline-none text-[#545a6b] placeholder-[#a0aab8] text-[15px]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[15px] font-semibold text-[#545a6b] mb-2">
                            Password
                        </label>
                        <div className="flex items-center px-4 py-3 border border-gray-200 rounded-xl focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-all">
                            <Lock className="w-[1.1rem] h-[1.1rem] text-[#ef4444] mr-3 shrink-0 stroke-[2]" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-transparent outline-none text-[#545a6b] tracking-wider placeholder-[#a0aab8] text-[15px]"
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
                        >
                            Login
                        </button>
                    </div>

                    <div className="text-right">
                        <a href="#" className="inline-block text-[14px] text-[#9ca3af] hover:text-gray-600 transition-colors font-medium">
                            Forgot password?
                        </a>
                    </div>
                </form>

                <div className="mt-12 text-center">
                    <a href="/" className="inline-block text-[15px] text-[#9ca3af] hover:text-gray-600 transition-colors font-medium">
                        Back to Role Selection
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AdminLoginPage;