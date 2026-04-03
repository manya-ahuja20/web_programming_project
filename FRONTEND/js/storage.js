
const KEY_USERS = 'eventify_users'; //labels
const KEY_SESSION = 'eventify_session';
const KEY_EVENTS = 'eventify_events';
const KEY_REGISTRATIONS = 'eventify_registrations';


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

function getEvents() {
  return JSON.parse(localStorage.getItem(KEY_EVENTS) || '[]');
}

function saveEvents(events) {
  localStorage.setItem(KEY_EVENTS, JSON.stringify(events));
}

function addEvent(eventData) {
  const events = getEvents();
  const namePrefix = eventData.Name.substring(0, 3).toUpperCase();
  const uniqueNum = Date.now().toString().slice(-4); // last 4 digits of timestamp
  const eventId = namePrefix + uniqueNum;
  const event = { id: eventId, ...eventData };
  events.push(event);
  saveEvents(events);
  return event;
}

function getEventsByMonth(month) {
  const events = getEvents();
  return events.filter(event => {
    const eventDate = new Date(event.Date);
    return eventDate.getMonth() === month;
  });
}

function getEventById(id) {
  const events = getEvents();
  return events.find(event => event.id === id);
}

function getRegistrations() {
  return JSON.parse(localStorage.getItem(KEY_REGISTRATIONS) || '[]');
}

function saveRegistrations(registrations) {
  localStorage.setItem(KEY_REGISTRATIONS, JSON.stringify(registrations));
}

function addRegistration(registrationData) {
  const registrations = getRegistrations();
  // Check if user is already registered for this event
  const existing = registrations.find(reg => reg.userId === registrationData.userId && reg.eventId === registrationData.eventId);
  if (existing) {
    throw new Error('You are already registered for this event');
  }
  const registration = { id: uid(), ...registrationData };
  registrations.push(registration);
  saveRegistrations(registrations);
  return registration;
}

function getRegistrationsByEvent(eventId) {
  const registrations = getRegistrations();
  return registrations.filter(reg => reg.eventId === eventId);
}

function getRegistrationsByUser(userId) {
  const registrations = getRegistrations();
  return registrations.filter(reg => reg.userId === userId);
}

function getRegistrationCount(eventId) {
  return getRegistrationsByEvent(eventId).length;
}

function isUserRegisteredForEvent(userId, eventId) {
  const registrations = getRegistrations();
  return registrations.some(reg => reg.userId === userId && reg.eventId === eventId);
}

function getEventsByAdmin(adminName) {
  const events = getEvents();
  return events.filter(event => event.Adminname === adminName);
}