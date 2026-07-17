export function getSession() {
  // Simple check for a session cookie or flag
  if (typeof window !== 'undefined') {
    const loggedIn = localStorage.getItem('isAdmin') === 'true'
    return { user: loggedIn ? 'admin' : null }
  }
  return { user: null }
}