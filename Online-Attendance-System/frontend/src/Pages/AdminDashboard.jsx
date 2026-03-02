import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'

const AdminDashboard = () => {
return (
    <div className='h-screen flex flex-col'>
            <div>
                <div className='flex justify-around p-5 border border-b-gray-300'>
                    <div>
                        <div>
                                <h2 className='text-2xl font-bold'>Admin Dashboard</h2>
                                <p className='text-gray-400'>Manage attendance records and user accounts.</p>
                        </div>
                    </div>

                    <div>
                        <Link to="/logout" className=' text-black px-4 py-2 rounded flex items-center gap-2 border border-gray-300'>
                                <LogOut size={16} />
                                Logout
                        </Link>
                    </div>
                </div>
            </div>
            <div className='p-5 bg-[#FEF6F6] flex-1'>
                
            </div>
    </div>
)
}

export default AdminDashboard