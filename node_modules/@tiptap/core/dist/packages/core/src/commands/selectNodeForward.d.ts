import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        selectNodeForward: {
            /**
             * Select a node forward.
             */
            selectNodeForward: () => Command;
        };
    }
}
export declare const selectNodeForward: RawCommands['selectNodeForward'];
