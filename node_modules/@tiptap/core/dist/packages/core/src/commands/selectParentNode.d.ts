import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        selectParentNode: {
            /**
             * Select the parent node.
             */
            selectParentNode: () => Command;
        };
    }
}
export declare const selectParentNode: RawCommands['selectParentNode'];
