
import { GraduationCap, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Staff', path: '/about-staff' },
    { name: 'Head Staff', path: '/head-staff' },
    { name: 'Head Teachers', path: '/head-teachers' },
    { name: 'Primary Teachers', path: '/primary-teachers' },
  ];

  const supportLinks = [
    { name: 'Senior Teachers', path: '/senior-teachers' },
    { name: 'Student Prefects', path: '/student-prefects' },
    { name: 'Security & Cleaning', path: '/security-cleaning' },
    { name: 'Group Photo', path: '/group-photo' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">
                Staff Directory
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Dedicated to showcasing our exceptional team of educators, leaders, 
              and support staff who make our school a place of excellence and growth.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Education Street, Learning City</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@school.edu</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Staff Categories</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">More Staff</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* School Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Our Mission</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fostering excellence in education through dedicated staff, 
              innovative teaching methods, and a commitment to student success.
            </p>
            <div className="mt-4 p-4 bg-accent rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-red-500" />
                <span>100+ Staff Members</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                <GraduationCap className="h-4 w-4 text-blue-500" />
                <span>20+ Years Excellence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} School Staff Directory. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              Built with dedication and modern technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
