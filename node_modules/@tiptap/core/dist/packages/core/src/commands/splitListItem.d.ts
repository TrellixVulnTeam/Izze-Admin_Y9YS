import { NodeType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        splitListItem: {
            /**
             * Splits one list item into two list items.
             */
            splitListItem: (typeOrName: string | NodeType) => Command;
        };
    }
}
export declare const splitListItem: RawCommands['splitListItem'];
