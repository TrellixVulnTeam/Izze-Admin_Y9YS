import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        liftEmptyBlock: {
            /**
             * Lift block if empty.
             */
            liftEmptyBlock: () => Command;
        };
    }
}
export declare const liftEmptyBlock: RawCommands['liftEmptyBlock'];
