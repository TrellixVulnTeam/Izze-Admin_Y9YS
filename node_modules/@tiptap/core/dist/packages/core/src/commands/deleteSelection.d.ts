import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        deleteSelection: {
            /**
             * Delete the selection, if there is one.
             */
            deleteSelection: () => Command;
        };
    }
}
export declare const deleteSelection: RawCommands['deleteSelection'];
