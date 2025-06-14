import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Position hierarchy map and helper function
const positionRankMap = new Map<string, number>([
  // Head Staff
  ['principal', 1],
  ['deputy principal', 2],
  ['assistant principal', 3],

  // Head Teachers (Order: Lower grade number first for "Head of Grade X")
  ['head of grade 1', 4],
  ['head of grade 2', 5],
  ['head of grade 3', 6],
  ['head of grade 4', 7],
  ['head of grade 5', 8],
  ['head of grade 6', 9],
  ['head of grade 7', 10],
  ['head of grade 8', 11],
  ['head of grade 9', 12],
  ['head of grade 10', 13],
  ['head of grade 11', 14],
  ['head of grade 12', 15],
  ['head of grade 13', 16],

  // Primary Teachers (Order: Lower grade number first)
  ['grade 1 teacher', 17],
  ['grade 2 teacher', 18],
  ['grade 3 teacher', 19],
  ['grade 4 teacher', 20],
  ['grade 5 teacher', 21],

  // Senior Teachers (Order: Lower grade number first)
  ['grade 6 teacher', 22],
  ['grade 7 teacher', 23],
  ['grade 8 teacher', 24],
  ['grade 9 teacher', 25],
  ['grade 10 teacher', 26],
  ['grade 11 teacher', 27],
  ['grade 12 teacher', 28],
  ['grade 13 teacher', 29],

  // Prefects
  ['head prefect', 30],
  ['deputy head prefect', 31],
  ['prefect', 32]
]);

export const getPositionRank = (position?: string): number => {
  if (!position) return 999; // Handle undefined or empty positions
  const normalizedPosition = position.trim().toLowerCase().replace(/\s\s+/g, ' '); // Trim, lowercase, replace multiple spaces with single
  return positionRankMap.get(normalizedPosition) || 999; // Positions not in map get a high rank
};

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
  display_order?: number;
}

export interface HookError {
  message: string;
  details?: string;
  code?: string;
}

export const useSupabaseStaffData = (category: string) => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<HookError | null>(null);
  const { isEditor } = useAuth();

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('staff')
        .select('*')
        .eq('category', category);
        // Removed .order() clause

      if (supabaseError) {
        console.error('Error fetching staff:', supabaseError);
        const hookError: HookError = {
          message: supabaseError.message || 'Failed to fetch staff data',
          details: supabaseError.details,
          code: supabaseError.code,
        };
        setError(hookError);
        toast.error(hookError.message);
        return;
      }
      
      if (data) {
        const sortedData = [...data].sort((a, b) => {
          const rankA = getPositionRank(a.position);
          const rankB = getPositionRank(b.position);

          if (rankA !== rankB) {
            return rankA - rankB;
          }
          // If ranks are the same, sort by name alphabetically
          return a.name.localeCompare(b.name);
        });
        setStaff(sortedData);
      } else {
        setStaff([]); // Ensure staff is empty array if data is null
      }
    } catch (err: any) {
      console.error('Error fetching staff:', err);
      const hookError: HookError = {
        message: err.message || 'An unexpected error occurred while loading staff data',
        details: err.details,
        code: err.code,
      };
      setError(hookError);
      toast.error(hookError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [category]);

  const updateStaff = async (id: string, updatedStaffData: Partial<StaffMember>) => {
    if (!isEditor) {
      toast.error('You need to be logged in as an editor to modify staff data');
      return false;
    }
    setError(null);
    try {
      const { error: supabaseError } = await supabase
        .from('staff')
        .update(updatedStaffData)
        .eq('id', id);

      if (supabaseError) {
        console.error('Error updating staff:', supabaseError);
        const hookError: HookError = {
          message: supabaseError.message || 'Failed to update staff member',
          details: supabaseError.details,
          code: supabaseError.code,
        };
        setError(hookError);
        toast.error(hookError.message);
        return false;
      }

      setStaff(prev => prev.map(member => 
        member.id === id ? { ...member, ...updatedStaffData } : member
      ));
      
      toast.success('Staff member updated successfully');
      setError(null);
      return true;
    } catch (err: any) {
      console.error('Error updating staff:', err);
      const hookError: HookError = {
        message: err.message || 'An unexpected error occurred while updating staff member',
        details: err.details,
        code: err.code,
      };
      setError(hookError);
      toast.error(hookError.message);
      return false;
    }
  };

  const deleteStaff = async (id: string) => {
    if (!isEditor) {
      toast.error('You need to be logged in as an editor to delete staff');
      return false;
    }
    setError(null);

    const originalStaff = [...staff];
    const staffMemberToDelete = originalStaff.find(member => member.id === id);

    if (!staffMemberToDelete) {
      console.error("Staff member to delete not found in local state.");
      const notFoundError: HookError = { message: "Item to delete was not found." };
      setError(notFoundError);
      return false;
    }

    setStaff(prev => prev.filter(member => member.id !== id)); // Optimistic update

    try {
      const { error: supabaseError } = await supabase
        .from('staff')
        .delete()
        .eq('id', id);

      if (supabaseError) {
        console.error('Error deleting staff:', supabaseError);
        const hookError: HookError = {
          message: supabaseError.message || 'Failed to delete staff member',
          details: supabaseError.details,
          code: supabaseError.code,
        };
        setError(hookError);
        toast.error(hookError.message);
        setStaff(originalStaff); // Rollback UI
        return false;
      }

      toast.success('Staff member deleted successfully');
      setError(null);
      return true;
    } catch (err: any) {
      console.error('Error deleting staff:', err);
      const hookError: HookError = {
        message: err.message || 'An unexpected error occurred while deleting staff member',
        details: err.details,
        code: err.code,
      };
      setError(hookError);
      toast.error(hookError.message);
      setStaff(originalStaff); // Rollback UI
      return false;
    }
  };

  const addStaff = async (newStaffData: Omit<StaffMember, 'id'>) => {
    if (!isEditor) {
      toast.error('You need to be logged in as an editor to add staff');
      return false;
    }
    setError(null);
    try {
      // Ensure display_order is explicitly set if not provided, or handled by DB default
      const staffToAdd = { ...newStaffData, category };
      if (newStaffData.display_order === undefined) {
        // If you want to auto-increment or set a default, this is where you might query max display_order
        // For now, let DB handle or assume it's part of newStaffData if managed by user
      }

      const { data, error: supabaseError } = await supabase
        .from('staff')
        .insert([staffToAdd])
        .select()
        .single();

      if (supabaseError) {
        console.error('Error adding staff:', supabaseError);
        const hookError: HookError = {
          message: supabaseError.message || 'Failed to add staff member',
          details: supabaseError.details,
          code: supabaseError.code,
        };
        setError(hookError);
        toast.error(hookError.message);
        return false;
      }

      setStaff(prev => [...prev, data]); // Consider sorting here if needed post-add
      toast.success('Staff member added successfully');
      setError(null);
      return true;
    } catch (err: any) {
      console.error('Error adding staff:', err);
      const hookError: HookError = {
        message: err.message || 'An unexpected error occurred while adding staff member',
        details: err.details,
        code: err.code,
      };
      setError(hookError);
      toast.error(hookError.message);
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
    retryFetch,
    // getPositionRank // Export if needed by components, but sorting is internal for now
  };
};
