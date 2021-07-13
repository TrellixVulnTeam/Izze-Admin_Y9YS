import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        selectAll: {
            /**
             * Select the whole document.
             */
            selectAll: () => Command;
        };
    }
}
export declare const selectAll: RawCommands['selectAll'];
