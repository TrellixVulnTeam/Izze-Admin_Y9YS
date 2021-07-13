import { NodeType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        liftListItem: {
            /**
             * Lift the list item into a wrapping list.
             */
            liftListItem: (typeOrName: string | NodeType) => Command;
        };
    }
}
export declare const liftListItem: RawCommands['liftListItem'];
