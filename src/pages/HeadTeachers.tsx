
import Navigation from '@/components/Navigation';
import StaffCard from '@/components/StaffCard';
import { useSupabaseStaffData } from '@/hooks/useSupabaseStaffData';
import { useAuth } from '@/hooks/useAuth';
import { GraduationCap, Plus, BookOpen, Award, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeadTeachers = () => {
  const { staff, loading, updateStaff, deleteStaff, addStaff } = useSupabaseStaffData('head-teachers');
  const { isEditor } = useAuth();

  const handleAddNew = () => {
    const newStaff = {
      name: 'New Head Teacher',
      position: 'Head of Department',
      department: 'Academic Department',
      experience: '8 years',
      qualification: 'Master of Education',
      email: 'headteacher@school.edu',
      phone: '+1 (555) 000-0000',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      description: 'Experienced department head committed to academic excellence and student success.',
      category: 'head-teachers'
    };
    addStaff(newStaff);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <Navigation />
        <div className="pt-24 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <GraduationCap className="h-16 w-16 text-pink-600 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent mb-6">
              Head Teachers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our experienced department heads who lead their teams with passion and expertise, ensuring high-quality education across all subjects.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in">
              <BookOpen className="h-8 w-8 text-pink-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">{staff.length}</div>
              <div className="text-sm text-gray-600">Department Heads</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in" style={{ animationDelay: '100ms' }}>
              <Award className="h-8 w-8 text-rose-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">15+</div>
              <div className="text-sm text-gray-600">Avg Years Experience</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="text-2xl mb-3">📚</div>
              <div className="text-3xl font-bold text-gray-800">100%</div>
              <div className="text-sm text-gray-600">Master's Degrees</div>
            </div>
          </div>

          {/* Add New Button - Only show for editors */}
          {isEditor && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Head Teacher
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

          {/* Teaching Excellence */}
          <div className="mt-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl p-8 md:p-12 text-white animate-scale-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Academic Excellence Standards</h2>
              <p className="text-lg text-pink-100 leading-relaxed max-w-4xl mx-auto">
                Our head teachers set the highest standards for academic excellence. They mentor their teams, 
                develop innovative curricula, and ensure that every student receives the best possible education. 
                Their dedication to continuous improvement and student success drives our institution forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadTeachers;
