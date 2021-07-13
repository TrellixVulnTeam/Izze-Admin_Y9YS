import { MarkType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        toggleMark: {
            /**
             * Toggle a mark on and off.
             */
            toggleMark: (typeOrName: string | MarkType, attributes?: Record<string, any>) => Command;
        };
    }
}
export declare const toggleMark: RawCommands['toggleMark'];
