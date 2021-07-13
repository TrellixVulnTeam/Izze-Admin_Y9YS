import { NodeType, MarkType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        updateAttributes: {
            /**
             * Update attributes of a node or mark.
             */
            updateAttributes: (typeOrName: string | NodeType | MarkType, attributes: Record<string, any>) => Command;
        };
    }
}
export declare const updateAttributes: RawCommands['updateAttributes'];
