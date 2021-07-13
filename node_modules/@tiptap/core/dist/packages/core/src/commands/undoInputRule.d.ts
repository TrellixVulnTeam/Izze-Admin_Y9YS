import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        undoInputRule: {
            /**
             * Undo an input rule.
             */
            undoInputRule: () => Command;
        };
    }
}
export declare const undoInputRule: RawCommands['undoInputRule'];
