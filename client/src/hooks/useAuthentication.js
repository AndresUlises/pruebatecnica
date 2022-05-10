
import Cookies from "js-cookie";

export function useAuthentication() {
  return Cookies.get('AUTH_TOKEN');
}
