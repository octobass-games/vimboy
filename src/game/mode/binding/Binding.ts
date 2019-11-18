import Action from "../action/Action";
import { Verb, Noun } from "../../../constants/verbsAndNouns";

export enum BindingType {
  NORMAL,
  PICKUP
}

interface BindingBase {
  key: string;
  action: Action;
  type: BindingType;
}

export interface NormalBinding extends BindingBase {
  type: BindingType.NORMAL;
}

export interface PickupBinding extends BindingBase {
  type: BindingType.PICKUP;
  verb: Verb;
  noun: Noun;
  name: string;
}

type Binding = NormalBinding | PickupBinding;

export default Binding;
