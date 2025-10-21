import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, X, Save, Plus, Upload, Image as ImageIcon, Search } from 'lucide-react';

// Sample data
const initialProjects = [
  {
    id: 1,
    name: "Dokhra E-commerce Website",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    description: "A beautifully crafted e-commerce platform showcasing traditional Dokhra handcrafted art pieces. The website allows users to explore, purchase, and learn about the artisan process behind each creation, connecting local artisans to global customers.",
    tech: ["Node.js", "React", "MongoDB", "TailwindCSS"],
    review: {
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      name: "Animesh maji",
      role: "Founder of Uniquedokhraworkshop",
      text: "The Dokra website is an absolute masterpiece! The design beautifully showcases the intricate metal art, and the product pages are clean, visually appealing, and easy to navigate. The site truly captures the essence of traditional craftsmanship while maintaining a modern, user-friendly interface. Highly recommended for art lovers! Highly recommend their work!",
    },
    liveLink: "https://www.uniquedokraworkshop.com",
  },
  {
    id: 2,
    name: "Portfolio Website",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    description: "A modern portfolio website showcasing creative work and projects.",
    tech: ["React", "JavaScript", "CSS3"],
    review: {
      img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      name: "John Doe",
      role: "Creative Director",
      text: "Excellent work on the portfolio design! The website perfectly represents my brand and showcases my work in a professional manner.",
    },
    liveLink: "https://example.com",
  },
  {
    id: 3,
    name: "Mobile Banking App",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    description: "A secure and user-friendly mobile banking application with advanced features.",
    tech: ["React Native", "Node.js", "Firebase", "TypeScript"],
    review: {
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      name: "Sarah Johnson",
      role: "Product Manager at FinTech Corp",
      text: "The mobile banking app exceeded our expectations. The security features are robust and the user interface is intuitive.",
    },
    liveLink: "https://bankingapp.com",
  }
];

