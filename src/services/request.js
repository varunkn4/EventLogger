import registry from 'app-registry';
import { store } from '../store';

//#region saga api request functions
function postMethod(url, requestOption) {
    return new Promise((resolve) => fetch(url, requestOption)
        .then(response => response.json())
        .then(responseJson => {
            resolve(responseJson);
        })
    )
}

function getMethod(url) {
    const token = registry.get('storage').getItem('token');
    const requestOptions = {
        crossDomain: true,
        method: 'GET',
        headers: {
            'Content-Type': 'application/text',
            'Authorization': `Token ${token}`
        }
    };
    return new Promise((resolve) => fetch(url, requestOptions)
        .then(response => response.json())
        .then(responseJson => {
            resolve(responseJson);
        })
    )
}

export default {
    postMethod,
    getMethod
}
//#endregion
