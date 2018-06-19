const URL = 'http://localhost:3000/api';
const EVENTS_URL = `${URL}/events`;

function responseHandler(response) {
  if(response.ok) return response.json();
  return response.json().then(err => { 
    throw err.message; 
  });
}

export function getEvents(userId) {
  return fetch(`${EVENTS_URL}/${userId}`, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(responseHandler);
}

export function deleteEvent(eventId) {
  return fetch(`${EVENTS_URL}/${eventId}`, {
    method: 'DELETE'
  })
    .then(responseHandler);
}
