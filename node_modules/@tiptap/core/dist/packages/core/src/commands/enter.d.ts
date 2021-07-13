import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        enter: {
            /**
             * Trigger enter.
             */
            enter: () => Command;
        };
    }
}
export declare const enter: RawCommands['enter'];
