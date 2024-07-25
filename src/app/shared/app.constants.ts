import {Colors} from "./app.colors";

export const DAILY_AMOUNT_STACK_COLORS_CHANGE: Map<Colors, Colors> = new Map([
  [Colors.LIGHT_GREEN, Colors.ACTIVE_GREEN],
  [Colors.LIGHT_RED, Colors.ACTIVE_RED],
  [Colors.LIGHT_BLUE, Colors.ACTIVE_BLUE],
  [Colors.ACTIVE_GREEN, Colors.LIGHT_GREEN],
  [Colors.ACTIVE_RED, Colors.LIGHT_RED],
  [Colors.ACTIVE_BLUE, Colors.LIGHT_BLUE],
]);

