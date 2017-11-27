import React from 'react'
import { render } from 'react-dom'

import { Header } from './Header'
import { Container } from './Container'

class Main extends React.Component {
    sayToLoadFromServer() { this.child.getJsonFrom('https://raw.githubusercontent.com/asakasinsky/russia.json/master/json/russia.subjects.json') }
    sayToRemoveAllElements() { this.child.removeAllElements() }
    sayToSaveToLocalStorage() { this.child.saveToLocalStorage() }
    sayToLoadFromLocalStorage() { this.child.loadFromLocalStorage() }
    constructor() {
        super()
        this.header = <Header
            sendLoadFromServer={this.sayToLoadFromServer.bind(this)}
            sendRemoveAllElements={this.sayToRemoveAllElements.bind(this)}
            sendSaveToLocalStorage={this.sayToSaveToLocalStorage.bind(this)}
            sendLoadFromLocalStorage={this.sayToLoadFromLocalStorage.bind(this)}
        />
        this.container = <Container onRef={ref => (this.child = ref)}/>
    }
    render() {
        return(
            <div>
                {this.header}
                {this.container}
            </div>
        )
    }
}

render(
    <Main/>,
    document.getElementById('main')
)