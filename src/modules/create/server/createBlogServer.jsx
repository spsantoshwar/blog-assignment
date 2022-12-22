import axios from 'axios';

export function createBlog(value, success, errorD) {
    console.log(value)
    axios.post('https://api.publicapis.org/entries', value).then((resp) => {
        // this response depends on backend developer
        if (resp.data.status === 200) {
            success(true)
        }
        else {
            success(resp.data.message)
        }
    }).catch((error) => {
        errorD(error.message)
    });
}