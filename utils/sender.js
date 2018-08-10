const request = require('request-promise-native');

function sendRestRequestWithHeader(parameters) {
    let options = {
        uri: parameters.uri,
        method: parameters.method,
        headers: parameters.header,
        resolveWithFullResponse: true,
        json: true,
        body: parameters.body,
        simple: false
    };

    return request(options).then((response) => {
        return response;
    });

}

module.exports = sendRestRequestWithHeader;