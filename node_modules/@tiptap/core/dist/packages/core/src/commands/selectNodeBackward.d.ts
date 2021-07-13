import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        selectNodeBackward: {
            /**
             * Select a node backward.
             */
            selectNodeBackward: () => Command;
        };
    }
}
export declare const selectNodeBackward: RawCommands['selectNodeBackward'];
