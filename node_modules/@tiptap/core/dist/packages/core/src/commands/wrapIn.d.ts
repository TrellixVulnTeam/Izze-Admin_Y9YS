import { NodeType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        wrapIn: {
            /**
             * Wraps nodes in another node.
             */
            wrapIn: (typeOrName: string | NodeType, attributes?: Record<string, any>) => Command;
        };
    }
}
export declare const wrapIn: RawCommands['wrapIn'];