const ManageProjects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [filteredProjects, setFilteredProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form state for editing
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    tech: [],
    liveLink: '',
    newTech: '',
    img: '',
    review: {
      name: '',
      role: '',
      text: '',
      img: ''
    }
  });

  // Filter projects based on search term
  useEffect(() => {
    const filtered = projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.review.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  // Initialize edit form when editing starts
  useEffect(() => {
    if (editingProject) {
      const project = projects.find(p => p.id === editingProject);
      if (project) {
        setEditForm({
          name: project.name,
          description: project.description,
          tech: [...project.tech],
          liveLink: project.liveLink,
          newTech: '',
          img: project.img,
          review: {
            name: project.review.name,
            role: project.review.role,
            text: project.review.text,
            img: project.review.img
          }
        });
      }
    }
  }, [editingProject, projects]);

  const handleEdit = (projectId) => {
    setEditingProject(projectId);
  };

  const handleCloseEdit = () => {
    setEditingProject(null);
    setEditForm({
      name: '',
      description: '',
      tech: [],
      liveLink: '',
      newTech: '',
      img: '',
      review: {
        name: '',
        role: '',
        text: '',
        img: ''
      }
    });
  };

  const handleSave = async (projectId) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProjects(projects.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              name: editForm.name,
              description: editForm.description,
              tech: editForm.tech,
              liveLink: editForm.liveLink,
              img: editForm.img,
              review: {
                ...project.review,
                name: editForm.review.name,
                role: editForm.review.role,
                text: editForm.review.text,
                img: editForm.review.img
              }
            }
          : project
      ));
      
      handleCloseEdit();
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProjects(projects.filter(project => project.id !== projectId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTech = () => {
    if (editForm.newTech.trim() && !editForm.tech.includes(editForm.newTech.trim())) {
      setEditForm({
        ...editForm,
        tech: [...editForm.tech, editForm.newTech.trim()],
        newTech: ''
      });
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setEditForm({
      ...editForm,
      tech: editForm.tech.filter(tech => tech !== techToRemove)
    });
  };

  const handleTechKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTech();
    }
  };

  const handleReviewChange = (field, value) => {
    setEditForm({
      ...editForm,
      review: {
        ...editForm.review,
        [field]: value
      }
    });
  };

  // Simulate image upload
  const handleImageUpload = async (field, file) => {
    setUploadingImage(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would upload to a service like Cloudinary, AWS S3, etc.
      // For demo, we'll create a blob URL
      const imageUrl = URL.createObjectURL(file);
      
      if (field === 'project') {
        setEditForm({ ...editForm, img: imageUrl });
      } else {
        setEditForm({
          ...editForm,
          review: { ...editForm.review, img: imageUrl }
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        handleImageUpload(field, file);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold sujoy text-white mb-4">
            Manage Projects
          </h1>
          <p className="text-lg sujoy3 text-zinc-300">
            View, edit, and delete your projects
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
              placeholder="Search projects by name, description, technologies, or client..."
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
              {filteredProjects.length} of {projects.length} projects found
            </span>
            {searchTerm && (
              <span>
                Searching for: "<span className="text-white">{searchTerm}</span>"
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-zinc-700"
            >
              {/* Project Image */}
              <div className="h-48 bg-zinc-700 relative">
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => window.open(project.liveLink, '_blank')}
                    className="p-2 bg-zinc-800 rounded-full shadow-md hover:bg-zinc-700 transition-colors border border-zinc-600"
                    title="View Live"
                  >
                    <Eye className="w-4 h-4 text-zinc-300" />
                  </button>
                  <button
                    onClick={() => handleEdit(project.id)}
                    disabled={isLoading}
                    className="p-2 bg-zinc-800 rounded-full shadow-md hover:bg-zinc-700 transition-colors disabled:opacity-50 border border-zinc-600"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4 text-green-400" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(project.id)}
                    disabled={isLoading}
                    className="p-2 bg-zinc-800 rounded-full shadow-md hover:bg-zinc-700 transition-colors disabled:opacity-50 border border-zinc-600"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.name}
                </h3>
                
                <p className="text-zinc-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-zinc-300 mb-2">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-zinc-700 text-zinc-200 text-xs font-medium rounded-full border border-zinc-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client Review */}
                <div className="border-t border-zinc-700 pt-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <img
                      src={project.review.img}
                      alt={project.review.name}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-600"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-white text-sm">
                        {project.review.name}
                      </h5>
                      <p className="text-xs text-zinc-400 mb-1">
                        {project.review.role}
                      </p>
                      <p className="text-sm text-zinc-300 italic line-clamp-2">
                        "{project.review.text}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && projects.length > 0 && (
          <div className="text-center py-12">
            <div className="bg-zinc-800 rounded-lg p-8 max-w-md mx-auto border border-zinc-700">
              <Search className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No projects found
              </h3>
              <p className="text-zinc-400 mb-4">
                No projects match your search for "<span className="text-white">{searchTerm}</span>"
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

        {/* No Projects Message */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-zinc-800 rounded-lg p-8 max-w-md mx-auto border border-zinc-700">
              <p className="text-zinc-400 text-lg mb-4">No projects found.</p>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                onClick={() => {
                  // Add functionality to create new project
                  alert('Add new project functionality would go here');
                }}
              >
                Add Your First Project
              </button>
            </div>
          </div>
        )}

        {/* Edit Project Modal */}
        {editingProject && (
          <div className="fixed inset-0 bg-black/90 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-zinc-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-zinc-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Edit Project
                  </h2>
                  <button
                    onClick={handleCloseEdit}
                    className="p-2 hover:bg-zinc-700 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-zinc-300" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Project Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-3">
                      Project Image
                    </label>
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 bg-zinc-700 rounded-lg border-2 border-dashed border-zinc-600 overflow-hidden">
                          {editForm.img ? (
                            <img
                              src={editForm.img}
                              alt="Project preview"
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
                            Upload New Image
                          </label>
                          <div className="flex gap-3">
                            <label className="flex-1">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange('project', e)}
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
                            value={editForm.img}
                            onChange={(e) => setEditForm({ ...editForm, img: e.target.value })}
                            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400 text-sm"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                        placeholder="Enter project name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1">
                        Live Link
                      </label>
                      <input
                        type="url"
                        value={editForm.liveLink}
                        onChange={(e) => setEditForm({ ...editForm, liveLink: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows="4"
                      className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                      placeholder="Enter project description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      Technologies
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {editForm.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-600 text-zinc-200"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => handleRemoveTech(tech)}
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
                        value={editForm.newTech}
                        onChange={(e) => setEditForm({ ...editForm, newTech: e.target.value })}
                        onKeyPress={handleTechKeyPress}
                        placeholder="Add technology..."
                        className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                      />
                      <button
                        type="button"
                        onClick={handleAddTech}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Client Review Section */}
                  <div className="border-t border-zinc-700 pt-6">
                    <h4 className="text-lg font-medium text-zinc-300 mb-4">Client Review</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-1">
                            Client Name
                          </label>
                          <input
                            type="text"
                            value={editForm.review.name}
                            onChange={(e) => handleReviewChange('name', e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                            placeholder="Client name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-1">
                            Client Role
                          </label>
                          <input
                            type="text"
                            value={editForm.review.role}
                            onChange={(e) => handleReviewChange('role', e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                            placeholder="Client role/position"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-1">
                            Client Image
                          </label>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 bg-zinc-700 rounded-full border-2 border-dashed border-zinc-600 overflow-hidden">
                                {editForm.review.img ? (
                                  <img
                                    src={editForm.review.img}
                                    alt="Client preview"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="w-5 h-5 text-zinc-500" />
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex-1">
                              <label className="block w-full">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileChange('client', e)}
                                  className="hidden"
                                />
                                <div className="flex items-center justify-center px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md hover:bg-zinc-600 transition-colors cursor-pointer">
                                  <Upload className="w-4 h-4 mr-2 text-zinc-300" />
                                  <span className="text-zinc-300 text-sm">
                                    {uploadingImage ? 'Uploading...' : 'Upload Photo'}
                                  </span>
                                </div>
                              </label>
                              <input
                                type="url"
                                value={editForm.review.img}
                                onChange={(e) => handleReviewChange('img', e.target.value)}
                                className="w-full mt-2 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400 text-sm"
                                placeholder="Or enter image URL"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1">
                          Review Text
                        </label>
                        <textarea
                          value={editForm.review.text}
                          onChange={(e) => handleReviewChange('text', e.target.value)}
                          rows="6"
                          className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                          placeholder="Client review text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-zinc-700">
                    <button
                      onClick={() => handleSave(editingProject)}
                      disabled={isLoading || uploadingImage}
                      className="flex-1 flex items-center justify-center cursor-pointer px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
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
            <div className="bg-zinc-900 rounded-lg p-6 max-w-md w-full border border-zinc-700">
              <h3 className="text-lg font-semibold text-white mb-2">
                Delete Project
              </h3>
              <p className="text-zinc-300 mb-6">
                Are you sure you want to delete this project? This action cannot be undone.
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
                  className="px-4 py-2 bg-red-600 text-white cursor-pointer rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? 'Deleting...' : 'Delete Project'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProjects;