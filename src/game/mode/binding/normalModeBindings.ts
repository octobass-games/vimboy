import EnterInsertMode from "../action/EnterInsertMode";
import Binding, { BindingType } from "./Binding";
import MoveDown from "../action/MoveDown";
import MoveUp from "../action/MoveUp";
import MoveLeft from "../action/MoveLeft";
import MoveRight from "../action/MoveRight";
import MoveToTop from "../action/MoveToTop";
import MoveToBottom from "../action/MoveToBottom";
import EnterCommandMode from "../action/EnterCommandMode";
import JumpBackParagraph from "../action/JumpBackParagraph";
import DeleteLine from "../action/DeleteLine";
import { Verb, Noun } from "../../../constants/verbsAndNouns";
import DeleteWord from "../action/DeleteWord";

const bindings: Binding[] = [
  { key: "i", action: new EnterInsertMode(), type: BindingType.NORMAL },
  { key: "j", action: new MoveDown(), type: BindingType.NORMAL },
  { key: "k", action: new MoveUp(), type: BindingType.NORMAL },
  { key: "h", action: new MoveLeft(), type: BindingType.NORMAL },
  { key: "l", action: new MoveRight(), type: BindingType.NORMAL },
  { key: "gg", action: new MoveToTop(), type: BindingType.NORMAL },
  { key: "ShiftG", action: new MoveToBottom(), type: BindingType.NORMAL },
  { key: "Shift:", action: new EnterCommandMode(), type: BindingType.NORMAL },
  {
    key: "Shift{",
    action: new JumpBackParagraph(),
    type: BindingType.NORMAL
  },
  {
    key: "dd",
    action: new DeleteLine(),
    type: BindingType.PICKUP,
    verb: Verb.d,
    noun: Noun.d,
    name: "Delete Line"
  },
  {
    key: "dw",
    action: new DeleteWord(),
    type: BindingType.PICKUP,
    verb: Verb.d,
    noun: Noun.w,
    name: "Delete Word"
  }
];

export default bindings;
