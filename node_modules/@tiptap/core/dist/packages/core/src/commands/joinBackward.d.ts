import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        joinBackward: {
            /**
             * Join two nodes backward.
             */
            joinBackward: () => Command;
        };
    }
}
export declare const joinBackward: RawCommands['joinBackward'];
