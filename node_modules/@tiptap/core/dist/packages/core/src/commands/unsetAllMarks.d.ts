import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        unsetAllMarks: {
            /**
             * Remove all marks in the current selection.
             */
            unsetAllMarks: () => Command;
        };
    }
}
export declare const unsetAllMarks: RawCommands['unsetAllMarks'];
