import * as vsc from 'vscode';
import { ExtensionService } from './ExtensionService';

let extension: ExtensionService | undefined;

export function activate(context: vsc.ExtensionContext) {
	extension?.dispose();
	extension = new ExtensionService(context);
}

export function deactivate() {
	extension?.dispose();
	extension = undefined;
}
