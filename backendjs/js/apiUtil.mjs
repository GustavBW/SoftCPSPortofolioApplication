export const appendHeaders = (res, headers) => { //I choose to use the "cors" package instead since this didn't pass the preflight check.
    if (!headers) {
        headers = defaultHeaders;
    }
    Object.keys(headers).forEach(key => {
        res.header(key, headers[key]);
    });
}

export const defaultHeaders = {
    'Cache-Control': 'public, max-age=31536000',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
}