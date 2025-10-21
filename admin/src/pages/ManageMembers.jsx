import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, X, Save, Search, Mail, ExternalLink } from 'lucide-react';

// Sample data
const initialMembers = [
  {
    id: 1,
    name: "Sujoy Garai",
    role: "Full Stack Developer | Founder of Revox Studio",
    description: "I am a full-stack developer and the founder of Revox Studio, passionate about building modern, scalable web apps with React, Django, and FastAPI. I love blending design with logic to create smooth digital experiences — fueled by coffee and creativity. coffee. code. repeat. ☕💻",
    skills: ["React", "Python", "Django", "Tailwind CSS", "FastAPI", "MongoDB"],
    email: "sujoygarai89@gmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/sujoygarai/",
      github: "https://github.com/Sujoy0001",
      portfolio: "https://revoxstudio.site/team/sujoy",
    },
    socials: {
      facebook: "",
      instagram: "https://www.instagram.com/_sujoygarai_?igsh=Nmx0YjVwZXV6M3Bv",
      x: "https://x.com/SujoyGarai999",
      discord: "",
    },
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    urlName: "sujoy",
  },
  {
    id: 2,
    name: "John Doe",
    role: "Frontend Developer",
    description: "Passionate frontend developer with expertise in React and modern JavaScript frameworks. Love creating beautiful and functional user interfaces.",
    skills: ["React", "JavaScript", "TypeScript", "CSS3", "Next.js"],
    email: "john.doe@example.com",
    links: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      portfolio: "https://johndoe.dev",
    },
    socials: {
      facebook: "https://facebook.com/johndoe",
      instagram: "https://instagram.com/johndoe",
      x: "https://x.com/johndoe",
      discord: "johndoe#1234",
    },
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    urlName: "john-doe",
  }
];

