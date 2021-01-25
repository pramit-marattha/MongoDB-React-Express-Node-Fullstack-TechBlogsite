import React,{useState,useEffect} from 'react'

export const useLoaded = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);
    return loaded;
  };
  
