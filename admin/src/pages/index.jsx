import React, { useEffect } from "react";
import { 
  FaUsers, 
  FaProjectDiagram, 
  FaPlus, 
  FaEnvelope, 
  FaUserCog,
  FaTasks
} from "react-icons/fa";
import { Link } from "react-router-dom";
import projectStore from "../store/projectStore.js";
import teamStore from "../store/teamStore.js";
import postStore from "../store/postStore.js"

// Reusable Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, loading }) => {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
    green: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300',
    purple: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300',
    gray: 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300'
  };

  // Safe value rendering
  const renderValue = () => {
    if (loading) {
      return <span className="inline-block h-8 w-16 bg-gray-600 rounded animate-pulse"></span>;
    }
    
    if (value === null || value === undefined) {
      return "0";
    }
    
    // If value is an object, stringify it for debugging
    if (typeof value === 'object') {
      console.error(`Invalid value for ${title}:`, value);
      return "Error";
    }
    
    return value;
  };

  return (
    <div className="bg-zinc-900 p-6 rounded shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-gray-400">{title}</h2>
          <p className="text-3xl font-bold text-white mt-1">
            {renderValue()}
          </p>
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

export default function Dashboard() {
  const {
    getTotalProjects, 
    totalProject, 
    getLastProject, 
    lastProjectDate,
    isLoading: projectLoading,
    error: projectError
  } = projectStore();
  
  const {
    getTotalTeamMembers, 
    totalMember,
    isLoading: teamLoading,
    error: teamError
  } = teamStore();

  const {
    fetchTotalPosts,
    totalPosts
  } = postStore();

  // Debug the values
  useEffect(() => {
    console.log("Dashboard values:", {
      totalProject,
      totalMember,
      lastProjectDate,
      totalProjectType: typeof totalProject,
      totalMemberType: typeof totalMember
    });
  }, [totalProject, totalMember, lastProjectDate]);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        await Promise.all([
          getTotalProjects(),
          getLastProject(),
          getTotalTeamMembers(),
          fetchTotalPosts()
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [getTotalProjects, getLastProject, getTotalTeamMembers, fetchTotalPosts]);

  // Safe value formatting
  const formatTotalProjects = () => {
    if (projectLoading) return null;
    if (typeof totalProject === 'object') {
      console.error("totalProject is object:", totalProject);
      return 0;
    }
    return totalProject || 0;
  };

  const formatTotalMembers = () => {
    if (teamLoading) return null;
    if (typeof totalMember === 'object') {
      console.error("totalMember is object:", totalMember);
      return 0;
    }
    return totalMember || 0;
  };

  const formatLastDate = () => {
    if (projectLoading) return null;
    
    if (!lastProjectDate) {
      return "No projects";
    }
    
    // Handle case where lastProjectDate might be an object
    if (typeof lastProjectDate === 'object') {
      console.error("lastProjectDate is object:", lastProjectDate);
      return "Error";
    }
    
    try {
      return new Date(lastProjectDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  // Data for stat cards
  const statsList = [
    { 
      title: "Total Projects", 
      value: formatTotalProjects(), 
      icon: FaProjectDiagram, 
      color: "blue",
      loading: projectLoading
    },
    { 
      title: "Team Members", 
      value: formatTotalMembers(), 
      icon: FaUsers, 
      color: "green",
      loading: teamLoading
    },
    { 
      title: "Total Posts", 
      value: totalPosts,
      icon: FaProjectDiagram,
      color: "purple",
      loading: projectLoading
    },
    { 
      title: "Last Project", 
      value: formatLastDate(), 
      icon: FaTasks, 
      color: "gray",
      loading: projectLoading
    },
  ];

  // Data for action buttons
  const actionsList = [
    { 
      text: "Add New Project", 
      icon: FaPlus, 
      href: "add-project", 
      className: "bg-blue-800 hover:bg-blue-600 text-white" 
    },
    { 
      text: "Add New Member", 
      icon: FaUsers, 
      href: "add-member", 
      className: "bg-green-800 hover:bg-green-600 text-white" 
    },
    { 
      text: "Manage Projects", 
      icon: FaEnvelope, 
      href: "manage-project", 
      className: "bg-yellow-800 hover:bg-yellow-600 text-white" 
    },
    { 
      text: "Manage Members", 
      icon: FaUserCog, 
      href: "manage-member", 
      className: "bg-gray-800 hover:bg-gray-600 text-white" 
    }
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

        {/* Error Messages */}
        {projectError && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">Project Error: {projectError}</p>
          </div>
        )}
        
        {teamError && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">Team Error: {teamError}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statsList.map((stat, index) => (
            <StatCard 
              key={index} 
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              loading={stat.loading}
            />
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