import { EditorState, Transaction } from 'prosemirror-state';
import { Editor } from './Editor';
import { SingleCommands, ChainedCommands, CanCommands, RawCommands, CommandProps } from './types';
export default class CommandManager {
    editor: Editor;
    commands: RawCommands;
    constructor(editor: Editor, commands: RawCommands);
    createCommands(): SingleCommands;
    createChain(startTr?: Transaction, shouldDispatch?: boolean): ChainedCommands;
    createCan(startTr?: Transaction): CanCommands;
    buildProps(tr: Transaction, shouldDispatch?: boolean): CommandProps;
    chainableState(tr: Transaction, state: EditorState): EditorState;
}
