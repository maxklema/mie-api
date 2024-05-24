//const request = require('sync-request');
const axios = require('axios');
const error = require('../errors');
const { URL, practice } = require('../variables');
const session = require('../Session Management/getCookie');

//makes the GET request
function makeGETRequest(endpoint, queryby){

    cookie = session.getCookie();

    if (cookie != ""){
        
        const apirequest = craft_API_request(endpoint, queryby);
        const buffer = Buffer.from(apirequest, 'utf8');

        let fullURL = `${URL.value}/json/${buffer.toString('base64')}`;

        return axios.get(fullURL, { headers: {
            'cookie': `wc_miehr_${practice.value}_session_id=${cookie}`
        }})
        .then( (response) => response.data)
        .catch(function (err) {
            throw new error.customError(error.ERRORS.BAD_REQUEST,  "You made an Invalid GET Request to the server. Error: " + err);
        });


    } else {
        throw new error.customError(error.ERRORS.INVALID_COOKIE, 'Your Session Cookie was Invalid.');
    }

}

//identifies only the first key
function processObject(obj, index){
    return (Object.keys(obj))[index];
}

//crafts the API Request, concatenating options (filters) as needed
function craft_API_request(endpoint, options){
    
    //const apirequest = `GET/db/${endpoint}/LIKE_${attribute}=${queryby[attribute]}`;
    if (Object.keys(options).length == 0) {
        return `GET/db/${endpoint}/`;
    } else if (Object.keys(options).length == 1) {
        const attribute = processObject(options, 0);
        return `GET/db/${endpoint}/${attribute}=${options[attribute]}`;
    } else {
        
        let request = `GET/db/${endpoint}/`;
        for (index = 0; index < Object.keys(options).length; index++){
            
            const attribute = processObject(options, index);

            if (index == 0){
                request += `${attribute}=${options[attribute]}&`;
            } else {
                if (index + 1 != Object.keys(options).length){
                    request += `${attribute}=${options[attribute]}&`;
                } else {
                    request += `${attribute}=${options[attribute]}`;
                }
            }
        }

        return request;

    }

}

module.exports = { makeGETRequest }; 