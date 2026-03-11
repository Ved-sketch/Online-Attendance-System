import { CircleUserRound, Users, GraduationCap } from "lucide-react";
import LoginCard from "../Components/LoginCard";

const UserRole = () => {

    return (
        <>
            <div className=" min-h-screen">
                <div className="flex flex-col items-center justify-center min-h-screen p-6">

                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold">Online Attendance System</h1>
                        <h3 className="mt-2 text-md text-gray-500">Select your role to continue</h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-7">
                        <LoginCard icon={CircleUserRound} UserRole='Admin' description="Manage system, users, and view all attendance records" />

                        <LoginCard icon={Users} UserRole='Teacher' description="Mark attendance and Manage your classes" />

                        <LoginCard icon={GraduationCap} UserRole='Student' description="View your attendance records and Statistics" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserRole;