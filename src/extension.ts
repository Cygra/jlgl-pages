import * as vscode from 'vscode'
import * as fs from 'fs'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('jlgl.pages', async () => {
      try {
        let path = vscode.workspace.workspaceFolders?.[0].uri.fsPath
        if (!path) {
          throw new Error('请打开项目文件夹')
        }

        path += '/src/pages'

        const input = await vscode.window.showInputBox({ prompt: '请输入页面路径' })
        if (!input) {
          throw new Error('请输入页面路径')
        }
        path += `/${input}`

        fs.mkdirSync(path)

        const title = await vscode.window.showInputBox({ prompt: '请输入页面 title' })
        if (!title) {
          throw new Error('请输入页面 title')
        }

        fs.writeFileSync(`${path}/page.config.json`,
          [
            '{',
            `  "title": "${title}"`,
            '}',
            ''
          ].join('\n'))
        fs.writeFileSync(`${path}/Page.vue`, [
          '<template>',
          '  <div></div>',
          '</template>',
          '',
          '<script>',
          'export default {',
          '}',
          '</script>',
          '',
          '<style lang="scss">',
          '</style>'
        ].join('\n'))
        fs.writeFileSync(`${path}/main.js`, [
          'import Vue from \'vue\'',
          'import Page from \'./Page.vue\'',
          '',
          'new Vue({ render: h => h(Page) }).$mount(\'#app\')',
          ''
        ].join('\n'))
        vscode.window.showInformationMessage('done')
      } catch (error) {
        vscode.window.showErrorMessage(error.message)
      }
    })
  )
}
