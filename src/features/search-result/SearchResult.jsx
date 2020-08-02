import React, {Component} from "react";
import './SearchResult.scss'
import Product from "../common/product/Product";
import {appActions, appSelectors} from "../../hooks/app";
import {connect} from "react-redux";
import data from './products';

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    async componentDidMount() {
        await this.props.getSearchedWord();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.searchedWord && prevProps.searchedWord !== this.props.searchedWord) {
            await this.setState({
                products: [],
            })
            await this.filterProducts();
        }
    }

    async filterProducts() {
        let products = [];
        if (!isNaN(this.props.searchedWord)) {
            products = data.filter(product => {
                return product.id === Number(this.props.searchedWord)
            });
        } else if (this.props.searchedWord.length >= 3) {
            products = data.filter(product => {
                return product.brand.toLowerCase().includes(this.props.searchedWord.toLowerCase()) ||
                    product.description.toLowerCase().includes(this.props.searchedWord.toLowerCase())
            });
        }
        this.setState({
            products: products,
        })

    }

    isPalindrome(word) {
        let reverseString = '';
        for (let i = word.length - 1; i >= 0; i--) {
            reverseString += word[i];
        }
        return word === reverseString;
    }

    render() {
        return (
            this.props.searchedWord ?
                (
                    <div className="search-result-container">
                        <div className="word-search-container">
                            Resultados para <strong>{this.props.searchedWord}</strong>:
                        </div>
                        <div className="products-search-container">
                            {this.state.products.map((product, index) =>
                                <Product
                                    key={index}
                                    product={product}
                                    isPalindrome={this.isPalindrome(this.props.searchedWord)}
                                />
                            )}
                            <div>Aquí va el paginador</div>
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