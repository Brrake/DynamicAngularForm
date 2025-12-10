export class AuthLoginInfo {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
export class VerifyLoginInfo {
  email: string;
  password: string;
  otpBody: string;
  check: boolean;
  constructor(email: string, password: string, otpBody: string, check: boolean) {
    this.email = email;
    this.password = password;
    this.otpBody = otpBody;
    this.check = check;
  }
}
export class VerifyOtpInfo {
  username: string;
  email: string;
  otpBody: string;

  constructor(username: string, email: string, otpBody: string) {
    this.username = username;
    this.email = email;
    this.otpBody = otpBody;
  }
}
export class VerifyQuestInfo {
  username: string;
  email: string;
  answer: string;

  constructor(username: string, email: string, answer: string) {
    this.username = username;
    this.email = email;
    this.answer = answer;
  }
}
export class VerifyResetPassInfo {
  username: string;
  email: string;

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }
}
export class ResetPassInfo {
  username: string;
  email: string;
  resetpin: string;
  password:string;

  constructor(username: string, email: string, resetpin: string,password:string) {
    this.username = username;
    this.email = email;
    this.resetpin = resetpin;
    this.password = password
  }
}
