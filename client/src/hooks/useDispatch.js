import { useContext } from "react";
import { ContextConsumer } from "../store";

export function useDispatch() {
  const globalState = useContext(ContextConsumer);
  return globalState.dispatch;
}
