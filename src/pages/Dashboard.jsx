// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { CreditCard, Globe, Plus, Trash, Edit, User, Eye, X, Upload, Download, Share2, Building } from 'lucide-react';
import toast from 'react-hot-toast';
import { BASE_URL } from "../config/config";
import VisitingCard from '../components/VisitingCard'; // Import the external VisitingCard

const Dashboard = () => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showVisitingCard, setShowVisitingCard] = useState(false);
  const [previewCompany, setPreviewCompany] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    companyLocation: '',
    companyPhone: '',
    companyEmail: '',
    website: '',
    twitterX: '',
    youtube: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    description: '',
    industry: '',
    foundedYear: '',
    employeeCount: '',
    logo: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      try {
        const res = await fetch(`${BASE_URL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          console.error('Failed to fetch user data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [setUser]);

  const resetForm = () => {
    setFormData({
      companyName: '',
      companyLocation: '',
      companyPhone: '',
      companyEmail: '',
      website: '',
      twitterX: '',
      youtube: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      description: '',
      industry: '',
      foundedYear: '',
      employeeCount: '',
      logo: ''
    });
    setShowAddForm(false);
    setEditingCompany(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size should be less than 2MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/upload-logo`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, logo: data.logoUrl }));
        toast.success('Logo uploaded successfully');
      } else {
        toast.error(data.message || 'Failed to upload logo');
      }
    } catch (error) {
      console.error('Logo upload error:', error);
      toast.error('Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  const addCompanyProfile = async (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.companyLocation || 
        !formData.companyPhone || !formData.companyEmail) {
      return toast.error('Company name, location, phone and email are required');
    }

    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/api/add-company-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        resetForm();
        toast.success('Company profile added successfully');
      } else {
        toast.error(data.message || 'Failed to add company profile');
      }
    } catch (error) {
      console.error('Add company profile error:', error);
      toast.error('Failed to add company profile');
    } finally {
      setLoading(false);
    }
  };

  const updateCompanyProfile = async (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.companyLocation || 
        !formData.companyPhone || !formData.companyEmail) {
      return toast.error('Company name, location, phone and email are required');
    }

    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/api/update-company-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileId: editingCompany._id,
          ...formData
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        resetForm();
        toast.success('Company profile updated successfully');
      } else {
        toast.error(data.message || 'Failed to update company profile');
      }
    } catch (error) {
      console.error('Update company profile error:', error);
      toast.error('Failed to update company profile');
    } finally {
      setLoading(false);
    }
  };

  const removeCompanyProfile = async (profileId) => {
    if (!window.confirm('Are you sure you want to remove this company profile?')) return;

    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/api/remove-company-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profileId }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        toast.success('Company profile removed successfully');
      } else {
        toast.error(data.message || 'Failed to remove company profile');
      }
    } catch (error) {
      console.error('Remove company profile error:', error);
      toast.error('Failed to remove company profile');
    } finally {
      setLoading(false);
    }
  };

  const setActiveCompanyProfile = async (profileId) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/api/set-active-company-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profileId }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        toast.success('Active company profile set successfully');
      } else {
        toast.error(data.message || 'Failed to set active company profile');
      }
    } catch (error) {
      console.error('Set active company profile error:', error);
      toast.error('Failed to set active company profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (companyProfile) => {
    setEditingCompany(companyProfile);
    setFormData({
      companyName: companyProfile.companyName,
      companyLocation: companyProfile.companyLocation,
      companyPhone: companyProfile.companyPhone,
      companyEmail: companyProfile.companyEmail,
      website: companyProfile.website || '',
      twitterX: companyProfile.twitterX || '',
      youtube: companyProfile.youtube || '',
      instagram: companyProfile.instagram || '',
      facebook: companyProfile.facebook || '',
      linkedin: companyProfile.linkedin || '',
      description: companyProfile.description || '',
      industry: companyProfile.industry || '',
      foundedYear: companyProfile.foundedYear || '',
      employeeCount: companyProfile.employeeCount || '',
      logo: companyProfile.logo || ''
    });
    setShowAddForm(true);
  };

  const handlePreview = (companyProfile) => {
    setPreviewCompany(companyProfile);
    setShowVisitingCard(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-center">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  if (user.nfcCardCount <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-center">Please purchase an NFC card to manage company profiles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user.email.split('@')[0]}!
          </h1>
          <p className="text-gray-600 mb-4">Manage your company profiles</p>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-sm break-all">Card URL: myvkard.io/{user.uniqueId}</span>
            </div>
          </div>
        </div>

        {/* Company Profiles List */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
            <h2 className="text-xl sm:text-2xl font-bold">Your Company Profiles</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto"
            >
              <Plus size={20} />
              <span>Add Company Profile</span>
            </button>
          </div>

          {user.companyProfiles && user.companyProfiles.length === 0 ? (
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No company profiles added yet.</p>
              <p className="text-sm text-gray-400">Add your first company profile to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4 lg:gap-6">
              {user.companyProfiles && user.companyProfiles.map((profile) => (
                <div 
                  key={profile._id} 
                  className={`border rounded-lg p-4 transition-all ${profile.isActive ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        {profile.logo ? (
                          <img 
                            src={profile.logo} 
                            alt={`${profile.companyName} logo`}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                            {profile.companyName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-lg truncate">{profile.companyName}</h3>
                          {profile.industry && (
                            <p className="text-gray-600 text-sm truncate">{profile.industry}</p>
                          )}
                          {profile.isActive && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2 min-w-0">
                          <span>📧</span>
                          <span className="truncate">{profile.companyEmail}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>📞</span>
                          <span>{profile.companyPhone}</span>
                        </div>
                        {profile.website && (
                          <div className="flex items-center space-x-2 min-w-0">
                            <span>🌐</span>
                            <span className="truncate">{profile.website}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 min-w-0">
                          <span>📍</span>
                          <span className="truncate">{profile.companyLocation}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 flex-shrink-0">
                      <button
                        onClick={() => handlePreview(profile)}
                        className="flex-1 lg:flex-none p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors flex items-center justify-center"
                        title="Preview"
                      >
                        <Eye size={16} />
                        <span className="ml-1 lg:hidden text-sm">Preview</span>
                      </button>
                      <button
                        onClick={() => handleEdit(profile)}
                        className="flex-1 lg:flex-none p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors flex items-center justify-center"
                        title="Edit"
                      >
                        <Edit size={16} />
                        <span className="ml-1 lg:hidden text-sm">Edit</span>
                      </button>
                      {!profile.isActive && (
                        <button
                          onClick={() => setActiveCompanyProfile(profile._id)}
                          className="flex-1 lg:flex-none px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                          disabled={loading}
                        >
                          Set Active
                        </button>
                      )}
                      <button
                        onClick={() => removeCompanyProfile(profile._id)}
                        className="flex-1 lg:flex-none p-2 text-red-500 hover:bg-red-50 rounded transition-colors flex items-center justify-center"
                        title="Delete"
                        disabled={loading}
                      >
                        <Trash size={16} />
                        <span className="ml-1 lg:hidden text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add/Edit Company Profile Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-auto my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold">
                  {editingCompany ? 'Edit Company Profile' : 'Add New Company Profile'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={editingCompany ? updateCompanyProfile : addCompanyProfile} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Location *
                    </label>
                    <input
                      type="text"
                      name="companyLocation"
                      value={formData.companyLocation}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Phone *
                    </label>
                    <input
                      type="tel"
                      name="companyPhone"
                      value={formData.companyPhone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Email *
                    </label>
                    <input
                      type="email"
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Technology"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Founded Year
                    </label>
                    <input
                      type="number"
                      name="foundedYear"
                      value={formData.foundedYear}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 2020"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee Count
                    </label>
                    <input
                      type="text"
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 50-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Brief company description"
                    ></textarea>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Media
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500">Twitter/X</label>
                      <input
                        type="url"
                        name="twitterX"
                        value={formData.twitterX}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">LinkedIn</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://linkedin.com/company"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Facebook</label>
                      <input
                        type="url"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://facebook.com/page"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Instagram</label>
                      <input
                        type="url"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-500">YouTube</label>
                      <input
                        type="url"
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://youtube.com/channel"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    {formData.logo && (
                      <img 
                        src={formData.logo} 
                        alt="Logo preview"
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="w-full text-sm"
                        disabled={uploading}
                      />
                      {uploading && (
                        <p className="text-sm text-blue-600 mt-1">Uploading...</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Saving...' : (editingCompany ? 'Update Profile' : 'Add Profile')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Visiting Card Preview */}
        {showVisitingCard && previewCompany && (
          <VisitingCard
            companyProfile={previewCompany}
            onClose={() => {
              setShowVisitingCard(false);
              setPreviewCompany(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;