export const routes = {
  // ***** BACKEND ROUTES *****
  login: "/dj-rest-auth/login/",
  githubLogin: "/dj-rest-auth/github/",
  googleLogin: "/dj-rest-auth/google/",
  logout: "/dj-rest-auth/logout/",
  signup: "/dj-rest-auth/registration/",
  user: "/dj-rest-auth/user/",
  bids: "/bids/",
  bids_list: "/bids/list/",
  bid_history: "/bids/history/",
  bid_history_list: "/bids/history/list/",
  admin_bids: "/bids/admin/",
  // admin_bidsList: "/bids/admin/list/",
  admin_bid_history: "/bids/admin/history/list/",

  // ***** FRONTEND ROUTES *****
  login_page: "/login",
  home_page: "/",
  my_bids_page: "/bids",
  create_bids_page: "/bids/create",
  admin_page: "/admin",
  admin_bids_page: "/admin/bids",
};
