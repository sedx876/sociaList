export const authenticate = (jwt, next) => {
  if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(jwt));
      next();
  }
}