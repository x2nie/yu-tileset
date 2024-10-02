import { Component, xml } from "@odoo/owl";
// import './App.scss'

export default class App extends Component {
    // static components = {Top, Playground}
    static template = xml`<h1>Hey Guys!</h1> <t t-call="greeting"/>`;
    
}