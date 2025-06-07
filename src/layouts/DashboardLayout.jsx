import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore'; // adjust path as needed
import { loadCartFromBackend } from '../utils/loadCart';

const DashboardLayout = ({ children }) => {
  const { user, activeProfileId } = useAuthStore(); // adjust to your auth store
useEffect(() => {
  if (user && activeProfileId) {
    loadCartFromBackend(activeProfileId);
  }
}, [user, activeProfileId]);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
