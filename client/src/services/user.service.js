import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getAll() {
        return axios.get("http://localhost:8080/api/books/g");
    }

    get(id) {
        return axios.get(`http://localhost:8080/api/books/${id}`);
    }

    update(id, data) {
        return axios.put(`http://localhost:8080/api/books/update/${id}`, data);
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/books/${id}`);
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    findByTitle(title) {
        return axios.get(`http://localhost:8080/api/books/g?title=${title}`);
    }

    // getModeratorBoard() {
    //     return axios.get(API_URL + 'mod', { headers: authHeader() });
    // }
    create(data) {
        return axios.post("http://localhost:8080/api/books", data, { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();