import * as vscode from "vscode";

import { DimmingRule } from "./DimmingRule";

export class MatcherService {

    constructor(
        protected patterns: string[],
        protected rules: DimmingRule[],
    ) {}

	patternsFor(editor: vscode.TextEditor) {
		// collect all .patterns for the current editor
		const patterns = [...this.patterns];
		const { languageId } = editor.document;
		const extension = editor.document.fileName.split('.').pop() || '';

		this.rules.forEach(rule => {
			// check if languageId is in .languages
			const validLanguage = rule.languages && rule.languages.includes(languageId);
			// check if extension is in .extensions
			const validExtension = rule.extensions && rule.extensions.includes(extension);
			// push .patterns to patterns if valid
			if (validLanguage || validExtension) {
				if (rule.pattern) {
					patterns.push(rule.pattern);
				}
				if (rule.patterns) {
					patterns.push(...rule.patterns);
				}
			}
		});
		return patterns;
	}

    rangesFor(editor: vscode.TextEditor) {
        const patterns = this.patternsFor(editor);
        const ranges = [];

        // fine all lines in editor that match a pattern in this.patterns
        for (let i = 0; i < editor.document.lineCount; i++) {
            const line = editor.document.lineAt(i);
            if (patterns.some(p => line.text.match(p))) {
                ranges.push(line.range);
            }
        };
        return ranges;        
    }
}