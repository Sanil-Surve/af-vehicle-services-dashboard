import { createClient } from '@/lib/supabase/client';
import { Feedback, CreateFeedbackDTO } from '@/types/feedback';

export const feedbackService = {
  async submitFeedback(data: CreateFeedbackDTO): Promise<Feedback> {
    const supabase = createClient();

    const { data: feedback, error } = await supabase
      .from('feedback')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return feedback as Feedback;
  },

  async getApprovedFeedback(): Promise<Feedback[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Feedback[];
  },

  async getAllFeedback(): Promise<Feedback[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Feedback[];
  },

  async toggleApproval(id: string, isApproved: boolean): Promise<Feedback> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('feedback')
      .update({ is_approved: isApproved })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Feedback;
  },

  async deleteFeedback(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('feedback')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
