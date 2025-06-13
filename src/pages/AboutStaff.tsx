
import Navigation from '@/components/Navigation';
import { Award, Users, Heart, Star, Trophy, Target, BookOpen, Globe } from 'lucide-react';

const achievements = [
  {
    icon: Award,
    title: 'Excellence in Education',
    description: 'Recognized as one of the top educational institutions in the region',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Star,
    title: 'Outstanding Faculty',
    description: '95% of our teachers hold advanced degrees in their respective fields',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: Trophy,
    title: 'Student Success Rate',
    description: '98% of our students achieve their academic goals and excel in their studies',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    icon: Heart,
    title: 'Community Impact',
    description: 'Over 500 community service hours contributed by our staff annually',
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: Target,
    title: 'Innovation Leaders',
    description: 'Pioneering modern teaching methods and educational technology',
    color: 'from-red-400 to-pink-500'
  },
  {
    icon: Globe,
    title: 'Global Recognition',
    description: 'International partnerships with educational institutions worldwide',
    color: 'from-teal-400 to-cyan-500'
  }
];

const values = [
  {
    title: 'Excellence',
    description: 'We strive for the highest standards in everything we do',
    icon: '🎯'
  },
  {
    title: 'Innovation',
    description: 'Embracing new ideas and modern teaching methodologies',
    icon: '💡'
  },
  {
    title: 'Collaboration',
    description: 'Working together to achieve common goals and support each other',
    icon: '🤝'
  },
  {
    title: 'Integrity',
    description: 'Maintaining honesty, transparency, and ethical standards',
    icon: '⚖️'
  },
  {
    title: 'Growth',
    description: 'Continuous learning and development for staff and students',
    icon: '🌱'
  },
  {
    title: 'Care',
    description: 'Nurturing and supporting every member of our school community',
    icon: '❤️'
  }
];

const AboutStaff = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              About Our Staff
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our dedicated team of educators, administrators, and support staff work tirelessly to create 
              an environment where every student can thrive and reach their full potential.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/30 mb-16 animate-scale-in">
            <div className="text-center">
              <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                To provide exceptional education through innovative teaching methods, personalized attention, 
                and a nurturing environment that fosters intellectual curiosity, character development, and 
                lifelong learning. Our staff is committed to excellence in education and the holistic 
                development of every student.
              </p>
            </div>
          </div>

          {/* Staff Values */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 border border-white/25 hover:bg-white/25 transition-all duration-500 hover:scale-105 animate-fade-in hover-scale"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in">
              Our Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.title}
                    className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 border border-white/25 hover:bg-white/25 transition-all duration-500 hover:scale-105 animate-fade-in hover-scale"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${achievement.color} mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{achievement.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Staff Statistics */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white animate-scale-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Our Team by Numbers</h2>
              <p className="text-blue-100 text-lg">
                A diverse and experienced team dedicated to educational excellence
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">10</div>
                <div className="text-blue-100">Head Staff</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">11</div>
                <div className="text-blue-100">Head Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">35</div>
                <div className="text-blue-100">Primary Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">40</div>
                <div className="text-blue-100">Senior Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">12</div>
                <div className="text-blue-100">Student Prefects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">10</div>
                <div className="text-blue-100">Support Staff</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-blue-100">Avg. Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Retention Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStaff;
