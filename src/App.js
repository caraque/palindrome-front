import React from 'react';
import {Provider} from 'react-redux';
import Header from "./features/common/header/Header";
import SearchResult from "./features/search-result/SearchResult";
import store from "./hooks/store";

function App() {
    return (
        <Provider store={store}>
            <div>
                <Header/>
                <SearchResult/>
            </div>
        </Provider>
    );
}

export default App;