const ManageMembers = () => {
  const [members, setMembers] = useState(initialMembers);
  const [filteredMembers, setFilteredMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for editing
  const [editForm, setEditForm] = useState({
    name: '',
    role: '',
    description: '',
    skills: [],
    email: '',
    links: {
      linkedin: '',
      github: '',
      portfolio: '',
    },
    socials: {
      facebook: '',
      instagram: '',
      x: '',
      discord: '',
    },
    img: '',
    urlName: '',
    newSkill: ''
  });

  // Filter members based on search term
  useEffect(() => {
    const filtered = members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchTerm, members]);

  // Initialize edit form when editing starts
  useEffect(() => {
    if (editingMember) {
      const member = members.find(m => m.id === editingMember);
      if (member) {
        setEditForm({
          name: member.name,
          role: member.role,
          description: member.description,
          skills: [...member.skills],
          email: member.email,
          links: { ...member.links },
          socials: { ...member.socials },
          img: member.img,
          urlName: member.urlName,
          newSkill: ''
        });
      }
    }
  }, [editingMember, members]);

  const handleEdit = (memberId) => {
    setEditingMember(memberId);
  };

  const handleCloseEdit = () => {
    setEditingMember(null);
  };

  const handleSave = async (memberId) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMembers(members.map(member => 
        member.id === memberId 
          ? { 
              ...member, 
              name: editForm.name,
              role: editForm.role,
              description: editForm.description,
              skills: editForm.skills,
              email: editForm.email,
              links: { ...editForm.links },
              socials: { ...editForm.socials },
              img: editForm.img,
              urlName: editForm.urlName
            }
          : member
      ));
      
      handleCloseEdit();
    } catch (error) {
      console.error('Error updating member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (memberId) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMembers(members.filter(member => member.id !== memberId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLinkChange = (platform, value) => {
    setEditForm(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [platform]: value
      }
    }));
  };

  const handleSocialChange = (platform, value) => {
    setEditForm(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
  };

  const handleAddSkill = () => {
    if (editForm.newSkill.trim() && !editForm.skills.includes(editForm.newSkill.trim())) {
      setEditForm(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditForm(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleTechKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl sujoy font-bold text-white mb-4">
            Manage Team Members
          </h1>
          <p className="text-lg sujoy3 text-zinc-300">
            View, edit, and delete team members
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Search members by name, role, skills, or email..."
            />
            {searchTerm && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  onClick={clearSearch}
                  className="p-1 hover:bg-zinc-700 rounded-full transition-colors"
                  title="Clear search"
                >
                  <X className="h-4 w-4 text-zinc-400 hover:text-white" />
                </button>
              </div>
            )}
          </div>
          <div className="mt-2 flex justify-between items-center text-sm text-zinc-400">
            <span>
              {filteredMembers.length} of {members.length} members found
            </span>
            {searchTerm && (
              <span>
                Searching for: "<span className="text-white">{searchTerm}</span>"
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-zinc-700"
            >
              {/* Member Image */}
              <div className="h-64 bg-zinc-700 relative">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => window.open(member.links.portfolio, '_blank')}
                    className="p-2 bg-zinc-800 rounded-full shadow-md hover:bg-zinc-700 transition-colors border border-zinc-600"
                    title="View Portfolio"
                  >
                    <ExternalLink className="w-4 h-4 text-zinc-300" />
                  </button>
                  <button
                    onClick={() => handleEdit(member.id)}
                    disabled={isLoading}
                    className="p-2 bg-zinc-800 rounded-full shadow-md hover:bg-zinc-700 transition-colors disabled:opacity-50 border border-zinc-600"
                    title="Edit Member"
                  >
                    <Edit className="w-4 h-4 text-green-400" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(member.id)}
                    disabled={isLoading}
                    className="p-2 bg-zinc-800 rounded-full shadow-md hover:bg-zinc-700 transition-colors disabled:opacity-50 border border-zinc-600"
                    title="Delete Member"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Member Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-zinc-400 mb-3">
                  {member.role}
                </p>
                
                <div className="flex items-center text-zinc-300 mb-4 text-sm">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{member.email}</span>
                </div>
                
                <p className="text-zinc-300 mb-4 line-clamp-3 text-sm">
                  {member.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-zinc-300 mb-2">
                    Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-zinc-700 text-zinc-200 text-xs font-medium rounded-full border border-zinc-600"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 4 && (
                      <span className="px-2 py-1 bg-zinc-600 text-zinc-300 text-xs font-medium rounded-full">
                        +{member.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Social Links */}
                <div className="border-t border-zinc-700 pt-4">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>URL: /team/{member.urlName}</span>
                    <div className="flex space-x-2">
                      {member.links.linkedin && (
                        <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                          LinkedIn
                        </a>
                      )}
                      {member.links.github && (
                        <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredMembers.length === 0 && members.length > 0 && (
          <div className="text-center py-12">
            <div className="bg-zinc-800 rounded-lg p-8 max-w-md mx-auto border border-zinc-700">
              <Search className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No members found
              </h3>
              <p className="text-zinc-400 mb-4">
                No members match your search for "<span className="text-white">{searchTerm}</span>"
              </p>
              <button
                onClick={clearSearch}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* No Members Message */}
        {members.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-zinc-800 rounded-lg p-8 max-w-md mx-auto border border-zinc-700">
              <p className="text-zinc-400 text-lg mb-4">No team members found.</p>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                onClick={() => {
                  // Navigate to AddMember page
                  window.location.href = '/add-member';
                }}
              >
                Add Your First Member
              </button>
            </div>
          </div>
        )}

        {/* Edit Member Modal */}
        {editingMember && (
          <div className="fixed inset-0 bg-black/90 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-zinc-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-zinc-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Edit Team Member
                  </h2>
                  <button
                    onClick={handleCloseEdit}
                    className="p-2 hover:bg-zinc-700 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-zinc-300" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1">
                        Role/Position
                      </label>
                      <input
                        type="text"
                        value={editForm.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1">
                        URL Name
                      </label>
                      <input
                        type="text"
                        value={editForm.urlName}
                        onChange={(e) => handleInputChange('urlName', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      Description/Bio
                    </label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows="4"
                      className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      Skills & Technologies
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {editForm.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-600 text-zinc-200"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editForm.newSkill}
                        onChange={(e) => handleInputChange('newSkill', e.target.value)}
                        onKeyPress={handleTechKeyPress}
                        placeholder="Add a skill..."
                        className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      value={editForm.img}
                      onChange={(e) => handleInputChange('img', e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                      placeholder="https://example.com/profile.jpg"
                    />
                  </div>

                  {/* Professional Links */}
                  <div className="border-t border-zinc-700 pt-6">
                    <h3 className="text-lg font-medium text-zinc-300 mb-4">
                      Professional Links
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(editForm.links).map(([platform, value]) => (
                        <div key={platform}>
                          <label className="block text-sm font-medium text-zinc-300 mb-1 capitalize">
                            {platform}
                          </label>
                          <input
                            type="url"
                            value={value}
                            onChange={(e) => handleLinkChange(platform, e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="border-t border-zinc-700 pt-6">
                    <h3 className="text-lg font-medium text-zinc-300 mb-4">
                      Social Media
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(editForm.socials).map(([platform, value]) => (
                        <div key={platform}>
                          <label className="block text-sm font-medium text-zinc-300 mb-1 capitalize">
                            {platform === 'x' ? 'Twitter/X' : platform}
                          </label>
                          <input
                            type={platform === 'discord' ? 'text' : 'url'}
                            value={value}
                            onChange={(e) => handleSocialChange(platform, e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-zinc-700">
                    <button
                      onClick={() => handleSave(editingMember)}
                      disabled={isLoading}
                      className="flex-1 flex items-center justify-center px-6 py-3 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                    >
                      <Save className="w-5 h-5 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCloseEdit}
                      disabled={isLoading}
                      className="px-6 py-3 bg-zinc-600 cursor-pointer text-white rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/90 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full border border-zinc-700">
              <h3 className="text-lg font-semibold text-white mb-2">
                Delete Team Member
              </h3>
              <p className="text-zinc-300 mb-6">
                Are you sure you want to delete this team member? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  disabled={isLoading}
                  className="px-4 py-2 text-zinc-300 cursor-pointer hover:text-white disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? 'Deleting...' : 'Delete Member'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMembers;