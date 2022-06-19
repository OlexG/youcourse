import { useEffect, useState } from "react";
import { getItems } from "./api";

interface ICourses {
  _id: string
  title: string
  author: string
  items: {
    type: string
    link?: string
    text?: string
  }[]
}

export function useFetchTopCourses() {
  const [courses, setCourses] = useState<ICourses[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getItems().then(res => {
      setCourses(res)
      setLoading(false);
    });
  }, []);
  
  return { courses, loading };
}