import { NodeType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        toggleNode: {
            /**
             * Toggle a node with another node.
             */
            toggleNode: (typeOrName: string | NodeType, toggleTypeOrName: string | NodeType, attributes?: Record<string, any>) => Command;
        };
    }
}
export declare const toggleNode: RawCommands['toggleNode'];
