import { Command, RawCommands, Content } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        insertContent: {
            /**
             * Insert a node or string of HTML at the current position.
             */
            insertContent: (value: Content) => Command;
        };
    }
}
export declare const insertContent: RawCommands['insertContent'];
