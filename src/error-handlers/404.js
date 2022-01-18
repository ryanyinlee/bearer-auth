'use strict';

function notFound(request, response, next) {
    console.log('No route found for last request.');
    response.status(404).send('aint nothin there');
    next();
}

module.exports = notFound;