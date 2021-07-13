import { NodeType, MarkType } from 'prosemirror-model';
import { Command, RawCommands } from '../types';
declare module '@tiptap/core' {
    interface Commands {
        resetAttributes: {
            /**
             * Resets some node attributes to the default value.
             */
            resetAttributes: (typeOrName: string | NodeType | MarkType, attributes: string | string[]) => Command;
        };
    }
}
export declare const resetAttributes: RawCommands['resetAttributes'];
