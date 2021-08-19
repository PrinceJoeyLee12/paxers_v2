export enum UserErrorMessage {
  EMAIL_NOT_SENT = "User Successfully inserted but activation mail wasn't sent this is a SERVER-SIDE_ERROR",
  USER_ALREADY_EXISTED = 'Email already existed! Try Logging in',
  CREATE_USER_ERROR = "There's problem logging user. Please try again later!",
  EMAIL_ACTIVATION_FAILED_TO_SEND = "User Successfully inserted but activation mail wasn't sent this is a SERVER-SIDE_ERROR",
  UNSUCCESSFUL_EMAIL_SENT = "Email wasn't successfully sent to you! Please try again later",
  EMAIL_DONT_EXIST = "This email doesn't exist!",
  EMAIL_PASSWORD_INCORRECT = 'Email or Password is incorrect!',
}

export enum UserSuccessMessage {
  EMAIL_ACTIVATION_SENT = 'User Successfully inserted and Email Activation was sent to to your email',
  SUCCESSFUL_PASSWORD_RESET = "You've have successfully updated your password",
}
