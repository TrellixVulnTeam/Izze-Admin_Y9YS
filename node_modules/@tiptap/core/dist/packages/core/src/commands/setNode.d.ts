import { NodeType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        setNode: {
            /**
             * Replace a given range with a node.
             */
            setNode: (typeOrName: string | NodeType, attributes?: Record<string, any>) => Command;
        };
    }
}
export declare const setNode: RawCommands['setNode'];
