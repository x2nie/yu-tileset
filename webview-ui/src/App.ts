import { Component, onMounted, useState, xml } from "@odoo/owl";
// import './App.scss'
import "./App.css";

export default class App extends Component {
    // static components = {Top, Playground}
    // static template = xml`<h1>Hey Guys!</h1> <t t-call="greeting"/>`;
    // static template = xml`<h1>Hey Guys!</h1>`;
    state : any;
    
    setup(){
        this.state = useState({teaser:''})
        onMounted(()=>{
            window.addEventListener('message', event => {
                const message = event.data; // The json data that the extension sent
                switch (message.command) {
                    case 'updateContent':
                        // document.getElementById('from-host')!.innerHTML = message.lines
                        this.state.teaser = message.lines
                        break;
                }
              });
        })
    }
}

App.template = xml`
    <h1>Hey Guys!</h1>
    <pre t-out="state.teaser" />
`