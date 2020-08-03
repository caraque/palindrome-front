import React, {Component} from "react";
import Pagination from '@material-ui/lab/Pagination';
import './SearchResult.scss'
import Product from "../common/product/Product";
import {appActions, appSelectors} from "../../hooks/app";
import {connect} from "react-redux";
import {ProductService} from "../../shared/services/ProductService";
import spinner from './img/spinner.svg';

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            activePage: 1,
            totalPages: 1,
            isLoading: false
        };

        this.changePagination = this.changePagination.bind(this);
    }

    async componentDidMount() {
        await this.props.getSearchedWord();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.searchedWord &&
            (prevProps.searchedWord !== this.props.searchedWord || prevState.activePage !== this.state.activePage)) {
            await this.setState({
                products: [],
                activePage: prevState.activePage === this.state.activePage ? 1 : this.state.activePage,
                totalPages: prevState.totalPages === this.state.totalPages ? 1 : this.state.totalPages,
            });
            await this.filterProducts();
        }
    }

    async filterProducts() {
        this.setState({isLoading: true})
        const productService = new ProductService();
        let productsResponse = await productService.getProducts(this.props.searchedWord, this.state.activePage);
        const {products, totalPages} = productsResponse.data;
        this.setState({
            products: products,
            totalPages,
            isLoading: false
        })
    }

    isPalindrome(word) {
        let reverseString = '';
        for (let i = word.length - 1; i >= 0; i--) {
            reverseString += word[i];
        }
        return word === reverseString;
    }

    async changePagination(event, value) {
        this.setState({activePage: value})
    };

    render() {
        const {totalPages, isLoading, activePage} = this.state;
        return (
            this.props.searchedWord ?
                (
                    <div className="search-result-container">
                        <div>
                            <div className="word-search-container">
                                Resultados para <strong>{this.props.searchedWord}</strong>:
                            </div>
                            <div className="products-search-container">
                                {!this.state.isLoading ?
                                    this.state.products.length ?
                                        this.state.products.map((product, index) =>
                                            <Product
                                                key={index}
                                                product={product}
                                                isPalindrome={this.isPalindrome(this.props.searchedWord)}
                                            />
                                        ) :
                                        <div style={{textAlign: 'center'}}>No existen productos</div>
                                    :
                                    <div className="spinner-container">
                                        <img className="icon-img" src={spinner} alt="LiderLoaging"/>
                                    </div>
                                }
                                {this.state.products.length ? <div className="pagination-container">
                                    <Pagination
                                        className="pagination"
                                        page={activePage}
                                        count={totalPages}
                                        variant="outlined"
                                        color="primary"
                                        disabled={isLoading}
                                        onChange={this.changePagination}/>
                                </div> : null}
                            </div>
                        </div>

                    </div>
                ) : null
        );
    }
}

const mapStateToProps = state => ({
    searchedWord: appSelectors.getSearchText(state),
});

const mapDispatchToProps = dispatch => ({
    getSearchedWord: () => dispatch(appActions.getSearchedText()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchResult);