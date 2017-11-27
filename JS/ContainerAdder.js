import React from 'react'

export class ContainerAdder extends React.Component {
    del() { this.setState({ enable: false }) }
    add() {
        if(
            !document.getElementById(ContainerAdder.idPrefix + this.id + ContainerAdder.inputPostfix1).value
            ||
            !document.getElementById(ContainerAdder.idPrefix + this.id + ContainerAdder.inputPostfix2).value
        ) { alert('Нельзя оставлять значение пустым!'); return }
        const val1 = document.getElementById(ContainerAdder.idPrefix + this.id + ContainerAdder.inputPostfix1).value
        const val2 = document.getElementById(ContainerAdder.idPrefix + this.id + ContainerAdder.inputPostfix2).value
        this.props.addContainerElement(val1, val2)
        document.getElementById(ContainerAdder.idPrefix + this.id + ContainerAdder.inputPostfix1).value = ''
        document.getElementById(ContainerAdder.idPrefix + this.id + ContainerAdder.inputPostfix2).value = ''
    }

    constructor(gottenProps) {
        super()
        this.id = ContainerAdder.id++
        this.state = {
            enable: true,
            style: {
                marginLeft: 50,
                //marginTop: 40,
                minHeight: 60
            },
            styleElement1: {
                display: 'inline-block',
                border: 'solid',
                textAlign: 'center',
                width: '30.5%',
                marginTop: '1%',
                fontSize: '1vw'
            },
            styleElement2: {
                display: 'inline-block',
                marginLeft: '0.9%',
                border: 'solid',
                textAlign: 'center',
                width: '30.35%',
                fontSize: '1vw'
            },
            styleElement3: {
                marginLeft: '1%'
            }
        }
    }
    sendCall() {
        this.props.call()
    }
    render() {
        if(!this.state.enable) return ''
        return(
            <div id={ContainerAdder.idPrefix + this.id} style={this.state.style}>
                <input id={ContainerAdder.idPrefix + this.id + ContainerAdder.inputPostfix1} style={this.state.styleElement1}></input>
                <input id={ContainerAdder.idPrefix + this.id + ContainerAdder.inputPostfix2} style={this.state.styleElement2}></input>
                <button style={this.state.styleElement3} onClick={this.add.bind(this)}>Добавить</button>
            </div>
        )
    }
}
ContainerAdder.idPrefix = 'container_adder'
ContainerAdder.inputPostfix1 = '_input1'
ContainerAdder.inputPostfix2 = '_input2'
ContainerAdder.id = 0