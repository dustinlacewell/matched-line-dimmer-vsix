import * as vscode from "vscode";
import { DimmingRule } from "./DimmingRule";

export class DimmerService {

    dimDecoration: vscode.TextEditorDecorationType;

    constructor(
        protected opacity: number,

    ) { 
        this.dimDecoration = this.createDimDecoration();
    }

	protected createDimDecoration() {
		if (this.dimDecoration) {
			this.dimDecoration.dispose();
		}

        const dimDecoration = vscode.window.createTextEditorDecorationType(<vscode.DecorationRenderOptions> {
			textDecoration: `none; opacity: ${this.opacity / 100}`
		});

        return dimDecoration;
	}   

	dim(editor: vscode.TextEditor, ranges: vscode.Range[]) {
		this.undim(editor);
		editor.setDecorations(this.dimDecoration, ranges);
	}
    
	undim(editor: vscode.TextEditor) {
		editor.setDecorations(this.dimDecoration, []);
	}
}