const config = {
  // basename: only at build time to set, and Don't add '/' at end for breadcrumbs
  basename: '',
  defaultPath: '/dashboard',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,

  env: import.meta.env.VITE_API_ENV, // fixed name
  Ip: import.meta.env.VITE_API
};

export default config;
