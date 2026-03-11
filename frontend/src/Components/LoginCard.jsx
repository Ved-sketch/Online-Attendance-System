import { Link } from "react-router-dom";

const LoginCard = ({ icon: Icon, UserRole, description }) => {
    return (
        <div className="border border-red-200 flex flex-col items-center justify-between p-6 rounded-[10%] w-64 h-64 aspect-square
            hover:outline hover:outline-2 hover:outline-red-600 outline-offset-0">

            <div className="flex flex-col items-center">
                <div className="mb-2 bg-red-100 rounded-[50%] p-2">
                    <Icon className="w-7 h-7 text-red-500" />
                </div>
                <span className="text-lg font-semibold text-center">{UserRole}</span>
            </div>

            <div className="text-center px-2">
                <span className="text-sm text-gray-500 line-clamp-2 break-words">{description}</span>
            </div>

            <div className="w-full">
                <Link to={`/${UserRole}`} className="flex items-center justify-center p-2 w-full gap-2 bg-[#ff5154] text-white border border-gray-300 rounded-lg hover:bg-[#c52326]">
                    Login as {UserRole}
                </Link>
            </div>

        </div>
    )
}

export default LoginCard;