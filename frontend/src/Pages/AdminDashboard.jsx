import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, GraduationCap, Users, UserCheck, UserX, TrendingUp } from 'lucide-react'

const AdminDashboard = () => {
    // State to hold stats data - will be fetched from backend
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        presentToday: 0,
        absentToday: 0,
        attendanceRate: 0
    });

    useEffect(() => {
        // API call structure:
        // const fetchStats = async () => {
        //     try {
        //         const response = await fetch('YOUR_BACKEND_API/admin/stats');
        //         const data = await response.json();
        //         setStats({
        //             totalStudents: data.totalStudents,
        //             totalTeachers: data.totalTeachers,
        //             presentToday: data.presentToday,
        //             absentToday: data.absentToday,
        //             attendanceRate: data.attendanceRate
        //         });
        //     } catch (error) {
        //         console.error('Error fetching stats:', error);
        //     }
        // };
        // fetchStats();

        // Dummy data for development
        setStats({
            totalStudents: 245,
            totalTeachers: 18,
            presentToday: 198,
            absentToday: 47,
            attendanceRate: 80.8
        });
    }, []);

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
                {/* Stats Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mb-6'>
                    {/* Total Students Card */}
                    <div className='bg-white rounded-lg p-6 shadow-sm'>
                        <div className='flex items-center gap-2 text-gray-500 mb-2'>
                            <GraduationCap size={20} className='text-red-400' />
                            <span className='text-sm'>Total Students</span>
                        </div>
                        <div className='text-3xl font-bold text-gray-800'>{stats.totalStudents}</div>
                    </div>

                    {/* Total Teachers Card */}
                    <div className='bg-white rounded-lg p-6 shadow-sm'>
                        <div className='flex items-center gap-2 text-gray-500 mb-2'>
                            <Users size={20} className='text-red-400' />
                            <span className='text-sm'>Total Teachers</span>
                        </div>
                        <div className='text-3xl font-bold text-gray-800'>{stats.totalTeachers}</div>
                    </div>

                    {/* Present Today Card */}
                    <div className='bg-white rounded-lg p-6 shadow-sm'>
                        <div className='flex items-center gap-2 text-gray-500 mb-2'>
                            <UserCheck size={20} className='text-green-400' />
                            <span className='text-sm'>Present Today</span>
                        </div>
                        <div className='text-3xl font-bold text-green-600'>{stats.presentToday}</div>
                    </div>

                    {/* Absent Today Card */}
                    <div className='bg-white rounded-lg p-6 shadow-sm'>
                        <div className='flex items-center gap-2 text-gray-500 mb-2'>
                            <UserX size={20} className='text-red-400' />
                            <span className='text-sm'>Absent Today</span>
                        </div>
                        <div className='text-3xl font-bold text-red-600'>{stats.absentToday}</div>
                    </div>

                    {/* Attendance Rate Card */}
                    <div className='bg-white rounded-lg p-6 shadow-sm'>
                        <div className='flex items-center gap-2 text-gray-500 mb-2'>
                            <TrendingUp size={20} className='text-red-400' />
                            <span className='text-sm'>Attendance Rate</span>
                        </div>
                        <div className='text-3xl font-bold text-gray-800'>{stats.attendanceRate}%</div>
                    </div>
                </div>

                {/* Students and Teachers Buttons */}
                <div className='flex gap-4'>

                    <button className='bg-transparent border-none flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer'>
                        <GraduationCap size={20} />
                        <span className='font-medium'>Students</span>
                    </button>

                    <button className='bg-transparent border-none flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer'>
                        <Users size={20} />
                        <span className='font-medium'>Teachers</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard