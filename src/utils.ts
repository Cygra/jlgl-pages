import * as vscode from 'vscode'

export const getUserInput = async () => {
  let path = vscode.workspace.workspaceFolders?.[0].uri.fsPath
  if (!path || !/\/pages$/.test(path)) {
    throw new Error('请打开项目文件夹')
  }

  path += '/src/pages'

  const input = await vscode.window.showInputBox({ prompt: '请输入页面文件夹路径' })
  if (!input) {
    throw new Error('请输入页面文件夹路径')
  }
  path += `/${input}`

  const title = await vscode.window.showInputBox({ prompt: '请输入页面标题' })
  if (!title) {
    throw new Error('请输入页面标题')
  }

  return { path, title }
}
