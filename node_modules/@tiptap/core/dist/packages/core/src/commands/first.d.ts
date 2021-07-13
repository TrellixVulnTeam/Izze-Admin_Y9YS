import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        first: {
            /**
             * Runs one command after the other and stops at the first which returns true.
             */
            first: (commands: Command[] | ((props: Parameters<Command>[0]) => Command[])) => Command;
        };
    }
}
export declare const first: RawCommands['first'];
