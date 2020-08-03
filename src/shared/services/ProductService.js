import {Environment} from "../../Environment";

export class ProductService {

    getProducts(searchedWord, page) {
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
        return fetch(`${Environment.BFF}/getProducts?word=${searchedWord}&page=${page}`, options)
            .then(response => response.json())
            .then(data => data);
    }

}
