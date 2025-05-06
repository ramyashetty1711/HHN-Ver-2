const baseURL = "https://backend.elenagc.com:7443/";

export const APPURL = {
  login: baseURL + "user_api/user/login/",
  logout: baseURL + "user_api/user/logout/",
  devices: baseURL + "gc_api/devices/",
  tickets: baseURL + "gc_api/tickets/",
  ticketsImages: baseURL + "gc_api/ticket-images/",
  feedbacks: baseURL + "gc_api/feedbacks/",
  user: baseURL + "user_api/user/",
  sendEmailCode: baseURL + "user_api/send_email_code/",
  verifyEmailCode: baseURL + "user_api/verify_email_code/",
  sendPhoneCode: baseURL + "user_api/send_phone_code/",
  verifyPhoneCode: baseURL + "user_api/verify_phone_code/",
};
