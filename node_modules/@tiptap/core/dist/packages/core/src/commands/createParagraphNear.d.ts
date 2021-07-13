import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        createParagraphNear: {
            /**
             * Create a paragraph nearby.
             */
            createParagraphNear: () => Command;
        };
    }
}
export declare const createParagraphNear: RawCommands['createParagraphNear'];
