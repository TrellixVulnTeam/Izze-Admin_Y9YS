import { NodeType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        toggleList: {
            /**
             * Toggle between different list types.
             */
            toggleList: (listTypeOrName: string | NodeType, itemTypeOrName: string | NodeType) => Command;
        };
    }
}
export declare const toggleList: RawCommands['toggleList'];
