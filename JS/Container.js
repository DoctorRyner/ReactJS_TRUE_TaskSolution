import React from 'react'
import {reactLocalStorage} from '../node_modules/reactjs-localstorage';

import { ContainerElement } from './ContainerElement'
import { ContainerAdder } from './ContainerAdder';

export class Container extends React.Component {
    componentDidMount() { this.props.onRef(this) }
    componentWillUnmount() { this.props.onRef(undefined) }

    saveToLocalStorage() {
        let json = []
        for(let element of this.childs) {
            if(element && element.state.enable) {
                json.push({
                    name: element.state.val1,
                    regioncode: element.state.val2,
                })
            }
        }
        reactLocalStorage.setObject('json', json)
    }

    loadFromLocalStorage() {
        if(reactLocalStorage.getObject('json') == undefined) return
        this.removeAllElements()
        let json = reactLocalStorage.getObject('json')
        let newElements = []
        for(let jsonElement of json) {
            const val1 = jsonElement.name
            const val2 = jsonElement.regioncode
            const newEl = <ContainerElement onRef={ref => (this.childs.push(ref))} val1={val1} val2={val2} key={Container.keyAmount++}/>
            newElements.push(newEl)
        }
        this.setState({ elements: newElements })

        /*
        const val1 = gottenVal1
        const val2 = gottenVal2
        const newEl = <ContainerElement onRef={ref => (this.childs.push(ref))} val1={val1} val2={val2} key={Container.keyAmount++}/>
        this.state.elements.push(newEl)
        const newElements = this.state.elements.slice()
        this.setState({
            elements: newElements,
        })
        */
    }

    getJsonFrom(pathToJson) {
        const xmlhttp = new XMLHttpRequest()
        xmlhttp.onreadystatechange = (function(x, t) {
            return function() {
                if(x.readyState == 4 && x.status == 200) {
                    t.jsonFile = JSON.parse(x.responseText).data
                    t.initJson()
                }
            }
        }) (xmlhttp, this)
        xmlhttp.open('GET', pathToJson, true);
        xmlhttp.send();
    }

    addContainerElement(gottenVal1, gottenVal2) {
        const val1 = gottenVal1
        const val2 = gottenVal2
        const newElements = this.state.elements.slice()
        const newEl = <ContainerElement onRef={ref => (this.childs.push(ref))} val1={val1} val2={val2} key={Container.keyAmount++}/>
        newElements.push(newEl)
        this.setState({
            elements: newElements,
        })
    }

    removeAllElements() {
        const val1 = 'exit'
        const val2 = '0'
        for(let element of this.childs) {
            if(element) element.setState({ enable: false })
        }
        this.childs = []
    }

    initJson() {
        let newJson = []
        for(let jsonElement of this.jsonFile) {
            const val1 = jsonElement.name
            const val2 = jsonElement.regioncode
            const newEl = <ContainerElement onRef={ref => (this.childs.push(ref))} val1={val1} val2={val2} key={Container.keyAmount++}/>
            this.state.elements.push(newEl)
            newJson.push({
                name: val1,
                regioncode: val2
            })
        }
        this.setState({
            forRender: true,
            //json: newJson
        })
    }

    constructor() {
        super()
        this.testProp = 1
        this.jsonFile = {}
        this.childs = []
        this.state = {
            style: {
                backgroundColor: '#bed2d7',
                minHeight: '100%',
                width: '100%',
                //overflow: 'hidden'
            },
            forRender: true,
            elements: [],
            json: [],
        }
    }

    render() {
        return(
            <div id='container' style={this.state.style}>
                <div>{this.state.elements}</div>
                <div><ContainerAdder addContainerElement={this.addContainerElement.bind(this)}/></div>
            </div>
        )
    }
}
Container.keyAmount = 0
Container.jsonFile