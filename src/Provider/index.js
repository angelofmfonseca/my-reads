import React, { Component } from 'react'

export const Context = React.createContext();

class index extends Component{
    constructor(){
        super();
        this.state={
            books: [],
            currentlyReading: [],
            wantToRead: [],
            read: [],
            moreBooks: (books) => {
                const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
                const wantToRead = books.filter(book => book.shelf === 'wantToRead');
                const read = books.filter(book => book.shelf === 'read');
                this.setState({ books, currentlyReading, wantToRead, read });
            },
            changeShelf: (book, newShelf, allShelfs) => {
                console.log(newShelf);
                const newBook = this.state.books.map(eachBook => {
                    const bookId = allShelfs[newShelf].find(
                        bookId => bookId === eachBook.id
                    );
                    if (bookId){
                        eachBook.shelf = newShelf;
                    }
                    return eachBook;
                });
                this.state.moreBooks(newBook);
            }
        }
    }
    render(){
        return(
            <Context.Provider value={{ ...this.state }}>
                { this.props.children }
            </Context.Provider>
        )
    }
}
export default index