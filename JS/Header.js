import React from 'react'

export class Header extends React.Component {
    addFromServer() { this.props.sendLoadFromServer() }
    removeAllElements() { this.props.sendRemoveAllElements() }
    saveToLocalStorage() { this.props.sendSaveToLocalStorage() }
    loadFromLocalStorage() { this.props.sendLoadFromLocalStorage() }
    //zeroOutLocalStorage() { this.props.sendZeroOutLocalStorage() }
    constructor() {
        super()
        this.id = Header.id++
        this.state = {
            style: {
                height: 100,
                backgroundColor: '#151515',
                overflow: 'hidden',
            },
            buttonStyle: {
                marginLeft: 35,
                marginTop: 16,
                fontSize: 20
            }
        }
    }

    render() {
        return(
            <div id={Header.idPrefix + this.id} style={this.state.style}>
                <button onClick={this.addFromServer.bind(this)} style={this.state.buttonStyle}><p>Добавить данные с сервера</p></button>
                <button onClick={this.removeAllElements.bind(this)} style={this.state.buttonStyle}><p>Удалить все элементы</p></button>
                <button onClick={this.saveToLocalStorage.bind(this)} style={this.state.buttonStyle}><p>Сохранить в LocalStorage</p></button>
                <button onClick={this.loadFromLocalStorage.bind(this)} style={this.state.buttonStyle}><p>Загрузить из LocalStorage</p></button>
            </div>
        )
    }
}
Header.idPrefix = 'header'
Header.id = 0