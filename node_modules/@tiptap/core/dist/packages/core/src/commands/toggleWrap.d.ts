import { NodeType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        toggleWrap: {
            /**
             * Wraps nodes in another node, or removes an existing wrap.
             */
            toggleWrap: (typeOrName: string | NodeType, attributes?: Record<string, any>) => Command;
        };
    }
}
export declare const toggleWrap: RawCommands['toggleWrap'];
