import axios from "axios";


class BookDataService {
    getAll() {
        return axios.get("http://localhost:8080/api/books/g");
    }

    get(id) {
        return axios.get(`http://localhost:8080/api/books/${id}`);
    }

    create(data) {
        return axios.post("http://localhost:8080/api/books", data)
    }
    // create(data) {
    //     return http.post("/tutorials", data);
    // }

    update(id, data) {
        return axios.put(`http://localhost:8080/api/books/${id}`, data);
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/books/${id}`);
    }

    deleteAll() {
        return axios.delete(`http://localhost:8080/api/books`);
    }

    findByTitle(title) {
        return axios.get(`http://localhost:8080/api/books?title=${title}`);
    }

    // deleteAll() {
    //     return http.delete(`/tutorials`);
    // }

    // findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    // }
}

export default new BookDataService();