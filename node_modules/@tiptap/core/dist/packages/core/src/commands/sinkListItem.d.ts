import { NodeType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        sinkListItem: {
            /**
             * Sink the list item down into an inner list.
             */
            sinkListItem: (typeOrName: string | NodeType) => Command;
        };
    }
}
export declare const sinkListItem: RawCommands['sinkListItem'];
