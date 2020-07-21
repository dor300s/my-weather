import axios from 'axios';

const Url = 'https://api.unsplash.com/search/photos';
const API_KEY = 'KZv4hBsWRUWOzG7Oa4ulWEnIdFWRJZfoT14QWojLNz8';

export const getPhoto = async (city) => {
    return axios.get(Url, {
        params: {
            client_id: API_KEY,
            query: city,
            per_page: 1
        }
    }).then(res => res.data)
}
