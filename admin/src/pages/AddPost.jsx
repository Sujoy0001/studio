import React, { useState, useEffect } from 'react';
import { Upload, FileText, Send, ImagePlus, AlertCircle, CheckCircle } from 'lucide-react';

export default function AddPostPage() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Clean up the object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e) => {
    setError('');
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview('');
      setError('Please select a valid image file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setError('Please upload an image before submitting.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate an API call (e.g., uploading to Firebase Storage)
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // In a real app, you would upload the file and save the description
      console.log('Uploading file:', imageFile.name);
      console.log('With description:', description);

      setSuccess('Post uploaded successfully!');
      
      // Reset form
      setImageFile(null);
      setImagePreview('');
      setDescription('');

    } catch (err) {
      setError('An error occurred during upload. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-6xl sujoy font-bold text-white mb-2">
            Create a New Post
          </h2>
          <p className="text-zinc-400">
            Upload an image and share your story.
          </p>
        </div>

        {/* Add Post Form */}
        <form onSubmit={handleSubmit} className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 shadow-2xl">
          <div className="space-y-6">
            
            {/* Image Upload Area */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Image Upload
              </label>
              <label
                htmlFor="file-upload"
                className={`flex justify-center items-center w-full h-64 border-2 border-zinc-600 border-dashed rounded-lg cursor-pointer ${
                  imagePreview ? 'p-0' : 'p-6'
                } bg-zinc-700/50 hover:bg-zinc-700/70 transition-colors`}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <ImagePlus className="mx-auto h-12 w-12 text-zinc-400" />
                    <p className="mt-2 text-sm text-zinc-300">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-zinc-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </label>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
              />
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-2">
                Description (Optional)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                <textarea
                  id="description"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 transition-colors"
                  placeholder="Write a caption..."
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !imageFile}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Upload Post
                </>
              )}
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};
