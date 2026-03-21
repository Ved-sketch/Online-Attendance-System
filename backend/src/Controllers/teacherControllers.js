const { db } = require('../database&auth/firebase');

// Get class details with all students
const getClassDetails = async (req, res) => {
  try {
    const { classId } = req.params;
    
    // Fetch class information
    const classDoc = await db.collection('classes').doc(classId).get();
    
    if (!classDoc.exists) {
      return res.status(404).json({ error: 'Class not found' });
    }
    
    const classData = classDoc.data();
    
    // Fetch students in the class
    const studentsSnapshot = await db.collection('classes').doc(classId)
      .collection('students').get();
    
    const students = [];
    studentsSnapshot.forEach(doc => {
      students.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.status(200).json({
      classId,
      ...classData,
      students
    });
  } catch (error) {
    console.error('Error fetching class details:', error);
    res.status(500).json({ error: 'Failed to fetch class details' });
  }
};

// Mark attendance for students
const takeAttendance = async (req, res) => {
  try {
    const { classId, attendance, date } = req.body;
    
    if (!classId || !attendance || !Array.isArray(attendance)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }
    
    const attendanceDate = date || new Date().toISOString().split('T')[0];
    const batch = db.batch();
    
    // Update attendance for each student
    for (const record of attendance) {
      const { studentId, status } = record;
      
      // Create attendance record
      const attendanceRef = db.collection('attendance')
        .doc(classId)
        .collection(attendanceDate)
        .doc(studentId);
      
      batch.set(attendanceRef, {
        status,
        markedAt: new Date().toISOString()
      });
      
      // Update student stats
      const studentRef = db.collection('classes')
        .doc(classId)
        .collection('students')
        .doc(studentId);
      
      const studentDoc = await studentRef.get();
      
      if (studentDoc.exists) {
        const studentData = studentDoc.data();
        const totalDays = (studentData.totalDays || 0) + 1;
        const totalPresent = status === 'present' 
          ? (studentData.totalPresent || 0) + 1 
          : (studentData.totalPresent || 0);
        const totalAbsent = status === 'absent' 
          ? (studentData.totalAbsent || 0) + 1 
          : (studentData.totalAbsent || 0);
        const attendanceRate = parseFloat(((totalPresent / totalDays) * 100).toFixed(1));
        
        batch.update(studentRef, {
          totalDays,
          totalPresent,
          totalAbsent,
          attendanceRate,
          lastUpdated: new Date().toISOString()
        });
      }
    }
    
    await batch.commit();
    
    res.status(200).json({ 
      message: 'Attendance marked successfully',
      recordsUpdated: attendance.length
    });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};

// Check attendance for a specific date
const checkAttendance = async (req, res) => {
  try {
    const { classId, date } = req.query;
    
    if (!classId) {
      return res.status(400).json({ error: 'Class ID is required' });
    }
    
    const attendanceDate = date || new Date().toISOString().split('T')[0];
    
    const attendanceSnapshot = await db.collection('attendance')
      .doc(classId)
      .collection(attendanceDate)
      .get();
    
    const attendance = {};
    attendanceSnapshot.forEach(doc => {
      attendance[doc.id] = doc.data();
    });
    
    res.status(200).json({ 
      date: attendanceDate,
      attendance
    });
  } catch (error) {
    console.error('Error checking attendance:', error);
    res.status(500).json({ error: 'Failed to check attendance' });
  }
};

// Show class statistics
const showStats = async (req, res) => {
  try {
    const { classId } = req.query;
    
    if (!classId) {
      return res.status(400).json({ error: 'Class ID is required' });
    }
    
    const studentsSnapshot = await db.collection('classes')
      .doc(classId)
      .collection('students')
      .get();
    
    const stats = [];
    studentsSnapshot.forEach(doc => {
      stats.push({
        studentId: doc.id,
        ...doc.data()
      });
    });
    
    res.status(200).json({ stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

// Show individual student details
const showStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { classId } = req.query;
    
    if (!classId) {
      return res.status(400).json({ error: 'Class ID is required' });
    }
    
    const studentDoc = await db.collection('classes')
      .doc(classId)
      .collection('students')
      .doc(id)
      .get();
    
    if (!studentDoc.exists) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.status(200).json({ 
      studentId: id,
      ...studentDoc.data()
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student details' });
  }
};

// Add student to class
const addStudent = async (req, res) => {
  try {
    const { classId, studentId, name, rollNo } = req.body;
    
    if (!classId || !studentId || !name || !rollNo) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    await db.collection('classes')
      .doc(classId)
      .collection('students')
      .doc(studentId)
      .set({
        name,
        rollNo,
        totalPresent: 0,
        totalDays: 0,
        totalAbsent: 0,
        attendanceRate: 0,
        addedAt: new Date().toISOString()
      });
    
    res.status(201).json({ 
      message: 'Student added successfully',
      studentId 
    });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
};

// Delete student from class
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { classId } = req.query;
    
    if (!classId) {
      return res.status(400).json({ error: 'Class ID is required' });
    }
    
    await db.collection('classes')
      .doc(classId)
      .collection('students')
      .doc(id)
      .delete();
    
    res.status(200).json({ 
      message: 'Student deleted successfully',
      studentId: id 
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};

// Download statistics (placeholder)
const downloadStats = async (req, res) => {
  try {
    const { classId } = req.query;
    
    if (!classId) {
      return res.status(400).json({ error: 'Class ID is required' });
    }
    
    // TODO: Implement CSV/Excel export functionality
    res.status(200).json({ message: 'Download stats feature - to be implemented' });
  } catch (error) {
    console.error('Error downloading stats:', error);
    res.status(500).json({ error: 'Failed to download statistics' });
  }
};

// Sort students
const sortStudents = async (req, res) => {
  try {
    const { classId, sortBy = 'rollNo', order = 'asc' } = req.query;
    
    if (!classId) {
      return res.status(400).json({ error: 'Class ID is required' });
    }
    
    const studentsSnapshot = await db.collection('classes')
      .doc(classId)
      .collection('students')
      .orderBy(sortBy, order)
      .get();
    
    const students = [];
    studentsSnapshot.forEach(doc => {
      students.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.status(200).json({ students });
  } catch (error) {
    console.error('Error sorting students:', error);
    res.status(500).json({ error: 'Failed to sort students' });
  }
};

// Show schedule
const showSchedule = async (req, res) => {
  try {
    const { teacherId } = req.query;
    
    if (!teacherId) {
      return res.status(400).json({ error: 'Teacher ID is required' });
    }
    
    // TODO: Implement schedule functionality
    res.status(200).json({ message: 'Schedule feature - to be implemented' });
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
};

module.exports = {
  getClassDetails,
  takeAttendance,
  checkAttendance,
  showStats,
  showStudent,
  addStudent,
  deleteStudent,
  downloadStats,
  sortStudents,
  showSchedule
};