import * as vsc from 'vscode';
import { CONFIG_KEY } from './consts';
import { MatchingDimmerService } from './MatchingDimmerService';


export class ExtensionService {
    context: vsc.ExtensionContext;
    dimmer: MatchingDimmerService;

    constructor(context: vsc.ExtensionContext) {
        this.context = context;
        this.dimmer = new MatchingDimmerService();
		this.registerSubscriptions();
    }

	registerSubscriptions() {
		const events = this.registerEvents();
		const commands = this.registerCommands();
		this.context.subscriptions.push(...[
			...events,
			...commands,
		]);
	}

	registerEvents() {
		return [
			vsc.workspace.onDidChangeConfiguration(() => this.dimmer.reinitialize()),
			vsc.window.onDidChangeTextEditorSelection((e) => this.dimmer.updateIfEnabled(e.textEditor)),
			vsc.window.onDidChangeActiveTextEditor((textEditor) => this.dimmer.updateIfEnabled(textEditor)),
			vsc.window.onDidChangeTextEditorOptions((e) => this.dimmer.updateIfEnabled(e.textEditor)),
			vsc.workspace.onDidOpenTextDocument((e) => this.dimmer.updateIfEnabled(vsc.window.activeTextEditor)),
		];
	}

	registerCommands() {
		return [		
			vsc.commands.registerCommand(`${CONFIG_KEY}.ToggleLineDimmer`, () => {
				vsc.workspace.getConfiguration(CONFIG_KEY).update("enabled", !this.dimmer.config.enabled, true);
			}),
		];
	}

    dispose() {
        this.dimmer.dispose();
    }
}