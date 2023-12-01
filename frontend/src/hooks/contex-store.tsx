import { AuthContext } from "@/store/context-provider";
import { useContext } from "react";

export default function userContextStore() {
  return useContext(AuthContext);
}
