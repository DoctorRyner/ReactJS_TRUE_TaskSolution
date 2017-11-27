import React from 'react'

export class ContainerElement extends React.Component {
    componentDidMount() { this.props.onRef(this) }
    componentWillUnmount() { this.props.onRef(undefined) }

    del() { this.setState({ enable: false }) }

    setVal() {
        document.getElementById(ContainerElement.idPrefix + this.id + ContainerElement.inputPostfix1).value = this.state.val1
        document.getElementById(ContainerElement.idPrefix + this.id + ContainerElement.inputPostfix2).value = this.state.val2
        
    }
    edit() {
        this.setState({ isEditMode: true })
        setTimeout(this.setVal.bind(this), 10)
    }
    cancel() { this.setState({ isEditMode: false }) }
    save() {
        if(
            !document.getElementById(ContainerElement.idPrefix + this.id + ContainerElement.inputPostfix1).value
            ||
            !document.getElementById(ContainerElement.idPrefix + this.id + ContainerElement.inputPostfix2).value
        ) { alert('Нельзя оставлять значение пустым!'); return }
        this.state.val1 = document.getElementById(ContainerElement.idPrefix + this.id + ContainerElement.inputPostfix1).value
        this.state.val2 = document.getElementById(ContainerElement.idPrefix + this.id + ContainerElement.inputPostfix2).value
        this.setState({ isEditMode: false })
    }
    constructor(gottenProps) {
        super()
        this.childs = []
        this.id = ContainerElement.id++
        this.state = {
            enable: true,
            val1: gottenProps.val1,
            val2: gottenProps.val2,
            isEditMode: false,
            style: {
                marginLeft: 50,
                //marginTop: 40,
                minHeight: 60
            },
            styleElement1: {
                display: 'inline-block',
                border: 'solid',
                textAlign: 'center',
                width: '30%',
                marginTop: '1%',
                fontSize: '0.95vw',
                overflow: 'hidden',
                minHeight: 20
            },
            styleElement1Input: {
                display: 'inline-block',
                border: 'solid',
                textAlign: 'center',
                width: '30.38%',
                marginTop: '1%',
                fontSize: '0.95vw',
                overflow: 'hidden',
                minHeight: 20
            },
            styleElement2: {
                display: 'inline-block',
                marginLeft: '1%',
                border: 'solid',
                textAlign: 'center',
                width: '30%',
                fontSize: '0.95vw',
                minHeight: 20
            },
            styleElement2Input: {
                display: 'inline-block',
                marginLeft: '1%',
                border: 'solid',
                marginTop: 0.8,
                textAlign: 'center',
                width: '30.38%',
                fontSize: '0.95vw',
                minHeight: 20
            },
            styleElement3: {
                marginLeft: '1%'
            }
        }
        this.input1 = <input
            id={ContainerElement.idPrefix + this.id + ContainerElement.inputPostfix1}
            style={this.state.styleElement1Input}>
        </input>
        this.input2 = <input
            id={ContainerElement.idPrefix + this.id + ContainerElement.inputPostfix2}
            style={this.state.styleElement2Input}>
        </input>
    }
    render() {
        if(!this.state.enable) return ''
        if(!this.state.isEditMode) {
            this.toRender = <div style={{display: 'inline'}}>
                <p style={this.state.styleElement1}>{this.state.val1}</p>
                <p style={this.state.styleElement2}>{this.state.val2}</p>
                <button style={this.state.styleElement3} onClick={this.edit.bind(this)}>Редактировать</button>
            </div>
        } else {
            this.toRender = <div style={{display: 'inline'}}>
                {this.input1}
                {this.input2}
                <button style={this.state.styleElement3} onClick={this.save.bind(this)}>Сохранить</button>
                <button style={this.state.styleElement3} onClick={this.cancel.bind(this)}>Отменить</button>
            </div>
        }
        return(
            <div id={ContainerElement.idPrefix + this.id} style={this.state.style}>
                {this.toRender}
                <button onClick={this.del.bind(this)} style={this.state.styleElement3}>Удалить</button>
            </div>
        )
    }
}
ContainerElement.idPrefix = 'container_element'
ContainerElement.inputPostfix1 = '_input1'
ContainerElement.inputPostfix2 = '_input2'
ContainerElement.id = 0