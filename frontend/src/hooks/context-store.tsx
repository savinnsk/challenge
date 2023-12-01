import { AuthContext } from "@/store/context-provider";
import { useContext } from "react";

export default function useContextStore(): any {
  return useContext(AuthContext);
}
