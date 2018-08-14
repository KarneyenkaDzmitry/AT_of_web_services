const request = require('request-promise-native');

function sendRestRequestWithHeader(parameters) {
    const { uri, method, headers, body } = parameters;
    let options = {
        uri: uri,
        method: method,
        headers: headers,
        resolveWithFullResponse: true,
        json: true,
        body: body,
        simple: false
    };

    return request(options).then((response) => {
        return response;
    });
}

module.exports = sendRestRequestWithHeader;