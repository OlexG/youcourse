import { useEffect, useState } from "react";
import { getItems } from "./api";

export function useUsername() {
  const [username, setUsername] = useState<null|string>(null);

  useEffect(()=>{
    setUsername(localStorage.getItem("username"))
  }, [])

  return username
}