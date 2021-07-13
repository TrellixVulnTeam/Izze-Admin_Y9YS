import { Command, RawCommands, Range } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        deleteRange: {
            /**
             * Delete a given range.
             */
            deleteRange: (range: Range) => Command;
        };
    }
}
export declare const deleteRange: RawCommands['deleteRange'];
