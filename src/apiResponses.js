const respond = (request, response, status, message, id) => {
  // Check the Accept header to determine response type (default to JSON)
  const acceptedTypes = request.headers.accept ? request.headers.accept.split(',') : [];
  const isXml = acceptedTypes.includes('text/xml');

  let responseBody;

  if (isXml) {
    // Respond in XML format
    responseBody = `<response><message>${message}</message>${id ? `<id>${id}</id>` : ''}</response>`;
    response.writeHead(status, { 'Content-Type': 'text/xml' });
  } else {
    // Respond in JSON format

    response.writeHead(status, { 'Content-Type': 'application/json' });
  }
  console.log(responseBody);
  response.write(responseBody);
  response.end();
};

// Success (200)
const success = (request, response) => {
  respond(request, response, 200, 'This is a successful response!');
};

// Bad Request (400 or 200 based on query parameter)
const badRequest = (request, response) => {
  const urlParams = new URLSearchParams(request.url.split('?')[1]);
  if (urlParams.get('valid') === 'true') {
    respond(request, response, 200, 'Request was valid!');
  } else {
    respond(request, response, 400, 'Missing valid query parameter set to true', 'badRequest');
  }
};

// Unauthorized (401 or 200 based on query parameter)
const unauthorized = (request, response) => {
  const urlParams = new URLSearchParams(request.url.split('?')[1]);
  if (urlParams.get('loggedIn') === 'yes') {
    respond(request, response, 200, 'User is logged in!');
  } else {
    respond(request, response, 401, 'Missing loggedIn query parameter set to yes', 'unauthorized');
  }
};

// Forbidden (403)
const forbidden = (request, response) => {
  respond(request, response, 403, 'You do not have access to this content.', 'forbidden');
};

// Internal Server Error (500)
const internal = (request, response) => {
  respond(request, response, 500, 'Internal Server Error. Something went wrong.', 'internalError');
};

// Not Implemented (501)
const notImplemented = (request, response) => {
  respond(request, response, 501, 'This feature is not implemented yet.', 'notImplemented');
};

// 404 Not Found (Any other endpoint)
const notFound = (request, response) => {
  respond(request, response, 404, 'The page you are looking for was not found.', 'notFound');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
