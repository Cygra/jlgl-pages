import * as vscode from 'vscode'
import * as fs from 'fs'
import { getUserInput } from './utils'
import {
  mainJsMulti,
  mainJsSingle,
  pageConfig,
  pageMulti,
  pageSingle,
} from './templates'

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

  context.subscriptions.push(
    vscode.commands.registerCommand('jlgl.openInBrowser', (uri: vscode.Uri) => {
      try {
        if (
          !uri ||
          !uri.path ||
          !/pages\/src\/pages\/([a-zA-Z0-9-]+)$/.test(uri.path)
        ) {
          throw new Error('不是 pages 项目的页面文件夹')
        }

        const target = /[^/]*$/.exec(uri.path)?.[0]
        if (!target) throw new Error('未匹配到路径')

        vscode.commands.executeCommand(
          'vscode.open',
          vscode.Uri.parse(
            `http://localhost:8080/pages/${target
              .replace(/([A-Z])/g, '-$1')
              .replace(/[_.\- ]+/g, '-')
              .toLowerCase()}.html`
          )
        )
      } catch (error) {
        vscode.window.showErrorMessage(error.message)
      }
    })
  )
}
