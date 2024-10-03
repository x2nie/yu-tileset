import { Component, xml } from "@odoo/owl";

import './tile.scss'

export class Tile extends Component {
    static template = xml/*html*/`
        <div class="tile">
            <div class="preview-box">
                <!-- <pre t-out="props.value" /> -->
                <!-- <span t-out="window.JSON.stringify(props.grid).replaceAll(',',', ')" /> -->
                <div class="cube">
                    <t t-foreach="props.grid" t-as="plane" t-key="plane_index">
                        <p t-attf-style="--cols:#{plane[0].length};">
                            <t t-foreach="plane" t-as="y" t-key="y_index">
                                <i t-foreach="y" t-as="x" t-key="x_index" t-att-title="x"/>
                            </t>
                        </p>
                    </t>
                </div>
            </div>

            <h4 t-out="props.name" />
        </div>
    `
}

export class Neighbor extends Component {
    static template0 = xml/*html*/`
        <pre t-out="window.JSON.stringify(props, null, 4)"/>
    `
    static template = xml/*html*/`
        <div class="tile">
            <div class="preview-box">
                <!-- <pre t-out="props.value" /> -->
                <!-- <span t-out="window.JSON.stringify(props.grid).replaceAll(',',', ')" /> -->
                <div class="cube" t-att-style="rotate2style(props.left.rotate)">
                    <t t-foreach="props.left.grid" t-as="plane" t-key="plane_index">
                        <p t-attf-style="--cols:#{plane[0].length};">
                            <t t-foreach="plane" t-as="y" t-key="y_index">
                                <i t-foreach="y" t-as="x" t-key="x_index" t-att-title="x"/>
                            </t>
                        </p>
                    </t>
                </div>
                <div class="cube" t-att-style="rotate2style(props.right.rotate)">
                    <t t-foreach="props.right.grid" t-as="plane" t-key="plane_index">
                        <p t-attf-style="--cols:#{plane[0].length};">
                            <t t-foreach="plane" t-as="y" t-key="y_index">
                                <i t-foreach="y" t-as="x" t-key="x_index" t-att-title="x"/>
                            </t>
                        </p>
                    </t>
                </div>
            </div>

            <h4>
                <t t-out="props.left.name"/> - 
                <t t-out="props.right.name"/>
            </h4>
        </div>
    `

    rotate2style(rotates:string) {
        let z = 0;
        let x = 0;
        let y = 0;
        rotates.split('').forEach(rotate => {
            switch (rotate) {
                case 'z':
                    z += 90
                    break;
                default:
                    break;
            }
        })
        return `transform: rotateZ(${z}deg);`
    }
}