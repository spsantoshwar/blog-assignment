import axios from 'axios';

export function getAllBlog(success, errorD) {
    axios.get('https://api.publicapis.org/entries').then((resp) => {
        if (resp.status === 200 && resp.data && resp.data.entries.length > 0) {
            success(resp.data)
        }
        else {
            success('no data')
        }
    }).catch((error) => {
        errorD(error.message)
    });
}