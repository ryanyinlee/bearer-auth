`use strict`;

// for 500 level errors, not the user, or db fault
// server errors

function serverError(error, request, response, next) {
    console.error('Server error.');
    console.log(error);
    response.status(500).send('Server is having an error.');
    next();
}

module.exports = serverError;