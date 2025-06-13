
import Navigation from '@/components/Navigation';
import StaffCard from '@/components/StaffCard';
import { useSupabaseStaffData } from '@/hooks/useSupabaseStaffData';
import { useAuth } from '@/hooks/useAuth';
import { Trophy, Plus, Users, Target, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SeniorTeachers = () => {
  const { staff, loading, updateStaff, deleteStaff, addStaff } = useSupabaseStaffData('senior-teachers');
  const { isEditor } = useAuth();

  const handleAddNew = () => {
    const newStaff = {
      name: 'New Senior Teacher',
      position: 'Senior Teacher',
      department: 'Secondary Education',
      experience: '7 years',
      qualification: 'Master of Science',
      email: 'senior.teacher@school.edu',
      phone: '+1 (555) 000-0000',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      description: 'Experienced educator specializing in preparing students for their future academic and career goals.',
      category: 'senior-teachers'
    };
    addStaff(newStaff);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <Navigation />
        <div className="pt-24 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Trophy className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent mb-6">
              Senior Teachers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our experienced senior teachers who guide students through their final years, preparing them for higher education and future careers.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in">
              <Users className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">{staff.length}</div>
              <div className="text-sm text-gray-600">Senior Teachers</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in" style={{ animationDelay: '100ms' }}>
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">96%</div>
              <div className="text-sm text-gray-600">College Acceptance Rate</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="text-2xl mb-3">🎓</div>
              <div className="text-3xl font-bold text-gray-800">85%</div>
              <div className="text-sm text-gray-600">Advanced Qualifications</div>
            </div>
          </div>

          {/* Add New Button - Only show for editors */}
          {isEditor && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Senior Teacher
              </Button>
            </div>
          )}

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {staff.map((member, index) => (
              <div
                key={member.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 40}ms` }}
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

          {/* Academic Excellence */}
          <div className="mt-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white animate-scale-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Senior Education Excellence</h2>
              <p className="text-lg text-indigo-100 leading-relaxed max-w-4xl mx-auto">
                Our senior teachers are specialists in their fields, bringing advanced knowledge and real-world 
                experience to the classroom. They challenge students to think critically, explore complex concepts, 
                and develop the skills needed for success in higher education and their chosen careers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeniorTeachers;
