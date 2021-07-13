import { NodeType } from 'prosemirror-model';
import { Command, RawCommands, Range } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        replaceRange: {
            /**
             * Replaces text with a node within a range.
             */
            replaceRange: (range: Range, typeOrName: string | NodeType, attributes?: Record<string, any>) => Command;
        };
    }
}
export declare const replaceRange: RawCommands['replaceRange'];
