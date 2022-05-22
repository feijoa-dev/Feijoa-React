import { useEffect, useState } from "react"
import { FeatureProps } from "@/types/Feature.types";

const getBoolVal = (val: string): boolean => {
  switch(val) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return false;
  }
}

const useFeature = ({ 
  enabled,
  envVar,
  defaultValue = false
}: FeatureProps): boolean => {

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const cookies = document.cookie.split(";").reduce( (ac, cv) => (
    Object.assign(ac, {[cv.split('=')[0]]: cv.split('=')[1]})
  ), {});

  const [featureEnabled, setFeatureEnabled] = useState<boolean>(() => {

    if( envVar !== undefined ) {

      const environmentVariable = process.env?.[envVar] || process.env?.[`REACT_APP_${envVar}`]
      
      if ( !environmentVariable ) {
        console.error(`No environment variable found in process.env with value: ${envVar}`);
      }
      
      return environmentVariable === "true";
    }

    if( enabled !== undefined ) {
      return enabled;
    }
    
    if( defaultValue !== undefined ) {
      return defaultValue;
    }

    return false;
  });

  useEffect(() => {
    
    if( envVar && params?.[envVar] ) {
      setFeatureEnabled(getBoolVal(params[envVar]));  
    }

    if( envVar && params?.[envVar?.replace("REACT_APP_", "")] ) {
      setFeatureEnabled(getBoolVal(params[envVar]));  
    }

    if( envVar && cookies?.[envVar] ) {
      setFeatureEnabled(getBoolVal(cookies[envVar]));  
    }

    if( envVar && cookies?.[envVar?.replace("REACT_APP_", "")] ) {
      setFeatureEnabled(getBoolVal(cookies[envVar]));  
    }

  }, [params, cookies])

  return featureEnabled;
}

export default useFeature;