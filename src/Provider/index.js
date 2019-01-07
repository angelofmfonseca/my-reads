import React, { Component } from 'react'

export const Context = React.createContext();

class index extends Component{
    constructor(){
        super();
        this.state={
            books: [],
            reading: [],
            toRead: [],
            read: [],
            moreBooks: (books) => {
                const reading = books.filter(book => book.shelf === 'reading');
                const toRead = books.filter(book => book.shelf === 'toRead');
                const read = books.filter(book => book.shelf === 'read');
                this.setState({ books, reading, toRead, read });
            },
            changeShelf: (book, newShelf, allShelfs) => {
                console.log(newShelf);
                const newBook = this.state.books.map(everyBook => {
                    const bookId = allShelfs[newShelf].find(
                        bookId => bookId === everyBook.id
                    );
                    if (bookId){
                        everyBook.shelf = newShelf;
                    }
                    return everyBook;
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