import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        command: {
            /**
             * Define a command inline.
             */
            command: (fn: (props: Parameters<Command>[0]) => boolean) => Command;
        };
    }
}
export declare const command: RawCommands['command'];
