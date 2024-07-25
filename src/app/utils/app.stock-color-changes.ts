import {Colors} from "../shared/app.colors";
import {DAILY_AMOUNT_STACK_COLORS_CHANGE} from "../shared/app.constants";

const getActiveColor = (color: Colors): Colors => {
  return DAILY_AMOUNT_STACK_COLORS_CHANGE.get(color) ?? color;
}

const getLightColor = (color: Colors): Colors => {
  return DAILY_AMOUNT_STACK_COLORS_CHANGE.get(color) ?? color;
}

export {
  getActiveColor,
  getLightColor
}
