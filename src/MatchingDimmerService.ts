import * as vsc from 'vscode';
import { DimmerService } from './DimmerService';
import { ExtensionConfig, loadConfig } from './ExtensionConfig';
import { MatcherService } from './MatcherService';

export class MatchingDimmerService {
	config!: ExtensionConfig;
	dimmer!: DimmerService;
	matcher!: MatcherService;

	constructor() {
		this.initialize();
		this.dimAll();
	}

	readConfig() {
		const _config = vsc.workspace.getConfiguration('matched-line-dimmer');
		return loadConfig(_config);
	}
	
	reinitialize() {
		this.undimAll();
		this.initialize();
	}

	initialize() {
		this.config = this.readConfig();
		this.dimmer = new DimmerService(this.config.opacity);
		this.matcher = new MatcherService(this.config.patterns, this.config.rules);
		this.dimAll();
	}

	dispose() {
		this.undimAll();
	}

	dim(textEditor: vsc.TextEditor) {
		const ranges = this.matcher.rangesFor(textEditor);
		this.dimmer.dim(textEditor, ranges);
	}
	
	undim(textEditor: vsc.TextEditor) {
		this.dimmer.undim(textEditor);
	}

    undimAll() {
		vsc.window.visibleTextEditors.forEach(textEditor => {
			this.undim(textEditor);
		});
	}

    dimAll() {
		vsc.window.visibleTextEditors.forEach(e => this.updateIfEnabled(e));
	}

    updateIfEnabled(textEditor: vsc.TextEditor | undefined) {
		if (textEditor && this.config.enabled) {
			this.dim(textEditor);
		}		
	}
}