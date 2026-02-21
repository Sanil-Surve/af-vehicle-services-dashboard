export interface Feedback {
  id: string;
  name: string;
  email?: string;
  rating: number;
  review: string;
  location?: string;
  is_approved: boolean;
  created_at: string;
}

export interface CreateFeedbackDTO {
  name: string;
  email?: string;
  rating: number;
  review: string;
  location?: string;
}
