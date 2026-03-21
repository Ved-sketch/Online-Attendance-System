import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, GraduationCap, Users, UserCheck, UserX, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    // State to hold stats data - will be fetched from backend
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        presentToday: 0,
        absentToday: 0,
        attendanceRate: 0
    });

    // State to track active view (null, 'students', or 'teachers')
    const [activeView, setActiveView] = useState(null);
    
    // State to hold student attendance data
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(false);

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

    // Fetch student attendance data
    const fetchStudentData = async () => {
        setLoading(true);
        try {
            // API call structure:
            // const response = await fetch('YOUR_BACKEND_API/admin/students/attendance');
            // const data = await response.json();
            // setStudentData(data);
            
            // Dummy data for development
            setStudentData([
                {
                    id: 'ST001',
                    name: 'John Smith',
                    class: 'Grade 10-A',
                    totalDays: 180,
                    present: 165,
                    absent: 15,
                    attendanceRate: 91.67
                },
                {
                    id: 'ST002',
                    name: 'Emma Wilson',
                    class: 'Grade 10-A',
                    totalDays: 180,
                    present: 142,
                    absent: 38,
                    attendanceRate: 78.89
                },
                {
                    id: 'ST003',
                    name: 'Michael Brown',
                    class: 'Grade 10-B',
                    totalDays: 180,
                    present: 175,
                    absent: 5,
                    attendanceRate: 97.22
                },
                {
                    id: 'ST004',
                    name: 'Sophia Lee',
                    class: 'Grade 11-A',
                    totalDays: 180,
                    present: 158,
                    absent: 22,
                    attendanceRate: 87.78
                }
            ]);
            toast.success('Student data fetched successfully');
        } 
        catch (error) {
            console.error('Error fetching student data:', error);
            toast.error('Failed to fetch student data');
        } finally {
            setLoading(false);
        }
    };

    // Handle Students button click
    const handleStudentsClick = () => {
        if (activeView === 'students') {
            setActiveView(null);
        } else {
            setActiveView('students');
            if (studentData.length === 0) {
                fetchStudentData();
            }
        }
    };

    // Handle Teachers button click
    const handleTeachersClick = () => {
        if (activeView === 'teachers') {
            setActiveView(null);
        } else {
            setActiveView('teachers');
            // TODO: Fetch teacher data
        }
    };

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
            <div className='p-5 bg-[#FEF6F6] flex-1 overflow-auto'>
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
                <div className='flex gap-4 mb-6 w-fit bg-[#ffeded] rounded-full p-2'>
                    <button 
                        onClick={handleStudentsClick}
                        className={`bg-transparent border-none flex items-center gap-2 p-2 hover:text-gray-900 cursor-pointer ${
                            activeView === 'students' ? 'text-gray-900 font-semibold bg-white border rounded-full' : 'text-gray-700'
                        }`}
                    >
                        <GraduationCap size={20} />
                        <span className='font-medium'>Students</span>
                    </button>

                    <button 
                        onClick={handleTeachersClick}
                        className={`bg-transparent border-none flex items-center gap-2 p-2 hover:text-gray-900 cursor-pointer ${
                            activeView === 'teachers' ? 'text-gray-900 font-semibold bg-white border rounded-full' : 'text-gray-700'
                        }`}
                    >
                        <Users size={20} />
                        <span className='font-medium'>Teachers</span>
                    </button>
                </div>

                {/* Student Attendance Table */}
                {activeView === 'students' && (
                    <div className='bg-white rounded-lg shadow-sm p-4'>
                        <div className='mb-4'>
                            <h3 className='text-xl font-bold text-gray-800'>Student Attendance Records</h3>
                            <p className='text-gray-500 text-sm'>View and manage student attendance data</p>
                        </div>
                        
                        {loading ? (
                            <div className='text-center py-8 text-gray-500'>Loading...</div>
                        ) : (
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead>
                                        <tr className='border-b border-gray-200'>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Student Name</th>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Student ID</th>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Class</th>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Total Days</th>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Present</th>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Absent</th>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Attendance Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentData.map((student) => (
                                            <tr key={student.id} className='border-b border-gray-100 hover:bg-gray-50'>
                                                <td className='py-3 px-4 text-sm text-blue-600'>{student.name}</td>
                                                <td className='py-3 px-4 text-sm text-gray-700'>{student.id}</td>
                                                <td className='py-3 px-4 text-sm text-gray-700'>{student.class}</td>
                                                <td className='py-3 px-4 text-sm text-gray-700'>{student.totalDays}</td>
                                                <td className='py-3 px-4 text-sm text-gray-700'>{student.present}</td>
                                                <td className='py-3 px-4 text-sm text-red-600'>{student.absent}</td>
                                                <td className='py-3 px-4 text-sm'>
                                                    <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium'>
                                                        {student.attendanceRate.toFixed(1)}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Teacher's table */}
                {activeView === 'teachers' && (
                    <div className='bg-white rounded-lg shadow-sm p-6'>
                        <div className='mb-4'>
                            <h3 className='text-xl font-bold text-gray-800'>Teacher Overview</h3>
                            <p className='text-gray-500 text-sm'>View teacher statistics and class management</p>
                        </div>
                        
                        {loading ? (
                            <div className='text-center py-8 text-gray-500'>Loading...</div>
                        ) : (
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead>
                                        <tr className='border-b border-gray-200'>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Teacher Name</th>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Subject</th>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Total Classes</th>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Students Today</th>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Present</th>
                                            <th className='text-left py-3 px-4 text-sm font-semibold text-gray-600'>Absent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teacherData.map((teacher) => (
                                            <tr key={teacher.id} className='border-b border-gray-100 hover:bg-gray-50'>
                                                <td className='py-3 px-4 text-sm text-blue-600'>{teacher.name}</td>
                                                <td className='py-3 px-4 text-sm text-gray-700'>{teacher.subject}</td>
                                                <td className='py-3 px-4 text-sm text-gray-700'>{teacher.totalClasses}</td>
                                                <td className='py-3 px-4 text-sm text-gray-700'>{teacher.studentsToday}</td>
                                                <td className='py-3 px-4 text-sm text-gray-700'>{teacher.present}</td>
                                                <td className='py-3 px-4 text-sm text-red-600'>{teacher.absent}</td>
                                                <td className='py-3 px-4 text-sm'>
                                                    <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium'>
                                                        {teacher.attendanceRate.toFixed(1)}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard