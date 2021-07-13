import { NodeType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        lift: {
            /**
             * Removes an existing wrap.
             */
            lift: (typeOrName: string | NodeType, attributes?: Record<string, any>) => Command;
        };
    }
}
export declare const lift: RawCommands['lift'];
