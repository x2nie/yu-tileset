import { Component, loadFile, onMounted, onWillStart, useState, xml } from "@odoo/owl";
import { parseXml } from "@rgrove/parse-xml";
import { vscode } from "./utilities/vscode";
// import './App.scss'
import "./App.css";
import Tile from "./components/tile";
import { parseTileset } from "./xml";


export default class App extends Component {
    static components = {Tile}
    // static template = xml`<h1>Hey Guys!</h1> <t t-call="greeting"/>`;
    // static template = xml`<h1>Hey Guys!</h1>`;
    state : any;
    
    setup(){
        this.state = useState({
            teaser:'',
            tileset: {children:[]},
        })
        onWillStart(async () =>{
            if(import.meta.env.MODE == 'development'){
                const raw = await loadFile('Dungeon.ju.xml')
                // const tileset = parseXml(raw).children[0]
                // console.log('parsedXML:', tileset)
                const tileset = parseTileset(raw).children[0]
                console.log('parsedXML:', tileset)
                this.state.tileset = tileset//.children[0]
                this.state.tileset = tileset//.children[0]
            }
        })
        onMounted(()=>{
            this.registerMessaging()
        })
    }

    registerMessaging(){
        window.addEventListener('message', event => {
            const message = event.data; // The json data that the extension sent
            switch (message.command) {
                case 'updateContent':
                    // document.getElementById('from-host')!.innerHTML = message.lines
                    this.state.teaser = message.lines
                    break;
                case 'updateXmlText':
                    // document.getElementById('from-host')!.innerHTML = message.lines
                    // console.log('parsedXML:', parseXml(message.text))
                    // this.state.teaser = message.text
                    try{
                        // const tileset = parseXml(message.text).children[0]
                        const tileset = parseTileset(message.text).children[0]
                        console.log('parsedXML:', tileset)
                        this.state.tileset = tileset//.children[0]
                        // this.state.tileset = parseTileset(message.text).children[0]
                    } catch {

                    }
                    break;
            }
          });
    }

    click_demo(){
        console.log('hello')
        vscode.postMessage({
            command: "hello",
            text: "Hey there partner! 🤠",
        });
    }
}

App.template = xml`
    <h1>Hey Guys!</h1>
    <t t-if="state.tileset.children and state.tileset.children" t-foreach="state.tileset.children" t-as="section" t-key="section_index">
        
        <t t-if="section.name=='tiles'" >
            <!-- <t t-out="section.children.length" /> -->
            <t t-foreach="section.children" t-as="tile" t-key="tile_index">
                <!-- <div t-if="tile.name=='tile'" style="display:inline-block;border:1px solid blue;margin:5px;"> -->
                    <Tile t-if="tile.name=='tile'" grid="tile.grid" t-props="tile.attributes"/>
                <!-- </div> -->
            </t>
            <hr/>
        </t>
    </t>
    <button t-on-click="click_demo">How di</button>
    <pre t-out="state.teaser" />
    `
        // <t t-if="section.name=='tiles'" t-foreach="section.children" t-as="tile" t-key="tile_index">
        //     <div t-if="tile.name=='tile'" style="display:inline-block;border:1px solid blue;margin:5px;">
        //         <t t-out="tile.attributes.name" />
        //     </div>
        // </t>