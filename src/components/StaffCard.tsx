
import { useState } from 'react';
import { Edit3, Trash2, Save, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StaffMember {
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

interface StaffCardProps {
  staff: StaffMember;
  onUpdate: (id: string, updatedStaff: StaffMember) => void;
  onDelete: (id: string) => void;
  canEdit?: boolean;
}

const StaffCard = ({ staff, onUpdate, onDelete, canEdit = true }: StaffCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStaff, setEditedStaff] = useState(staff);
  const [imagePreview, setImagePreview] = useState(staff.image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setEditedStaff({ ...editedStaff, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdate(staff.id, editedStaff);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedStaff(staff);
    setImagePreview(staff.image);
    setIsEditing(false);
  };

  return (
    <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in">
      {/* Edit/Delete buttons for admins */}
      {canEdit && !isEditing && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0 bg-blue-500/20 hover:bg-blue-500/40 text-blue-600"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(staff.id)}
            className="h-8 w-8 p-0 bg-red-500/20 hover:bg-red-500/40 text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Save/Cancel buttons when editing */}
      {isEditing && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSave}
            className="h-8 w-8 p-0 bg-green-500/20 hover:bg-green-500/40 text-green-600"
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            className="h-8 w-8 p-0 bg-gray-500/20 hover:bg-gray-500/40 text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Profile Image */}
      <div className="relative mb-4 flex justify-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/30 shadow-lg">
          <img
            src={imagePreview || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
            alt={staff.name}
            className="w-full h-full object-cover"
          />
          {isEditing && (
            <label className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors">
              <Camera className="h-6 w-6 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Staff Details */}
      <div className="text-center space-y-3">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editedStaff.name}
              onChange={(e) => setEditedStaff({ ...editedStaff, name: e.target.value })}
              className="w-full text-lg font-bold text-center bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-500"
              placeholder="Name"
            />
            <input
              type="text"
              value={editedStaff.position}
              onChange={(e) => setEditedStaff({ ...editedStaff, position: e.target.value })}
              className="w-full text-sm font-medium text-center bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-blue-600 placeholder-gray-500"
              placeholder="Position"
            />
            <input
              type="text"
              value={editedStaff.department}
              onChange={(e) => setEditedStaff({ ...editedStaff, department: e.target.value })}
              className="w-full text-sm text-center bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-gray-600 placeholder-gray-500"
              placeholder="Department"
            />
            <input
              type="text"
              value={editedStaff.qualification}
              onChange={(e) => setEditedStaff({ ...editedStaff, qualification: e.target.value })}
              className="w-full text-sm text-center bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-gray-600 placeholder-gray-500"
              placeholder="Qualification"
            />
            <input
              type="text"
              value={editedStaff.experience}
              onChange={(e) => setEditedStaff({ ...editedStaff, experience: e.target.value })}
              className="w-full text-sm text-center bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-gray-600 placeholder-gray-500"
              placeholder="Experience"
            />
            <input
              type="email"
              value={editedStaff.email}
              onChange={(e) => setEditedStaff({ ...editedStaff, email: e.target.value })}
              className="w-full text-sm text-center bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-gray-600 placeholder-gray-500"
              placeholder="Email"
            />
            <input
              type="tel"
              value={editedStaff.phone}
              onChange={(e) => setEditedStaff({ ...editedStaff, phone: e.target.value })}
              className="w-full text-sm text-center bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-gray-600 placeholder-gray-500"
              placeholder="Phone"
            />
            <textarea
              value={editedStaff.description}
              onChange={(e) => setEditedStaff({ ...editedStaff, description: e.target.value })}
              className="w-full text-sm bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-gray-600 placeholder-gray-500 resize-none h-20"
              placeholder="Description"
            />
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-gray-800">{staff.name}</h3>
            <p className="text-sm font-medium text-blue-600">{staff.position}</p>
            <p className="text-sm text-gray-600">{staff.department}</p>
            
            <div className="space-y-2 pt-2 border-t border-white/20">
              <div className="text-xs text-gray-600">
                <span className="font-medium">Qualification:</span> {staff.qualification}
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-medium">Experience:</span> {staff.experience}
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-medium">Email:</span> {staff.email}
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-medium">Phone:</span> {staff.phone}
              </div>
            </div>
            
            {staff.description && (
              <p className="text-xs text-gray-600 pt-2 border-t border-white/20">
                {staff.description}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StaffCard;
