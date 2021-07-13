import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        exitCode: {
            /**
             * Exit from a code block.
             */
            exitCode: () => Command;
        };
    }
}
export declare const exitCode: RawCommands['exitCode'];
