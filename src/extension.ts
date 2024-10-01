// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorldPanel } from './panels/HelloWorldPanel';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand('yup.start', () => {
			// YupPreviewPanel.createOrShow(context.extensionUri);
			HelloWorldPanel.render(context.extensionUri);
		})
	);

	// Event listener saat TextEditor yang aktif berubah
    vscode.window.onDidChangeActiveTextEditor(editor => {
		if (HelloWorldPanel.currentPanel && editor) {
			// Update konten WebviewPanel dengan 3 baris pertama dari editor aktif
            // panel.webview.html = getWebviewContentFromActiveEditor();
			
			// // Ambil 3 baris pertama dari dokumen aktif
			// const firstThreeLines = editor.document.getText(new vscode.Range(0, 0, 3, 0));
			// HelloWorldPanel.currentPanel.teaser(firstThreeLines);
			HelloWorldPanel.currentPanel.changeActiveTextEditor(editor);
     
        }
    }, null, context.subscriptions);

	//keep the panel open while vscode restart
	if (vscode.window.registerWebviewPanelSerializer) {
		// Make sure we register a serializer in activation event
		vscode.window.registerWebviewPanelSerializer(HelloWorldPanel.viewType, {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
				console.log(`Got state: ${state}`);
				// Reset the webview options so we use latest uri for `localResourceRoots`.
				// webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
				HelloWorldPanel.revive(webviewPanel, context.extensionUri);
			}
		});
	}
}
/*
// This method is called when your extension is deactivated
export function deactivate() {}

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
	return {
		// Enable javascript in the webview
		enableScripts: true,

		// And restrict the webview to only loading content from our extension's `media` directory.
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'out', 'media')]
	};
}

// * Manages cat coding webview panels
class YupPreviewPanel {
	//* Track the currently panel. Only allow a single panel to exist at a time.
	public static currentPanel: YupPreviewPanel | undefined;

	public static readonly viewType = 'yupPreview';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		if (YupPreviewPanel.currentPanel) {
			YupPreviewPanel.currentPanel._panel.reveal(column);
			return;
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			YupPreviewPanel.viewType,
			'Cat Coding',
			column || vscode.ViewColumn.Two,
			getWebviewOptions(extensionUri),
		);

		YupPreviewPanel.currentPanel = new YupPreviewPanel(panel, extensionUri);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		YupPreviewPanel.currentPanel = new YupPreviewPanel(panel, extensionUri);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._extensionUri = extensionUri;

		// Set the webview's initial html content
		this._update();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programmatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Update the content based on view changes
		this._panel.onDidChangeViewState(
			e => {
				if (this._panel.visible) {
					this._update();
				}
			},
			null,
			this._disposables
		);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.text);
						return;
				}
			},
			null,
			this._disposables
		);
	}

	public doRefactor() {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ command: 'refactor' });
	}
	
	public teaser(lines: string){
		this._panel.webview.postMessage({ command: 'teaser', lines });
	}

	public dispose() {
		YupPreviewPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _update() {
		const webview = this._panel.webview;
		this._panel.webview.html = this._getHtmlForWebview(webview);

		// Vary the webview's content based on where it is located in the editor.
		// switch (this._panel.viewColumn) {
		// 	case vscode.ViewColumn.Two:
		// 		// this._updateForCat(webview, 'Compiling Cat');
		// 		return;

		// 	case vscode.ViewColumn.Three:
		// 		// this._updateForCat(webview, 'Testing Cat');
		// 		return;

		// 	case vscode.ViewColumn.One:
		// 	default:
		// 		// this._updateForCat(webview, 'Coding Cat');
		// 		return;
		// }
	}

	// private _updateForCat(webview: vscode.Webview, catName: keyof typeof cats) {
	// 	this._panel.title = catName;
	// 	this._panel.webview.html = this._getHtmlForWebview(webview, cats[catName]);
	// }

	private _getHtmlForWebview(webview: vscode.Webview) {
		// Local path to main script run in the webview
		const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'out', 'media', 'main.js');

		// And the uri we use to load this script in the webview
		const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

		// Local path to css styles
		const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'out', 'media', 'reset.css');
		const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'out', 'media', 'vscode.css');

		// Uri to load styles into webview
		const stylesResetUri = webview.asWebviewUri(styleResetPath);
		const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

		// Use a nonce to only allow specific scripts to be run
		const nonce = getNonce();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${stylesResetUri}" rel="stylesheet">
				<link href="${stylesMainUri}" rel="stylesheet">

				<title>Cat Coding</title>
			</head>
			<body>
				<h1 id="lines-of-code-counter">0</h1>

				<pre id="teaser"></pre>

				<script nonce="${nonce}" type="module" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
*/