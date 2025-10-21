import React from "react";
import { 
  FaUsers, 
  FaProjectDiagram, 
  FaPlus, 
  FaEnvelope, 
  FaUserCog,
  FaCalendarAlt,
  FaTasks
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Reusable Stat Card Component
const StatCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
    green: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300',
    purple: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300',
    gray: 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300'
  };

  return (
    <div className="bg-zinc-900 p-6 rounded shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-gray-400">{title}</h2>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

// Reusable Action Button/Link Component
const ActionButton = ({ text, icon: Icon, onClick, href, className }) => {
  const commonClasses = "flex flex-col items-center justify-center gap-3 p-8 sujoy3 text-lg rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md";

  if (href) {
    return (
      <Link
        to={href}
        className={`${commonClasses} ${className}`}
      >
        <Icon />
        {text}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${commonClasses} ${className}`}
    >
      <Icon />
      {text}
    </button>
  );
};

export default function Dashboard({ dashboardData }) {
  // Default fallback data
  const stats = dashboardData?.stats || {
    projects: 4,
    members: 3,
    lastUpload: "N/A",
    activeProjects: 4,
    pendingTasks: "21/10/2025"
  };

  // Data for stat cards
  const statsList = [
    { title: "Total Projects", value: stats.projects, icon: FaProjectDiagram, color: "blue" },
    { title: "Team Members", value: stats.members, icon: FaUsers, color: "green" },
    { title: "Active Projects", value: stats.activeProjects, icon: FaProjectDiagram, color: "purple" },
    { title: "Last Update", value: stats.pendingTasks, icon: FaTasks, color: "gray" },
  ];

  // Data for action buttons - now with href links
  const actionsList = [
    { text: "Add New Project", icon: FaPlus, href: "add-project", className: "bg-blue-800 hover:bg-blue-600 text-white" },
    { text: "Add New Member", icon: FaUsers, href: "/team/add", className: "bg-green-800 hover:bg-green-600 text-white" },
    { text: "Message project", icon: FaEnvelope, href: "manage-project", className: "bg-yellow-800 hover:bg-yellow-600 text-white" },
    { text: "Manage Members", icon: FaUserCog, href: "/team/manage", className: "bg-gray-800 hover:bg-gray-600 text-white" }
  ];

  return (
    <div className="min-h-full w-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto items-center">
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-200 sujoy tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-400 sujoy3 mt-2">
            Welcome back! Here's a summary of your Revox Studio progress.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statsList.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Actions Section */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 sujoy3 sm:mb-0">
              Quick Actions
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {actionsList.map((action, index) => (
              <ActionButton key={index} {...action} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}