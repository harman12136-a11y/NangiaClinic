export function logout() {
  // Clear login state
  if (typeof window !== 'undefined') {
    localStorage.removeItem('isAdmin')
    window.location.href = '/login'
  }
}