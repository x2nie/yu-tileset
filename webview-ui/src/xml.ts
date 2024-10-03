import { parseXml, XmlElement, XmlNode } from "@rgrove/parse-xml";


export function parseTileset(text:string){
    const ts = parseXml(text, {preserveComments:true, includeOffsets:true, preserveXmlDeclaration: true})
    const visit = (node:XmlNode) => {
        if(node instanceof XmlElement){
            if(node.name == 'tile'){
                const value = node.attributes.value;
                node.grid = value.split(' ').map((l) => l.split('/').map(s => s.split('')));
            }
            node.children.forEach(c => visit(c))
        }
    }
    visit(ts.children[0])
    return ts
}