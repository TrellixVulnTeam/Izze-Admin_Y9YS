import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        clearNodes: {
            /**
             * Normalize nodes to a simple paragraph.
             */
            clearNodes: () => Command;
        };
    }
}
export declare const clearNodes: RawCommands['clearNodes'];
