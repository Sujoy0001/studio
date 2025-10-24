import React, { useState } from 'react';
import { Save, Upload, Image as ImageIcon, X, Plus, Link, Mail } from 'lucide-react';
import teamStore from '../store/teamStore.js';

const AddMember = () => {
  const { createTeamMember } = teamStore();
  const [formData, setFormData] = useState({
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
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [platform]: value
      }
    }));
  };

  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
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

  // Simulate image upload
  const handleImageUpload = async (file) => {
    setUploadingImage(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would upload to a service like Cloudinary, AWS S3, etc.
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, img: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Prepare data for API - merge links and socials into single links object
      const apiData = {
        name: formData.name,
        role: formData.role,
        description: formData.description,
        skills: formData.skills,
        email: formData.email,
        links: {
          ...formData.links,
          ...formData.socials
        },
        img: formData.img,
        urlName: formData.urlName
      };
      console.log("Submitting team member data:", apiData);
      
      // Call the actual API through your store
      await createTeamMember(apiData);
      
      // Reset form after successful submission
      setFormData({
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
      });
      
      // Success message is handled by the store
      alert('Member added successfully!');
      
    } catch (error) {
      console.error('Error adding member:', error);
      // Error message is already set in the store, but show alert for user feedback
      alert(error.message || 'Error adding member. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateUrlName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="min-h-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl sujoy font-bold text-white mb-4">
            Add Team Member
          </h1>
          <p className="text-lg sujoy3 text-zinc-300">
            Add a new member to your team
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-800 rounded-lg p-8 border border-zinc-700">
          <div className="space-y-8">
            {/* Profile Image Upload */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Profile Image
              </label>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-zinc-700 rounded-lg border-2 border-dashed border-zinc-600 overflow-hidden">
                    {formData.img ? (
                      <img
                        src={formData.img}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-zinc-500" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-2">
                      Upload Profile Image
                    </label>
                    <div className="flex gap-3">
                      <label className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="flex items-center justify-center px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-md hover:bg-zinc-600 transition-colors cursor-pointer">
                          <Upload className="w-4 h-4 mr-2 text-zinc-300" />
                          <span className="text-zinc-300 text-sm">
                            {uploadingImage ? 'Uploading...' : 'Choose File'}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-2">
                      Or Enter Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.img}
                      onChange={(e) => handleInputChange('img', e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400 text-sm"
                      placeholder="https://example.com/profile.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    handleInputChange('name', e.target.value);
                    // Auto-generate URL name
                    handleInputChange('urlName', generateUrlName(e.target.value));
                  }}
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Role/Position *
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                  placeholder="e.g., Full Stack Developer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                    placeholder="member@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  URL Name
                </label>
                <input
                  type="text"
                  value={formData.urlName}
                  onChange={(e) => handleInputChange('urlName', e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                  placeholder="e.g., sujoy-garai"
                />
                <p className="text-xs text-zinc-400 mt-1">
                  Used in URLs like /team/{formData.urlName || 'member-name'}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Description/Bio *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows="4"
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                placeholder="Tell us about this team member..."
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Skills & Technologies
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.skills.map((skill, index) => (
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
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleTechKeyPress}
                  placeholder="Add a skill..."
                  className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Professional Links */}
            <div className="border-t border-zinc-700 pt-6">
              <h3 className="text-lg font-medium text-zinc-300 mb-4 flex items-center gap-2">
                <Link className="w-5 h-5" />
                Professional Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={formData.links.linkedin}
                    onChange={(e) => handleLinkChange('linkedin', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    GitHub
                  </label>
                  <input
                    type="url"
                    value={formData.links.github}
                    onChange={(e) => handleLinkChange('github', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    value={formData.links.portfolio}
                    onChange={(e) => handleLinkChange('portfolio', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                    placeholder="https://portfolio.com"
                  />
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="border-t border-zinc-700 pt-6">
              <h3 className="text-lg font-medium text-zinc-300 mb-4">
                Social Media
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.socials.instagram}
                    onChange={(e) => handleSocialChange('instagram', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                    placeholder="https://instagram.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Twitter/X
                  </label>
                  <input
                    type="url"
                    value={formData.socials.x}
                    onChange={(e) => handleSocialChange('x', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                    placeholder="https://x.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={formData.socials.facebook}
                    onChange={(e) => handleSocialChange('facebook', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                    placeholder="https://facebook.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Discord
                  </label>
                  <input
                    type="text"
                    value={formData.socials.discord}
                    onChange={(e) => handleSocialChange('discord', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                    placeholder="username#1234"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-6 border-t border-zinc-700">
              <button
                type="submit"
                disabled={isLoading || uploadingImage}
                className="flex-1 flex items-center justify-center cursor-pointer px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                {isLoading ? 'Adding Member...' : 'Add Team Member'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear the form?')) {
                    setFormData({
                      name: '',
                      role: '',
                      description: '',
                      skills: [],
                      email: '',
                      links: { linkedin: '', github: '', portfolio: '' },
                      socials: { facebook: '', instagram: '', x: '', discord: '' },
                      img: '',
                      urlName: '',
                    });
                  }
                }}
                className="px-6 py-3 bg-zinc-600 text-white cursor-pointer rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-colors"
              >
                Clear Form
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;