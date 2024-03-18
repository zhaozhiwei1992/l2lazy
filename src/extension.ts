
import * as vscode from 'vscode';
import { translateText } from './translation';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('l2lazy.translateText', async () => {
        // 获取用户当前选中的文本
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor.');
            return;
        }
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        try {
            // 调用翻译模块进行翻译
            const translatedText = await translateText(selectedText);

            // 创建Webview面板
            const panel = vscode.window.createWebviewPanel(
                'translationPanel', // 面板标识符
                'Translation Result', // 面板标题
                vscode.ViewColumn.One, // 面板显示的列
                {}
            );

            // 设置Webview面板的HTML内容
            panel.webview.html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Translation Result</title>
                </head>
                <body>
                    <div>${translatedText}</div>
                </body>
                </html>
            `;
        } catch (error: unknown) {
			 if (error instanceof Error) {
                vscode.window.showErrorMessage(error.message);
            } else {
                vscode.window.showErrorMessage('An unknown error occurred.');
            }
        }
    });

    context.subscriptions.push(disposable);
}