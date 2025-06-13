
import Navigation from '@/components/Navigation';
import StaffCard from '@/components/StaffCard';
import { useSupabaseStaffData } from '@/hooks/useSupabaseStaffData';
import { useAuth } from '@/hooks/useAuth';
import { Star, Plus, Crown, Award, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StudentPrefects = () => {
  const { staff, loading, updateStaff, deleteStaff, addStaff } = useSupabaseStaffData('prefects');
  const { isEditor } = useAuth();

  const headPrefects = staff.filter(member => 
    member.position.includes('Head Boy') || member.position.includes('Head Girl')
  );
  
  const deputyPrefects = staff.filter(member => 
    member.position.includes('Deputy') || (!member.position.includes('Head Boy') && !member.position.includes('Head Girl'))
  );

  const handleAddNew = () => {
    const newStaff = {
      name: 'New Student Prefect',
      position: 'Prefect',
      department: 'Student Leadership',
      experience: '1 year',
      qualification: 'Grade 12 Student',
      email: 'prefect@school.edu',
      phone: '+1 (555) 000-0000',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      description: 'Dedicated student leader committed to serving the school community with integrity and enthusiasm.',
      category: 'prefects'
    };
    addStaff(newStaff);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <Navigation />
        <div className="pt-24 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Star className="h-16 w-16 text-yellow-600 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent mb-6">
              Student Prefects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our outstanding student leaders who represent their peers and contribute to the positive school culture and community spirit.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in">
              <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">{headPrefects.length}</div>
              <div className="text-sm text-gray-600">Head Prefects</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in" style={{ animationDelay: '100ms' }}>
              <Star className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">{deputyPrefects.length}</div>
              <div className="text-sm text-gray-600">Deputy & Specialized Prefects</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="text-2xl mb-3">🌟</div>
              <div className="text-3xl font-bold text-gray-800">100%</div>
              <div className="text-sm text-gray-600">Leadership Excellence</div>
            </div>
          </div>

          {/* Add New Button - Only show for editors */}
          {isEditor && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Prefect
              </Button>
            </div>
          )}

          {/* Head Prefects Section */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-8">
              <Crown className="h-8 w-8 text-yellow-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Head Prefects</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {headPrefects.map((member, index) => (
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
          </div>

          {/* Deputy and Specialized Prefects */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <Award className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Deputy & Specialized Prefects</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {deputyPrefects.map((member, index) => (
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
          </div>

          {/* Leadership Philosophy */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white animate-scale-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Student Leadership Values</h2>
              <p className="text-lg text-yellow-100 leading-relaxed max-w-4xl mx-auto">
                Our student prefects embody the values of integrity, service, and excellence. They serve as role models 
                for their peers, bridge communication between students and staff, and lead various initiatives that 
                enhance the school experience for everyone. Their dedication to service and leadership development 
                prepares them for future success in all endeavors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPrefects;
