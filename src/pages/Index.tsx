
import { Link } from 'react-router-dom';
import { Users, Camera, Award, GraduationCap, Shield, ArrowRight, Star, Heart, Trophy, LogIn, LogOut } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const sections = [
  {
    title: 'About Our Staff',
    description: 'Learn about our dedicated team and their achievements',
    icon: Users,
    path: '/about-staff',
    color: 'from-blue-500 to-purple-600',
    delay: '0ms'
  },
  {
    title: 'Group Photo',
    description: 'See our complete staff family in action',
    icon: Camera,
    path: '/group-photo',
    color: 'from-emerald-500 to-teal-600',
    delay: '100ms'
  },
  {
    title: 'Head Staff',
    description: 'Meet our leadership team driving excellence',
    icon: Award,
    path: '/head-staff',
    color: 'from-orange-500 to-red-600',
    delay: '200ms'
  },
  {
    title: 'Head Teachers',
    description: 'Experienced educators leading our academic programs',
    icon: GraduationCap,
    path: '/head-teachers',
    color: 'from-pink-500 to-rose-600',
    delay: '300ms'
  },
  {
    title: 'Primary Teachers',
    description: 'Nurturing young minds with care and expertise',
    icon: Heart,
    path: '/primary-teachers',
    color: 'from-violet-500 to-purple-600',
    delay: '400ms'
  },
  {
    title: 'Senior Teachers',
    description: 'Guiding senior students towards their goals',
    icon: Trophy,
    path: '/senior-teachers',
    color: 'from-indigo-500 to-blue-600',
    delay: '500ms'
  },
  {
    title: 'Student Prefects',
    description: 'Student leaders making a difference',
    icon: Star,
    path: '/student-prefects',
    color: 'from-yellow-500 to-orange-600',
    delay: '600ms'
  },
  {
    title: 'Security & Cleaning',
    description: 'Ensuring a safe and clean learning environment',
    icon: Shield,
    path: '/security-cleaning',
    color: 'from-green-500 to-emerald-600',
    delay: '700ms'
  },
];

const Index = () => {
  const { user, isEditor, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 dark:from-background dark:via-background dark:to-accent/10">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-6">
              Staff Directory
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover our exceptional team of educators, leaders, and support staff who make our school a place of excellence and growth.
            </p>
            
            {/* Editor Controls */}
            {user && isEditor && (
              <div className="flex justify-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ Editor Access Active
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-scale-in">
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl p-6 border border-border/50 shadow-lg">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Total Staff</div>
            </div>
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl p-6 border border-border/50 shadow-lg">
              <div className="text-3xl font-bold text-primary">20+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl p-6 border border-border/50 shadow-lg">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl p-6 border border-border/50 shadow-lg">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.path}
                  to={section.path}
                  className="group block animate-fade-in hover-scale"
                  style={{ animationDelay: section.delay }}
                >
                  <div className="relative bg-card/80 backdrop-blur-lg rounded-2xl p-6 border border-border/50 hover:bg-card transition-all duration-500 hover:shadow-2xl hover:border-primary/20 h-full">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${section.color} mb-4 shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {section.description}
                    </p>
                    
                    <div className="flex items-center text-primary text-sm font-medium group-hover:text-primary/80 transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
