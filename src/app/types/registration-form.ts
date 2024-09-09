export interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  skills: Skill[];
  referralCode: string;
  hasReferralCode: boolean;
}

export interface Skill {
  skill: string;
}
