export const routes = {
  // ***** BACKEND ROUTES *****
  login: "/dj-rest-auth/login/",
  logout: "/dj-rest-auth/logout/",
  password_change: "/dj-rest-auth/password/change/",
  password_reset: "/dj-rest-auth/password/reset/",
  password_reset_confirm: "/dj-rest-auth/password/reset/confirm/",
  signup: "/dj-rest-auth/registration/",
  resend_verification_link: "/dj-rest-auth/registration/resend-email/",
  verify_email: "/dj-rest-auth/registration/verify-email/",
  user: "/dj-rest-auth/user/",
  bids: "/bids/",
  bids_list: "/bids/list/",
  bid_history: "/bids/history/",
  bid_history_list: "/bids/history/list/",
  admin_bids: "/bids/admin/",
  // admin_bidsList: "/bids/admin/list/",
  admin_bid_history: "/bids/admin/history/list/",

  // ***** FRONTEND ROUTES *****
  projects: "/projects",
  add_project: "/projects/add",
  profile: "/profile",
  login_page: "/login",
  forgot_password: "/forgot-password",
  reset_password: "/reset-password",
  reset_password_confirm: "/reset-password/confirm",
  change_password: "/change-password",
  home_page: "/",
  my_bids_page: "/bids",
  create_bids_page: "/bids/create",
  admin_page: "/admin",
  admin_bids_page: "/admin/bids",
};
