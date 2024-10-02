import { Component, xml } from "@odoo/owl";

import './tile.scss'

export default class Tile extends Component {
    static template = xml/*html*/`
        <div class="tile">
            <div class="preview">
                <pre t-out="props.value" />
            </div>

            <h6 t-out="props.name" />



        </div>
    `
}