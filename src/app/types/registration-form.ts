export interface RegistrationFormModel {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  skills: SkillModel[];
  referralCode: string;
  hasReferralCode: boolean;
}

export interface SkillModel {
  skill: string;
}
