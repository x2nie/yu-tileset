import { loadFile, mount, reactive, whenReady } from '@odoo/owl'
import App from "./App";

// const [templates,models,palette] = await Promise.all([
const [templates0,tileset] = await Promise.all([
  // await loadFile("build/ui-templates.xml"),
  // await loadFile("Dungeon.ju.xml"),
  // await loadFile("static/models.xml"),
  // loadFile("static/resources/palette.xml"),
  whenReady(),
  whenReady()
]);
// const env = { program: reactive(new Program(models, palette)) };
// const env = { program: new Program(models, palette) };
// mount(App, document.body, {env, templates})
const env = { sample: {tileset} };
// mount(App, document.body, {templates, dev:true, env})
const templates = /*ht*/`<templates>
  <p t-name="greeting">
    Welcome to templates world.
  </p>
</templates>`
mount(App, document.body, {templates, dev:true})