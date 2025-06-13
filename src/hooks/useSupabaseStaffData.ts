
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

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
  category: string;
}

export const useSupabaseStaffData = (category: string) => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isEditor } = useAuth();

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .eq('category', category)
        .order('name');

      if (error) {
        console.error('Error fetching staff:', error);
        throw new Error(error.message || 'Failed to fetch staff data');
      }
      
      setStaff(data || []);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to load staff data';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [category]);

  const updateStaff = async (id: string, updatedStaff: Partial<StaffMember>) => {
    if (!isEditor) {
      toast.error('You need to be logged in as an editor to modify staff data');
      return false;
    }

    try {
      const { error } = await supabase
        .from('staff')
        .update(updatedStaff)
        .eq('id', id);

      if (error) {
        console.error('Error updating staff:', error);
        throw new Error(error.message || 'Failed to update staff member');
      }

      setStaff(prev => prev.map(member => 
        member.id === id ? { ...member, ...updatedStaff } : member
      ));
      
      toast.success('Staff member updated successfully');
      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update staff member';
      toast.error(errorMessage);
      console.error('Error updating staff:', error);
      return false;
    }
  };

  const deleteStaff = async (id: string) => {
    if (!isEditor) {
      toast.error('You need to be logged in as an editor to delete staff');
      return false;
    }

    try {
      const { error } = await supabase
        .from('staff')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting staff:', error);
        throw new Error(error.message || 'Failed to delete staff member');
      }

      setStaff(prev => prev.filter(member => member.id !== id));
      toast.success('Staff member deleted successfully');
      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to delete staff member';
      toast.error(errorMessage);
      console.error('Error deleting staff:', error);
      return false;
    }
  };

  const addStaff = async (newStaff: Omit<StaffMember, 'id'>) => {
    if (!isEditor) {
      toast.error('You need to be logged in as an editor to add staff');
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('staff')
        .insert([{ ...newStaff, category }])
        .select()
        .single();

      if (error) {
        console.error('Error adding staff:', error);
        throw new Error(error.message || 'Failed to add staff member');
      }

      setStaff(prev => [...prev, data]);
      toast.success('Staff member added successfully');
      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to add staff member';
      toast.error(errorMessage);
      console.error('Error adding staff:', error);
      return false;
    }
  };

  const retryFetch = () => {
    fetchStaff();
  };

  return { 
    staff, 
    loading, 
    error, 
    updateStaff, 
    deleteStaff, 
    addStaff, 
    retryFetch 
  };
};
