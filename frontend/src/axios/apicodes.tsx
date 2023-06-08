export default function getFromAPICodes(code: string) {

  const apicodes: { [type: string]: string } = {
    USER_PAYLOAD_ERROR: "User credentials were incorrect",
    USER_EMAIL_CONFLICT: "Email already exists",
    USER_REGISTRATION_SUCCESS: "Registration of Employee was successfull",
    USER_EMAIL_ERROR: "Email does not exists",
    USER_PASSWORD_ERROR: "Password does not match",
  };
  return code in apicodes ? apicodes[code] : "Error occured";
}
