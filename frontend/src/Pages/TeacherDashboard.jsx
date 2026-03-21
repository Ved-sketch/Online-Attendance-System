import { useState, useEffect } from "react";
import { ClassCard } from "../Components/ClassCard";
import { AddClassModal } from "../Components/AddClassModal";
import { ConnectAdminModal } from "../Components/ConnectAdminModal";
import { getAuth } from "firebase/auth";
import authWithFirebase from "../../../backend/src/database&auth/authentication";
const auth = getAuth();

export const TeacherDashboard = ({ Name }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [classes, setClasses] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  async function createClass(data) {
    try {
      const user = await authWithFirebase.getAuthUser();
      const token = await user.getIdToken();
      console.log(`token is valid ${token}`);

      const response = await fetch(
        "http://localhost:5000/api/teacher/new-class",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseName: data.name,
            requiredattendance: data.criteria,
            ClassId: data.id,
          }),
        },
      );
      const result = await response.json();
      console.log("Class created:", result);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteClass(classId) {
    try {
      const user = await authWithFirebase.getAuthUser();
      const token = await user.getIdToken();
      const response = await fetch(
        `http://localhost:5000/api/teacher/deletion-class`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            classId: classId,
          }),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete class");
      }
      const result = await response.json();
      console.log("Class deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting class:", error.message);
    }
  }

  async function connectAdmin(data) {
    console.log("Connect to admin clicked");
    try {
      const user = await authWithFirebase.getAuthUser();
      const token = await user.getIdToken();
      const response = await fetch(
        `http://localhost:5000/api/teacher/admin-connection`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            adminId: data.adminId,
          }),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to connect to admin");
      }

      const result = await response.json();
      console.log("Admin connected successfully:", result);
      return result;
    } catch (error) {
      console.error("Connection Error:", error.message);
    }
  }

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = now.toLocaleDateString("en-US", options);
      setCurrentDate(formattedDate);
    };

    updateDate();

    // importing data from class to show on ui

    async function classFetching() {
      try {
        const user = await authWithFirebase.getAuthUser();
        const classesObject = await authWithFirebase.fetchingClassData(
          user.uid,
        );
        const classShown = classesObject.map((cls) => ({
          id: cls.classId,
          name: cls.courseName,
          studentCount: 85,
          criteria: Number(cls.requiredattendance),
        }));
        setClasses(classShown);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    }
    classFetching();
    
   

    // Update every minute to keep it current
    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleAddClass = () => {
    console.log("Add class clicked");
  };

  const handleConnectToAdmin = () => {
    console.log("Connect to admin clicked");
  };

  const handleEditClass = (classId) => {
    console.log("Edit class:", classId);
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses(classes.filter((cls) => cls.id !== classId));
      deleteClass(classId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                Teacher Dashboard
              </h1>
              <p className="text-gray-500 mt-1">Welcome, {Name}</p>
            </div>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Today's Classes Card */}
        <div className="bg-red-500 text-white rounded-2xl p-5 shadow-lg mb-8">
          <div className="text-2xl font-medium mb-2">Today's Date</div>
          <div className="flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-lg font-medium">{currentDate}</span>
          </div>

          {/* <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Today's Classes</h2>
            <div className="text-right">
              <div className="text-5xl font-bold">4</div>
              <div className="text-sm opacity-90">Total Classes</div>
            </div>
          </div> */}
        </div>

        {/* Class Management Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Class Management Overview
            </h2>
            <p className="text-sm text-gray-500">
              Add or manage your existing classes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Class</span>
            </button>

            <button
              onClick={() => setShowAdminModal(true)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Connect to Admin
            </button>
          </div>

          {/* All Created Classes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              All Created Classes
            </h3>

            <div className="space-y-3">
              {classes.map((classItem) => (
                <ClassCard
                  key={classItem.id}
                  classId={classItem.id}
                  className={classItem.name}
                  studentCount={classItem.studentCount}
                  criteria={classItem.criteria}
                  onEdit={handleEditClass}
                  onDelete={handleDeleteClass}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <AddClassModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreate={createClass}
      />

      <ConnectAdminModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onConnect={connectAdmin}
      />
    </div>
  );
};
