import React, {Component} from "react";
import './Header.scss';
import logo from './img/logo.svg'
import {appActions, appSelectors} from "../../../hooks/app";
import {connect} from "react-redux";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wordSearched: '',
        }
    }

    async searchword(value) {
        await this.setState({wordSearched: value})
        await this.props.setSearchedWord(this.state.wordSearched)
    }

    render() {
        return (
            <div className="header">
                <div className="icon-container">
                    <img className="icon-img" src={logo} alt="Lider"/>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        className="form-control search-text"
                        placeholder="¿Qué estás buscando?"
                        defaultValue={this.state.wordSearched}
                        onKeyDown={(e) => e.key === 'Enter' ? this.searchword(e.target.value) : null}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchedWord: appSelectors.setSearchText(state),
});

const mapDispatchToProps = dispatch => ({
    setSearchedWord: (value) => dispatch(appActions.setSearchedText(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);