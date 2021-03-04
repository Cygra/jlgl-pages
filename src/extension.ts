import * as vscode from 'vscode'
import * as fs from 'fs'
import { getUserInput } from './utils'
import { mainJsMulti, mainJsSingle, pageConfig, pageMulti, pageSingle } from './templates'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('jlgl.pages', async () => {
      try {
        const { path, title } = await getUserInput()
        fs.mkdirSync(path)
        fs.writeFileSync(`${path}/page.config.json`, pageConfig(title))
        fs.writeFileSync(`${path}/Page.vue`, pageSingle)
        fs.writeFileSync(`${path}/main.js`, mainJsSingle)
        vscode.window.showInformationMessage('done')
      } catch (error) {
        vscode.window.showErrorMessage(error.message)
      }
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('jlgl.pagesWithRoute', async () => {
      try {
        const { path, title } = await getUserInput()
        fs.mkdirSync(path)
        fs.mkdirSync(`${path}/views`)
        fs.writeFileSync(`${path}/page.config.json`, pageConfig(title))
        fs.writeFileSync(`${path}/Page.vue`, pageMulti)
        fs.writeFileSync(`${path}/main.js`, mainJsMulti)
        fs.writeFileSync(`${path}/views/Index.vue`, pageSingle)
        vscode.window.showInformationMessage('done')
      } catch (error) {
        vscode.window.showErrorMessage(error.message)
      }
    })
  )
}
