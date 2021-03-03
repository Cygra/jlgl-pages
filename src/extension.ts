import { fstat } from "fs";
import * as vscode from "vscode";
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("jlgl.pages", async (name?) => {
      try {

        if (!name || !name.path || !/pages\/src\/pages$/.test(name.path)) {
          throw new Error("not the pages directory");
        }

        const input = await vscode.window.showInputBox({ prompt: 'please input directory' });
        if (!input) {
          throw new Error("please input page name");
        }

        fs.mkdirSync(`${name.path}/${input}`);
        const title = await vscode.window.showInputBox({ prompt: 'please input title' });

        if (!title) {
          throw new Error("please input page name");
        }
        fs.writeFileSync(`${name.path}/${input}/page.config.json`,
          [
            `{`,
            `  "title": "${title}"`,
            `}`
          ].join('\n'));
        fs.writeFileSync(`${name.path}/${input}/Page.vue`, [
          `<template>`,
          `  <div></div>`,
          `</template>`,
          `<script>`,
          `export default {`,
          `}`,
          `</script>`,
          `<style lang="scss">`,
          `</style>`,
        ].join('\n'));
        fs.writeFileSync(`${name.path}/${input}/main.js`, [
          `import Vue from 'vue'`,
          `import Page from './Page.vue'`,
          ``,
          `new Vue({ render: h => h(Page) }).$mount('#app')`,
        ].join('\n'));
        vscode.window.showInformationMessage("done");
      } catch (error) {
        vscode.window.showErrorMessage(error.message);
      }
    })
  );
}
