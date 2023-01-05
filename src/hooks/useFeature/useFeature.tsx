import { useMemo } from "react"
import fromEntries from "object.fromentries";
import { FeatureProps } from "../../types/Feature.types";

const isNil = (val: any): boolean => val === undefined || val === null;

const getBoolVal = (val?: string|boolean|null): boolean => {

  if( typeof val === "string" ) {
    switch(val) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        return false;
    }
  }

  return !!val;
}

const useFeature = ({ 
  name,
  enabled
}: FeatureProps): boolean => {

  const cookies = useMemo(() => {
    if( !global.window ) {
      return {}
    }
    return document.cookie.split(";")
      .map(cookie => cookie.replace(" ", ""))
      .reduce((acc, cookie) => (
        Object.assign(acc, {
          [cookie.split('=')[0]]: cookie.split('=')[1]
        })
      ), {});
  }, [])

  const featureEnabled = useMemo((): boolean => {

    const urlSearchParams = global.window && new URLSearchParams(global.window.location.search);
    const myParam = urlSearchParams ? urlSearchParams.get(name) : null;
    
    const envVar = 
      process.env?.[name] ||
      process.env?.[`REACT_APP_${name}`] || 
      process.env?.[`GATSBY_${name}`]
    
    if( !isNil(cookies[name]) ) {
      return getBoolVal(cookies[name])
    }

    if( !isNil(myParam) ) {
      return getBoolVal(myParam)
    }
    
    if( !isNil(envVar) ) {
      return getBoolVal(envVar)
    }

    return !!enabled
  }, [name, enabled, cookies])

  return featureEnabled;
}

export default useFeature;