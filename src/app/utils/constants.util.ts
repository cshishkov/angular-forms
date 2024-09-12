export abstract class Constants {
  static readonly PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  static readonly EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  static readonly REFERRAL_CODE_REGEX = /^[A-Z]{3}\d{3}$/;
  static readonly PREDEFINED_NAMES: string[] = ['user1', 'user2', 'user3'];
}
