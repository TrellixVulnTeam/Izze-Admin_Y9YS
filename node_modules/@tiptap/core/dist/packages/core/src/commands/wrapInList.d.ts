import { NodeType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        wrapInList: {
            /**
             * Wrap a node in a list.
             */
            wrapInList: (typeOrName: string | NodeType, attributes?: Record<string, any>) => Command;
        };
    }
}
export declare const wrapInList: RawCommands['wrapInList'];
