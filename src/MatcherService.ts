import * as vscode from "vscode";

import { DimmingRule } from "./DimmingRule";

export class MatcherService {

    constructor(
        protected patterns: string[],
        protected rules: DimmingRule[],
    ) { }

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
        const selections = editor.selections;
        for (let i = 0; i < editor.document.lineCount; i++) {
            const line = editor.document.lineAt(i);

            // Skip if the current line is active.
            if (line.lineNumber === selections[0].active.line) {
                continue;
            }
            
            // Skip if the current line is in the user selection.
            var isInSelection = false;
            for (const selection of selections) {
                if (selection.start.line <= line.lineNumber && line.lineNumber <= selection.end.line) {
                    isInSelection = true;
                    break;
                }
            }
            if (isInSelection) {
                continue;
            }

            if (patterns.some(p => line.text.match(p))) {
                ranges.push(line.range);
            }
        };
        return ranges;
    }
}