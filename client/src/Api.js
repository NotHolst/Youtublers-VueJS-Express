import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export default () => {
    return axios.create({
        baseURL: 'http://localhost:8081',
        headers: {'Content-Type': 'multipart/form-data' }
    })
}