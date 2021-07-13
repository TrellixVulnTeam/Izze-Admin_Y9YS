import { MarkType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        unsetMark: {
            /**
             * Remove all marks in the current selection.
             */
            unsetMark: (typeOrName: string | MarkType) => Command;
        };
    }
}
export declare const unsetMark: RawCommands['unsetMark'];
