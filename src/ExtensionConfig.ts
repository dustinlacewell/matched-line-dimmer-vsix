import * as vscode from "vscode";

import { DimmingRule } from "./DimmingRule";

export type ExtensionConfig = {
    enabled: boolean;
    patterns: string[];
    rules: DimmingRule[];
    opacity: number;
};

export const loadConfig = (config: vscode.WorkspaceConfiguration) => {
    return {
        enabled: config.get('enabled', false),
        rules: config.get('rules', []),
        patterns: config.get('patterns', []),
        opacity: config.get('opacity', 50),
    };
};
