import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        keyboardShortcut: {
            /**
             * Trigger a keyboard shortcut.
             */
            keyboardShortcut: (name: string) => Command;
        };
    }
}
export declare const keyboardShortcut: RawCommands['keyboardShortcut'];
