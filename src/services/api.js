const URL = 'http://localhost:3000/api';
const EVENTS_URL = `${URL}/events`;
const CONTACTS_URL = `${URL}/contacts`;
const AUTH_URL = `${URL}/auth`;
const COMPANIES_URL = `${URL}/companies`;

function responseHandler(response) {
  if(response.ok) return response.json();
  return response.json().then(err => { 
    throw err.message; 
  });
}

function getHeaders(hasBody) {
  const headers = {};
  if(hasBody) {
    headers['Content-Type'] = 'application/json';
  }
  const user = localStorage.user;
  if(user) {
    try {
      headers['Authorization'] = JSON.parse(user).userId;
    }
    catch(err) {
      localStorage.removeItem('user');
    }
  }
  return headers;
}

/////////////// EVENTS ///////////////////

export function getEvents(userId) {
  return fetch(`${EVENTS_URL}/${userId}`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function addEvent(event) {
  return fetch(`${EVENTS_URL}`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(event)
  })
    .then(responseHandler);
}

export function updateEvent(event) {
  return fetch(`${EVENTS_URL}/${event.eventId}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(event)
  })
    .then(response => response.json());
}

export function deleteEvent(eventId) {
  return fetch(`${EVENTS_URL}/${eventId}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
    .then(responseHandler);
}

/////////////// CONTACTS /////////////////

export function getContacts(userId) {
  return fetch(`${CONTACTS_URL}/${userId}`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function addContact(contact) {
  return fetch(`${CONTACTS_URL}`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(contact)
  })
    .then(responseHandler);
}

export function updateContact(contact) {
  return fetch(`${CONTACTS_URL}/${contact.contactId}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(contact)
  })
    .then(response => response.json());
}

export function deleteContact(contactId) {
  return fetch(`${CONTACTS_URL}/${contactId}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
    .then(responseHandler);
}

//////////////// COMPANIES ////////////////

export function getCompanies() {
  return fetch(COMPANIES_URL, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function addCompany(company) {
  return fetch(`${COMPANIES_URL}`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(company)
  })
    .then(responseHandler);
}

/////////// SIGN UP AND IN ////////////////

export function signUp(credentials) {
  return fetch(`${AUTH_URL}/signup`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler);
}

export function signIn(credentials) {
  return fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler);
}

