
import { useState, useEffect } from 'react';

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: string;
  experience: string;
  qualification: string;
  email: string;
  phone: string;
  image: string;
  description: string;
}

const generateStaffMembers = (count: number, category: string): StaffMember[] => {
  const names = [
    'Dr. Sarah Johnson', 'Prof. Michael Chen', 'Ms. Emily Rodriguez', 'Mr. David Wilson',
    'Dr. Lisa Thompson', 'Prof. James Anderson', 'Ms. Maria Garcia', 'Mr. Robert Taylor',
    'Dr. Jennifer Lee', 'Prof. William Brown', 'Ms. Ashley Davis', 'Mr. Christopher Miller',
    'Dr. Amanda Wilson', 'Prof. Daniel Moore', 'Ms. Jessica Martinez', 'Mr. Matthew Jackson',
    'Dr. Rachel White', 'Prof. Andrew Thomas', 'Ms. Nicole Harris', 'Mr. Joshua Clark',
    'Dr. Stephanie Lewis', 'Prof. Kevin Walker', 'Ms. Michelle Hall', 'Mr. Brandon Allen',
    'Dr. Melissa Young', 'Prof. Jason King', 'Ms. Lauren Wright', 'Mr. Alexander Green',
    'Dr. Christina Scott', 'Prof. Ryan Adams', 'Ms. Samantha Baker', 'Mr. Timothy Nelson',
    'Dr. Rebecca Carter', 'Prof. Jonathan Mitchell', 'Ms. Kimberly Perez', 'Mr. Nicholas Roberts',
    'Dr. Laura Turner', 'Prof. Mark Phillips', 'Ms. Elizabeth Campbell', 'Mr. Jacob Parker'
  ];

  const positions = {
    'head-staff': [
      'Principal', 'Vice Principal', 'Academic Director', 'Administrative Director',
      'Finance Director', 'Human Resources Director', 'Student Affairs Director',
      'Operations Manager', 'Quality Assurance Head', 'Development Coordinator'
    ],
    'head-teachers': [
      'Head of Mathematics', 'Head of Science', 'Head of English', 'Head of History',
      'Head of Geography', 'Head of Arts', 'Head of Physical Education', 'Head of Music',
      'Head of Computer Science', 'Head of Languages', 'Head of Social Studies'
    ],
    'primary-teachers': [
      'Grade 1 Teacher', 'Grade 2 Teacher', 'Grade 3 Teacher', 'Grade 4 Teacher',
      'Grade 5 Teacher', 'Art Teacher', 'Music Teacher', 'PE Teacher',
      'Library Teacher', 'Special Education Teacher'
    ],
    'senior-teachers': [
      'Mathematics Teacher', 'Physics Teacher', 'Chemistry Teacher', 'Biology Teacher',
      'English Teacher', 'History Teacher', 'Geography Teacher', 'Economics Teacher',
      'Computer Science Teacher', 'Psychology Teacher'
    ],
    'prefects': [
      'Head Boy', 'Head Girl', 'Deputy Head Boy', 'Deputy Head Girl',
      'Sports Captain', 'Cultural Captain', 'Academic Captain', 'Environmental Captain',
      'Community Service Captain', 'Technology Captain', 'Arts Captain', 'Music Captain'
    ],
    'security-cleaning': [
      'Security Supervisor', 'Security Guard', 'Maintenance Supervisor', 'Cleaner',
      'Groundskeeper', 'IT Support', 'Lab Assistant', 'Library Assistant',
      'Administrative Assistant', 'Transport Coordinator'
    ]
  };

  const departments = {
    'head-staff': ['Administration', 'Leadership', 'Management'],
    'head-teachers': ['Academic Department', 'Curriculum Development'],
    'primary-teachers': ['Primary Education', 'Elementary Learning'],
    'senior-teachers': ['Secondary Education', 'Advanced Studies'],
    'prefects': ['Student Leadership', 'Student Council'],
    'security-cleaning': ['Operations', 'Support Services', 'Maintenance']
  };

  const qualifications = [
    'Ph.D. in Education', 'Master of Education', 'Bachelor of Education',
    'Master of Arts', 'Bachelor of Arts', 'Master of Science',
    'Bachelor of Science', 'Diploma in Education', 'Certificate in Teaching',
    'Advanced Diploma'
  ];

  const experiences = ['2 years', '5 years', '8 years', '10 years', '12 years', '15 years', '18 years', '20+ years'];

  const images = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face'
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `${category}-${index + 1}`,
    name: names[index % names.length],
    position: positions[category as keyof typeof positions][index % positions[category as keyof typeof positions].length],
    department: departments[category as keyof typeof departments][index % departments[category as keyof typeof departments].length],
    experience: experiences[index % experiences.length],
    qualification: qualifications[index % qualifications.length],
    email: `${names[index % names.length].toLowerCase().replace(/[^a-z]/g, '')}@school.edu`,
    phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    image: images[index % images.length],
    description: `Dedicated educator with extensive experience in ${positions[category as keyof typeof positions][index % positions[category as keyof typeof positions].length].toLowerCase()}. Committed to fostering a positive learning environment and student success.`
  }));
};

export const useStaffData = (category: string, defaultCount: number) => {
  const [staff, setStaff] = useState<StaffMember[]>([]);

  useEffect(() => {
    const savedStaff = localStorage.getItem(`staff-${category}`);
    if (savedStaff) {
      setStaff(JSON.parse(savedStaff));
    } else {
      const generatedStaff = generateStaffMembers(defaultCount, category);
      setStaff(generatedStaff);
      localStorage.setItem(`staff-${category}`, JSON.stringify(generatedStaff));
    }
  }, [category, defaultCount]);

  const updateStaff = (id: string, updatedStaff: StaffMember) => {
    const newStaff = staff.map(member => member.id === id ? updatedStaff : member);
    setStaff(newStaff);
    localStorage.setItem(`staff-${category}`, JSON.stringify(newStaff));
  };

  const deleteStaff = (id: string) => {
    const newStaff = staff.filter(member => member.id !== id);
    setStaff(newStaff);
    localStorage.setItem(`staff-${category}`, JSON.stringify(newStaff));
  };

  const addStaff = (newStaff: Omit<StaffMember, 'id'>) => {
    const staffWithId = {
      ...newStaff,
      id: `${category}-${Date.now()}`
    };
    const newStaffList = [...staff, staffWithId];
    setStaff(newStaffList);
    localStorage.setItem(`staff-${category}`, JSON.stringify(newStaffList));
  };

  return { staff, updateStaff, deleteStaff, addStaff };
};
