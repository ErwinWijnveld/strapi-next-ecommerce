export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '21c564a6ecfb45c34a741cbda4eab1ca'),
  },
});
