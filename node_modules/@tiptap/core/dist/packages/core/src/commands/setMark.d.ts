import { MarkType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        setMark: {
            /**
             * Add a mark with new attributes.
             */
            setMark: (typeOrName: string | MarkType, attributes?: Record<string, any>) => Command;
        };
    }
}
export declare const setMark: RawCommands['setMark'];
