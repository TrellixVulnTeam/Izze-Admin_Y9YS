import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        joinForward: {
            /**
             * Join two nodes forward.
             */
            joinForward: () => Command;
        };
    }
}
export declare const joinForward: RawCommands['joinForward'];
