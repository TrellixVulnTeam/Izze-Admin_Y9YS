import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        blur: {
            /**
             * Removes focus from the editor.
             */
            blur: () => Command;
        };
    }
}
export declare const blur: RawCommands['blur'];
