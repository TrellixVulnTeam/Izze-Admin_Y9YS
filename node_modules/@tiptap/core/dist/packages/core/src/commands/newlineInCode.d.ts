import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        newlineInCode: {
            /**
             * Add a newline character in code.
             */
            newlineInCode: () => Command;
        };
    }
}
export declare const newlineInCode: RawCommands['newlineInCode'];
