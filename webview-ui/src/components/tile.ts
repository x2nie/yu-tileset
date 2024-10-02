import { Component, xml } from "@odoo/owl";

import './tile.scss'

export default class Tile extends Component {
    static template = xml/* html */`
        <div class="tile">
            <t t-out="props.name" />



        </div>
    `
}