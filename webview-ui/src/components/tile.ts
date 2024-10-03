import { Component, xml } from "@odoo/owl";

import './tile.scss'

export default class Tile extends Component {
    static template = xml/*html*/`
        <div class="tile">
            <div class="preview">
                <!-- <pre t-out="props.value" /> -->
                <!-- <span t-out="window.JSON.stringify(props.grid).replaceAll(',',', ')" /> -->
                <t t-foreach="props.grid" t-as="plane" t-key="plane_index">
                    <p t-attf-style="--cols:#{plane[0].length};">
                        <t t-foreach="plane" t-as="y" t-key="y_index">
                            <i t-foreach="y" t-as="x" t-key="x_index" t-att-title="x"/>
                        </t>
                    </p>
                </t>
            </div>

            <h4 t-out="props.name" />



        </div>
    `
}