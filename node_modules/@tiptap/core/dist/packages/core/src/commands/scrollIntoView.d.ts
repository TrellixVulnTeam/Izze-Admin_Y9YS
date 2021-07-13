import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        scrollIntoView: {
            /**
             * Scroll the selection into view.
             */
            scrollIntoView: () => Command;
        };
    }
}
export declare const scrollIntoView: RawCommands['scrollIntoView'];
