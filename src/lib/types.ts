export type UserProfile = {
  uid: string;
  email: string;
  name: string;
  guardianName: string;
  schoolName: string;
  schoolId: string;
  classLevel: '6th' | '7th' | '8th' | 'University';
};
