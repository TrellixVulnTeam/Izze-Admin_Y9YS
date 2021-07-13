import { Command, RawCommands, FocusPosition } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        focus: {
            /**
             * Focus the editor at the given position.
             */
            focus: (position?: FocusPosition) => Command;
        };
    }
}
export declare const focus: RawCommands['focus'];
