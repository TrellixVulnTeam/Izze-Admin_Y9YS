import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        splitBlock: {
            /**
             * Forks a new node from an existing node.
             */
            splitBlock: (options?: {
                keepMarks?: boolean;
            }) => Command;
        };
    }
}
export declare const splitBlock: RawCommands['splitBlock'];
