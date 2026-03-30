
const KEY_USERS = 'eventify_users'; //labels
const KEY_SESSION = 'eventify_session';


function getUsers() {
  return JSON.parse(localStorage.getItem(KEY_USERS) || '[]'); //converts string into js objects
}
function saveUsers(users) {
  localStorage.setItem(KEY_USERS, JSON.stringify(users)); //converts js objects into string 
} 
function getSession() {
  return JSON.parse(localStorage.getItem(KEY_SESSION) || 'null');
} 
function saveSession(session) {
  localStorage.setItem(KEY_SESSION, JSON.stringify(session));
}
function clearSession() {
  localStorage.removeItem(KEY_SESSION);
} //logs out the user 



function uid() { // simple unique ID generator for users 
    return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }



function registerUser({name, username, password, role='student', department='', club=''}) {
  const users = getUsers(); // get existing users as array from local storage
  if (users.some(u => u.username === username)) 
    throw new Error('Username already registered');
  const user = { id: uid(), name, username, password, role, department, club }; // create new user object
  users.push(user); // add to users array
  saveUsers(users); // save back to local storage
  return user; 
}


function loginUser(username, password) {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) 
    throw new Error('Invalid credentials');
  saveSession({ userId: user.id, role: user.role });
  return user;
}


function requireRole(role) {
  const s = getSession();
  if (!s || (role && s.role !== role)) {
    window.location = 
    (location.pathname.includes('/ADMIN/') || location.pathname.includes('/STUDENT/')) ? '../Basiclogin.html' : 'Basiclogin.html';
  }
}