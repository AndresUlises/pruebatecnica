import { useContext } from "react";
import { ContextConsumer } from "../store";

export function useSelector(selector = (state) => state) {
  const globalState = useContext(ContextConsumer);
  return selector(globalState.state);
}
