
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StaffCard from '@/components/StaffCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useSupabaseStaffData } from '@/hooks/useSupabaseStaffData';
import { useAuth } from '@/hooks/useAuth';
import { Award, Plus, Users, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const HeadStaff = () => {
  const { staff, loading, error, updateStaff, deleteStaff, addStaff, retryFetch } = useSupabaseStaffData('head-staff');
  const { isEditor } = useAuth();

  const handleAddNew = () => {
    const newStaff = {
      name: 'New Staff Member',
      position: 'Position',
      department: 'Administration',
      experience: '5 years',
      qualification: 'Master of Education',
      email: 'email@school.edu',
      phone: '+1 (555) 000-0000',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      description: 'Dedicated professional committed to educational excellence.',
      category: 'head-staff'
    };
    addStaff(newStaff);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 dark:from-background dark:via-background dark:to-accent/10">
        <Navigation />
        <div className="pt-24 flex items-center justify-center min-h-[50vh]">
          <LoadingSpinner size="lg" text="Loading head staff..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 dark:from-background dark:via-background dark:to-accent/10">
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 dark:from-background dark:via-background dark:to-accent/10">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Award className="h-16 w-16 text-orange-600 dark:text-orange-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 bg-clip-text text-transparent mb-6">
              Head Staff
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet our exceptional leadership team who guide our institution towards excellence and innovation in education.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl p-6 border border-border/50 text-center animate-scale-in shadow-lg">
              <Users className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">{staff.length}</div>
              <div className="text-sm text-muted-foreground">Leadership Members</div>
            </div>
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl p-6 border border-border/50 text-center animate-scale-in shadow-lg" style={{ animationDelay: '100ms' }}>
              <Award className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">25+</div>
              <div className="text-sm text-muted-foreground">Years Combined Experience</div>
            </div>
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl p-6 border border-border/50 text-center animate-scale-in shadow-lg" style={{ animationDelay: '200ms' }}>
              <div className="text-2xl mb-3">🏆</div>
              <div className="text-3xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Excellence Rate</div>
            </div>
          </div>

          {/* Add New Button - Only show for editors */}
          {isEditor && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Head Staff
              </Button>
            </div>
          )}

          {/* Staff Grid */}
          {staff.length > 0 ? (
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
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Head Staff Found</h3>
              <p className="text-muted-foreground mb-6">
                {isEditor 
                  ? "Start by adding the first head staff member to showcase your leadership team." 
                  : "Head staff information will be displayed here when available."
                }
              </p>
              {isEditor && (
                <Button onClick={handleAddNew} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Head Staff
                </Button>
              )}
            </div>
          )}

          {/* Leadership Philosophy */}
          <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 rounded-3xl p-8 md:p-12 text-white animate-scale-in shadow-2xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Our Leadership Philosophy</h2>
              <p className="text-lg text-orange-100 dark:text-orange-50 leading-relaxed max-w-4xl mx-auto">
                Our head staff believes in transformational leadership that empowers every member of our school community. 
                We foster an environment of collaboration, innovation, and continuous improvement, ensuring that our 
                institution remains at the forefront of educational excellence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HeadStaff;
