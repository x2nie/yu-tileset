import { loadFile, mount, reactive, whenReady } from '@odoo/owl'
import App from "./App";

// const [templates,models,palette] = await Promise.all([
const [templates,tileset] = await Promise.all([
  await loadFile("ui-templates.xml"),
  await loadFile("Dungeon.ju.xml"),
  // await loadFile("static/models.xml"),
  // loadFile("static/resources/palette.xml"),
  whenReady()
]);
// const env = { program: reactive(new Program(models, palette)) };
// const env = { program: new Program(models, palette) };
// mount(App, document.body, {env, templates})
const env = { sample: {tileset} };
mount(App, document.body, {templates, dev:true, env})