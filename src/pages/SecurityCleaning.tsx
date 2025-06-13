
import Navigation from '@/components/Navigation';
import StaffCard from '@/components/StaffCard';
import { useSupabaseStaffData } from '@/hooks/useSupabaseStaffData';
import { useAuth } from '@/hooks/useAuth';
import { Shield, Plus, Users, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SecurityCleaning = () => {
  const { staff, loading, updateStaff, deleteStaff, addStaff } = useSupabaseStaffData('security-cleaning');
  const { isEditor } = useAuth();

  const handleAddNew = () => {
    const newStaff = {
      name: 'New Support Staff',
      position: 'Support Staff',
      department: 'Operations',
      experience: '2 years',
      qualification: 'High School Diploma',
      email: 'support@school.edu',
      phone: '+1 (555) 000-0000',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      description: 'Dedicated support staff member ensuring a safe and clean learning environment for all.',
      category: 'security-cleaning'
    };
    addStaff(newStaff);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <Navigation />
        <div className="pt-24 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Shield className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-6">
              Security & Cleaning Staff
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our essential support team who ensure a safe, clean, and well-maintained learning environment for our entire school community.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">{staff.length}</div>
              <div className="text-sm text-gray-600">Support Staff</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in" style={{ animationDelay: '100ms' }}>
              <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">24/7</div>
              <div className="text-sm text-gray-600">Security Coverage</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="text-2xl mb-3">🛡️</div>
              <div className="text-3xl font-bold text-gray-800">100%</div>
              <div className="text-sm text-gray-600">Safety Standards</div>
            </div>
          </div>

          {/* Add New Button - Only show for editors */}
          {isEditor && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Support Staff
              </Button>
            </div>
          )}

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {staff.map((member, index) => (
              <div
                key={member.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <StaffCard
                  staff={member}
                  onUpdate={updateStaff}
                  onDelete={deleteStaff}
                  canEdit={isEditor}
                />
              </div>
            ))}
          </div>

          {/* Importance Statement */}
          <div className="mt-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-white animate-scale-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Essential Support Services</h2>
              <p className="text-lg text-green-100 leading-relaxed max-w-4xl mx-auto">
                Our security and cleaning staff are the unsung heroes of our school. They work tirelessly behind the 
                scenes to maintain a safe, healthy, and conducive learning environment. Their dedication ensures that 
                students and staff can focus on education without worrying about safety or cleanliness. We deeply 
                appreciate their commitment and hard work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCleaning;
