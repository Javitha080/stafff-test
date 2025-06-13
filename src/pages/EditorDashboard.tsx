
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSupabaseStaffData } from '@/hooks/useSupabaseStaffData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Download,
  Upload,
  BarChart3,
  Settings,
  AlertCircle,
  CheckCircle,
  Crown
} from 'lucide-react';
import { toast } from 'sonner';
import type { StaffMember } from '@/hooks/useSupabaseStaffData';

const categories = [
  { value: 'head-staff', label: 'Head Staff' },
  { value: 'head-teachers', label: 'Head Teachers' },
  { value: 'primary-teachers', label: 'Primary Teachers' },
  { value: 'senior-teachers', label: 'Senior Teachers' },
  { value: 'prefects', label: 'Student Prefects' },
  { value: 'security-cleaning', label: 'Security & Cleaning' }
];

const EditorDashboard = () => {
  const { user, isEditor, loading: authLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('head-staff');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);

  const { staff, loading, error, updateStaff, deleteStaff, addStaff, retryFetch } = useSupabaseStaffData(selectedCategory);

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    experience: '',
    qualification: '',
    email: '',
    phone: '',
    image: '',
    description: '',
    category: selectedCategory
  });

  useEffect(() => {
    if (editingStaff) {
      setFormData({
        name: editingStaff.name,
        position: editingStaff.position,
        department: editingStaff.department,
        experience: editingStaff.experience,
        qualification: editingStaff.qualification,
        email: editingStaff.email,
        phone: editingStaff.phone,
        image: editingStaff.image,
        description: editingStaff.description || '',
        category: editingStaff.category
      });
    }
  }, [editingStaff]);

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      department: '',
      experience: '',
      qualification: '',
      email: '',
      phone: '',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      description: '',
      category: selectedCategory
    });
    setEditingStaff(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStaff) {
      const success = await updateStaff(editingStaff.id, formData);
      if (success) {
        setEditingStaff(null);
        resetForm();
      }
    } else {
      const success = await addStaff(formData);
      if (success) {
        setIsAddDialogOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      await deleteStaff(id);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedStaff.length === 0) {
      toast.error('No staff members selected');
      return;
    }

    if (confirm(`Are you sure you want to delete ${selectedStaff.length} staff members? This action cannot be undone.`)) {
      for (const staffId of selectedStaff) {
        await deleteStaff(staffId);
      }
      setSelectedStaff([]);
      setBulkMode(false);
    }
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStaff = staff.length;
  const departmentCounts = staff.reduce((acc, member) => {
    acc[member.department] = (acc[member.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 dark:from-background dark:via-background dark:to-accent/10 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading editor dashboard..." />
      </div>
    );
  }

  if (!user || !isEditor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 dark:from-background dark:via-background dark:to-accent/10">
        <Navigation />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-8">
              You need to be logged in as an authorized editor to access this page.
            </p>
            <Button asChild>
              <a href="/auth">Sign In</a>
            </Button>
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
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Crown className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold">Editor Dashboard</h1>
                  <p className="text-muted-foreground">Manage staff directory with full CRUD access</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Editor Access
              </Badge>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Staff</p>
                      <p className="text-2xl font-bold">{totalStaff}</p>
                    </div>
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Categories</p>
                      <p className="text-2xl font-bold">{categories.length}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Departments</p>
                      <p className="text-2xl font-bold">{Object.keys(departmentCounts).length}</p>
                    </div>
                    <Settings className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Category</p>
                      <p className="text-lg font-semibold">
                        {categories.find(c => c.value === selectedCategory)?.label}
                      </p>
                    </div>
                    <Filter className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value} className="text-xs">
                  {category.label.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.value} value={category.value} className="space-y-6">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-1 items-center space-x-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search staff..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button 
                      variant={bulkMode ? "destructive" : "outline"}
                      onClick={() => {
                        setBulkMode(!bulkMode);
                        setSelectedStaff([]);
                      }}
                    >
                      {bulkMode ? "Cancel" : "Bulk Actions"}
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    {bulkMode && selectedStaff.length > 0 && (
                      <Button variant="destructive" onClick={handleBulkDelete}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Selected ({selectedStaff.length})
                      </Button>
                    )}
                    
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Staff
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Add New Staff Member</DialogTitle>
                          <DialogDescription>
                            Fill in the details to add a new staff member to {category.label}.
                          </DialogDescription>
                        </DialogHeader>
                        <StaffForm 
                          formData={formData}
                          setFormData={setFormData}
                          onSubmit={handleSubmit}
                          isEditing={false}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Content */}
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <LoadingSpinner size="lg" text={`Loading ${category.label.toLowerCase()}...`} />
                  </div>
                ) : error ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                      <span>{error}</span>
                      <Button onClick={retryFetch} variant="outline" size="sm">
                        Retry
                      </Button>
                    </AlertDescription>
                  </Alert>
                ) : filteredStaff.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Staff Found</h3>
                      <p className="text-muted-foreground mb-6">
                        {searchTerm ? 
                          `No staff members match "${searchTerm}" in ${category.label}.` :
                          `No staff members in ${category.label} yet.`
                        }
                      </p>
                      {!searchTerm && (
                        <Button onClick={() => setIsAddDialogOpen(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add First Staff Member
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredStaff.map((member) => (
                      <StaffEditCard
                        key={member.id}
                        staff={member}
                        onEdit={setEditingStaff}
                        onDelete={handleDelete}
                        bulkMode={bulkMode}
                        isSelected={selectedStaff.includes(member.id)}
                        onSelect={(selected) => {
                          if (selected) {
                            setSelectedStaff([...selectedStaff, member.id]);
                          } else {
                            setSelectedStaff(selectedStaff.filter(id => id !== member.id));
                          }
                        }}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          {/* Edit Dialog */}
          <Dialog open={!!editingStaff} onOpenChange={(open) => !open && setEditingStaff(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Staff Member</DialogTitle>
                <DialogDescription>
                  Update the details for {editingStaff?.name}.
                </DialogDescription>
              </DialogHeader>
              <StaffForm 
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isEditing={true}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Staff Form Component
const StaffForm = ({ formData, setFormData, onSubmit, isEditing }: {
  formData: {
    name: string;
    position: string;
    department: string;
    experience: string;
    qualification: string;
    email: string;
    phone: string;
    image: string;
    description: string;
    category: string;
  };
  setFormData: (data: {
    name: string;
    position: string;
    department: string;
    experience: string;
    qualification: string;
    email: string;
    phone: string;
    image: string;
    description: string;
    category: string;
  }) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="position">Position *</Label>
        <Input
          id="position"
          value={formData.position}
          onChange={(e) => setFormData({...formData, position: e.target.value})}
          required
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="department">Department *</Label>
        <Input
          id="department"
          value={formData.department}
          onChange={(e) => setFormData({...formData, department: e.target.value})}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="experience">Experience *</Label>
        <Input
          id="experience"
          value={formData.experience}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
          required
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="qualification">Qualification *</Label>
      <Input
        id="qualification"
        value={formData.qualification}
        onChange={(e) => setFormData({...formData, qualification: e.target.value})}
        required
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="image">Image URL</Label>
      <Input
        id="image"
        type="url"
        value={formData.image}
        onChange={(e) => setFormData({...formData, image: e.target.value})}
        placeholder="https://example.com/image.jpg"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        rows={3}
        placeholder="Brief description about the staff member..."
      />
    </div>

    <div className="flex justify-end space-x-2 pt-4">
      <Button type="submit">
        {isEditing ? 'Update Staff' : 'Add Staff'}
      </Button>
    </div>
  </form>
);

// Staff Edit Card Component
const StaffEditCard = ({ 
  staff, 
  onEdit, 
  onDelete, 
  bulkMode, 
  isSelected, 
  onSelect 
}: {
  staff: StaffMember;
  onEdit: (staff: StaffMember) => void;
  onDelete: (id: string, name: string) => void;
  bulkMode: boolean;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
}) => (
  <Card className={`transition-all duration-200 hover:shadow-lg ${isSelected ? 'ring-2 ring-primary' : ''}`}>
    <CardContent className="p-4">
      {bulkMode && (
        <div className="mb-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(e.target.checked)}
            className="w-4 h-4 text-primary"
          />
        </div>
      )}
      
      <div className="flex items-start space-x-3">
        <img
          src={staff.image}
          alt={staff.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{staff.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{staff.position}</p>
          <p className="text-xs text-muted-foreground truncate">{staff.department}</p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mt-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit(staff)}
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(staff.id, staff.name)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default EditorDashboard;
