import { useMemo, useState } from "react";
import {
	BookOpen,
	CalendarDays,
	LogOut,
	Plus,
	Trash2,
} from "lucide-react";

const initialSubjects = [
	{ id: "MTH101", name: "Mathematics", attendance: 88, criteria: 75 },
	{ id: "SCI205", name: "Science", attendance: 92, criteria: 80 },
	{ id: "ENG110", name: "English", attendance: 71, criteria: 75 },
	{ id: "CSE120", name: "Computer Science", attendance: 80, criteria: 80 },
];

const getAttendanceColor = (attendance, criteria) => {
	if (attendance >= criteria) return "#16a34a";
	return "#dc2626";
};

const getAttendanceProgress = (attendance) => {
	if (!Number.isFinite(attendance)) return 0;
	return Math.max(0, Math.min(100, attendance));
};

const StudentDashboard = ({ name = "" }) => {
	const [subjects, setSubjects] = useState(initialSubjects);

	const today = useMemo(() => {
		return new Date().toLocaleDateString("en-US", {
			weekday: "long",
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	}, []);

	const handleJoinClass = () => {
		console.log("Join new class clicked");
	};

	const handleDeleteClass = (classId) => {
		if (!window.confirm("Remove this class from your enrolled subjects?")) {
			return;
		}
		setSubjects((prev) => prev.filter((subject) => subject.id !== classId));
	};

	const handleEnterClass = (classId) => {
		console.log("Enter class", classId);
	};

	return (
		<div className="min-h-screen bg-[#f8f8fb]">
			<header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm">
				<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
					<div>
						<h1 className="text-3xl font-semibold text-gray-900">Student Dashboard</h1>
						<p className="mt-1 text-sm text-gray-500">Welcome{name ? `, ${name}` : ","}</p>
					</div>

					<button
						type="button"
						className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
					>
						<LogOut size={16} />
						Logout
					</button>
				</div>
			</header>

			<main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
				<section className="mb-8 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-pink-500 px-6 py-5 text-white shadow-lg shadow-red-200/80">
					<h2 className="text-2xl font-semibold">Today's Date</h2>
					<div className="mt-2 flex items-center gap-2 text-sm font-semibold text-white/95 sm:text-base">
						<CalendarDays size={16} />
						<span>{today}</span>
					</div>
				</section>

				<section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
					<div className="mb-5">
						<h3 className="text-xl font-semibold text-gray-900">Subject and Attendance Overview</h3>
						<p className="mt-1 text-sm text-gray-500">Manage your enrolled subjects</p>
					</div>

					<button
						type="button"
						onClick={handleJoinClass}
						className="mb-5 inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:from-red-600 hover:to-pink-600"
					>
						<Plus size={14} />
						Join New Class
					</button>

					<h4 className="mb-3 text-lg font-semibold text-gray-900">My Enrolled Subjects</h4>

					<div className="space-y-3">
						{subjects.map((subject) => {
							const meterColor = getAttendanceColor(subject.attendance, subject.criteria);
							const attendanceProgress = getAttendanceProgress(subject.attendance);
							const fillAngle = attendanceProgress * 3.6;

							return (
								<article
									key={subject.id}
									className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
								>
									<div className="flex items-center gap-2">
										<BookOpen size={16} className="text-gray-500" />
										<p className="text-sm font-semibold text-gray-800 sm:text-base">{subject.name}</p>
									</div>

									<div className="flex flex-wrap items-center gap-2 sm:gap-3">
										<p className="text-xs font-medium text-gray-600 sm:text-sm">
											Net Attendance: {subject.attendance}%
										</p>

										<span
											className="relative h-6 w-6 shrink-0 rounded-full"
											style={{
												background: `conic-gradient(${meterColor} 0deg ${fillAngle}deg, #e5e7eb ${fillAngle}deg 360deg)`,
											}}
											aria-label={`Attendance indicator for ${subject.name}: ${attendanceProgress}%`}
										>
											<span className="absolute inset-[4px] rounded-full bg-white" />
										</span>

										<span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
											Criteria: {subject.criteria}%
										</span>

										<button
											type="button"
											onClick={() => handleDeleteClass(subject.id)}
											className="rounded-md p-1.5 text-gray-500 transition hover:bg-red-50 hover:text-red-700"
											title="Delete class"
										>
											<Trash2 size={15} />
										</button>

										<button
											type="button"
											onClick={() => handleEnterClass(subject.id)}
											className="rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white transition hover:bg-gray-800"
										>
											Enter Class 
										</button>
									</div>
								</article>
							);
						})}
					</div>
				</section>
			</main>
		</div>
	);
};

export default StudentDashboard;
