import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const ClassAttendance = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  
  const [classData, setClassData] = useState(null);
  const [students, setStudents] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [todayAttendance, setTodayAttendance] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    
    fetchClassData();
  }, [classId]);

  const fetchClassData = async () => {
    try {
      // Fetch class data from backend
      const response = await fetch(`http://localhost:3000/api/teacher/class/${classId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch class data');
      }
      
      const data = await response.json();
      
      setClassData(data);
      setStudents(data.students || []);
      
      // Initialize today's attendance status
      const attendanceMap = {};
      (data.students || []).forEach(student => {
        attendanceMap[student.id] = student.todayStatus || null;
      });
      setTodayAttendance(attendanceMap);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching class data:', error);
      // Fall back to mock data for development
      const mockData = {
        classId: classId,
        className: 'Class A',
        subject: 'Mathematics',
        teacher: 'Mrs. Sarah Johnson',
        studentCount: 85,
        classAttendanceRate: 91.8,
        students: [
          { 
            id: 1, 
            rollNo: '01', 
            name: 'John Doe', 
            totalPresent: 50, 
            totalDays: 60, 
            totalAbsent: 10, 
            attendanceRate: 83.3,
            todayStatus: null 
          },
          { 
            id: 2, 
            rollNo: '02', 
            name: 'Jane Smith', 
            totalPresent: 55, 
            totalDays: 60, 
            totalAbsent: 5, 
            attendanceRate: 91.7,
            todayStatus: null 
          },
          { 
            id: 3, 
            rollNo: '03', 
            name: 'Alex Green', 
            totalPresent: 48, 
            totalDays: 60, 
            totalAbsent: 12, 
            attendanceRate: 80.0,
            todayStatus: null 
          },
          { 
            id: 4, 
            rollNo: '04', 
            name: 'Sarah White', 
            totalPresent: 52, 
            totalDays: 60, 
            totalAbsent: 8, 
            attendanceRate: 86.7,
            todayStatus: null 
          }
        ]
      };
      
      setClassData(mockData);
      setStudents(mockData.students);
      
      const attendanceMap = {};
      mockData.students.forEach(student => {
        attendanceMap[student.id] = student.todayStatus;
      });
      setTodayAttendance(attendanceMap);
      
      setLoading(false);
    }
  };

  const handleAttendanceToggle = (studentId, status) => {
    setTodayAttendance(prev => ({
      ...prev,
      [studentId]: prev[studentId] === status ? null : status
    }));
  };

  const handleMarkAllAttendance = async () => {
    // Filter students with attendance marked
    const attendanceData = Object.entries(todayAttendance)
      .filter(([_, status]) => status !== null)
      .map(([studentId, status]) => ({
        studentId,
        status,
        date: new Date().toISOString().split('T')[0]
      }));

    if (attendanceData.length === 0) {
      alert('Please mark attendance for at least one student');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/teacher/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          classId, 
          attendance: attendanceData,
          date: new Date().toISOString().split('T')[0]
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark attendance');
      }
      
      const result = await response.json();
      alert(result.message || 'Attendance marked successfully!');
      fetchClassData(); // Refresh data
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Failed to mark attendance. Please try again.');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to remove this student from the class?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/teacher/${studentId}?classId=${classId}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete student');
        }
        
        const result = await response.json();
        alert(result.message || 'Student removed successfully!');
        fetchClassData(); // Refresh data
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to remove student. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Class not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/Teacher/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to dashboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-gray-900">
                {classData.className}: {classData.subject}
              </h1>
              <p className="text-gray-500 mt-1">Detailed class statistics and attendance management.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Students in Class</div>
            <div className="text-2xl font-semibold text-gray-900">{classData.studentCount}</div>
            <div className="text-sm text-gray-600 mt-1">Teacher: {classData.teacher}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Current Date</div>
            <div className="text-2xl font-semibold text-gray-900">{currentDate}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Class Attn Rate</div>
            <div className="text-2xl font-semibold text-gray-900">{classData.classAttendanceRate}%</div>
          </div>
        </div>

        {/* Mark Attendance Button */}
        <button
          onClick={handleMarkAllAttendance}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-6 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Save Today's Attendance
        </button>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Roll</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Total Pres.</th>
                  {/* <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Total Days</th> */}
                  {/* <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Total Abs.</th> */}
                  {/* <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Attn Rate</th> */}
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">✓ / ✗ Today</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm text-gray-900">{student.rollNo}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">{student.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-center">{student.totalPresent}</td>
                    {/* <td className="px-4 py-4 text-sm text-gray-900 text-center">{student.totalDays}</td> */}
                    {/* <td className="px-4 py-4 text-sm text-gray-900 text-center">{student.totalAbsent}</td> */}
                    {/* <td className="px-4 py-4 text-sm text-gray-900 text-center">{student.attendanceRate}%</td> */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleAttendanceToggle(student.id, 'present')}
                          className={`p-1.5 rounded transition-colors ${
                            todayAttendance[student.id] === 'present'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-600'
                          }`}
                          title="Mark present"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleAttendanceToggle(student.id, 'absent')}
                          className={`p-1.5 rounded transition-colors ${
                            todayAttendance[student.id] === 'absent'
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-600'
                          }`}
                          title="Mark absent"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Remove student"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center">
          Click the checkmark (✓) for present or cross (✗) for absent, then click "Mark Today's Attendance" to save.
        </div>
      </main>
    </div>
  );
};
