
import Navigation from '@/components/Navigation';
import StaffCard from '@/components/StaffCard';
import { useSupabaseStaffData } from '@/hooks/useSupabaseStaffData';
import { useAuth } from '@/hooks/useAuth';
import { Heart, Plus, Users, Star, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PrimaryTeachers = () => {
  const { staff, loading, error, updateStaff, deleteStaff, addStaff, retryFetch } = useSupabaseStaffData('primary-teachers');
  const { isEditor } = useAuth();

  const handleAddNew = () => {
    const newStaff = {
      name: 'New Primary Teacher',
      position: 'Primary Teacher',
      department: 'Primary Education',
      experience: '3 years',
      qualification: 'Bachelor of Education',
      email: 'teacher@school.edu',
      phone: '+1 (555) 000-0000',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
      description: 'Passionate educator dedicated to nurturing young minds and fostering a love for learning.',
      category: 'primary-teachers'
    };
    addStaff(newStaff);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <Navigation />
        <div className="pt-24 flex items-center justify-center min-h-[50vh]"> {/* Added min-h for consistency */}
          <Loader2 className="h-8 w-8 animate-spin text-violet-600 mr-2" /> Loading primary teachers...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <Navigation />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error.message}</span>
                <Button onClick={retryFetch} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
        {/* Optional: <Footer /> if it makes sense for error pages */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Heart className="h-16 w-16 text-violet-600 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Primary Teachers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our dedicated primary teachers who nurture young minds with patience, creativity, and boundless enthusiasm for learning.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in">
              <Users className="h-8 w-8 text-violet-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">{staff.length}</div>
              <div className="text-sm text-gray-600">Primary Teachers</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in" style={{ animationDelay: '100ms' }}>
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">500+</div>
              <div className="text-sm text-gray-600">Students Taught</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="text-2xl mb-3">🌟</div>
              <div className="text-3xl font-bold text-gray-800">98%</div>
              <div className="text-sm text-gray-600">Parent Satisfaction</div>
            </div>
          </div>

          {/* Add New Button - Only show for editors */}
          {isEditor && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Primary Teacher
              </Button>
            </div>
          )}

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {staff.map((member, index) => (
              <div
                key={member.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
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

          {/* Teaching Philosophy */}
          <div className="mt-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white animate-scale-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Primary Education Philosophy</h2>
              <p className="text-lg text-violet-100 leading-relaxed max-w-4xl mx-auto">
                Our primary teachers believe in creating a nurturing environment where every child feels valued, 
                supported, and excited to learn. Through innovative teaching methods, hands-on activities, and 
                personalized attention, they lay the foundation for lifelong learning and personal growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryTeachers;
