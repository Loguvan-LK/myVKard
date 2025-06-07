import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { CreditCard, Globe, Plus, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (!user) fetchUserData();
    // eslint-disable-next-line
  }, [setUser]);

  const addUrl = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/add-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: newUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setNewUrl('');
        toast.success('URL added successfully');
      } else {
        toast.error(data.message || 'Failed to add URL');
      }
    } catch (error) {
      console.error('Add URL error:', error);
      toast.error('Failed to add URL');
    } finally {
      setLoading(false);
    }
  };

  const removeUrl = async (urlId) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/remove-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ urlId }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        toast.success('URL removed successfully');
      } else {
        toast.error(data.message || 'Failed to remove URL');
      }
    } catch (error) {
      console.error('Remove URL error:', error);
      toast.error('Failed to remove URL');
    } finally {
      setLoading(false);
    }
  };

  const setActiveUrl = async (urlId) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/set-active-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ urlId }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        toast.success('Active URL set successfully');
      } else {
        toast.error(data.message || 'Failed to set active URL');
      }
    } catch (error) {
      console.error('Set active URL error:', error);
      toast.error('Failed to set active URL');
    } finally {
      setLoading(false);
    }
  };
if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Please log in to access your dashboard.</p>
    </div>
  );
}

if (user.nfcCardCount <= 0) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Please purchase an NFC card to manage URLs.</p>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user.email.split('@')[0]}!
          </h1>
          <p className="text-gray-600">Manage your NFC card URLs</p>
          <div className="mt-4 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span>Total Cards: {user.nfcCardCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <span>Card URL: myvkard.io/{user.uniqueId}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Your URLs</h2>
          {user.urls.length === 0 ? (
            <p className="text-gray-500">No URLs added yet.</p>
          ) : (
            <div className="space-y-4">
              {user.urls.map((url) => (
                <div key={url._id} className="flex justify-between items-center border p-4 rounded-md">
                  <div>
                    <p className="font-semibold">{url.url}</p>
                    {url.isActive && <span className="text-green-600"> (Active)</span>}
                  </div>
                  <div className="flex space-x-4">
                    {!url.isActive && (
                      <button
                        onClick={() => setActiveUrl(url._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Set Active
                      </button>
                    )}
                    <button
                      onClick={() => removeUrl(url._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Add New URL</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Enter your URL"
                className="flex-1 border p-2 rounded"
              />
              <button
                onClick={addUrl}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;