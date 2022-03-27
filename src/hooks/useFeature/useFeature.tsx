import { useEffect, useMemo, useState } from "react"
import { FeatureProps } from "../../types/Feature.types";
import createSocketClient from '../../socketClient';
import { FEATURE_FLAG } from "../../constants/socketEvents";

const {
  FEATURELY_ENV,
  REACT_APP_FEATURELY_ENV,
  NODE_ENV
} = process.env;

const useFeature = ({ 
  flag,
  enabled,
  envVar,
  defaultValue = false
}: FeatureProps): boolean => {

  const useManagedFlag = flag !== undefined;

  const [featureEnabled, setFeatureEnabled] = useState<boolean>(() => {

    if( envVar !== undefined ) {
      return process.env?.[envVar] === "true";
    }

    if( enabled !== undefined ) {
      return enabled;
    }
    
    if( defaultValue !== undefined ) {
      return defaultValue;
    }

    return false;
  });

  const environment = useMemo(() => {
    if ( FEATURELY_ENV !== undefined ) {
      return FEATURELY_ENV;
    }

    if ( REACT_APP_FEATURELY_ENV !== undefined ) {
      return REACT_APP_FEATURELY_ENV;
    }

    if ( NODE_ENV !== undefined ) {
      return NODE_ENV;
    }

    return "development";
  }, []);
  
  useEffect(() => {
    
    if( !useManagedFlag ) {
      return
    }
    
    const socketClient = createSocketClient({
      flagName: flag as string,
      environment: environment
    }).connect();

    socketClient.on(FEATURE_FLAG.VALUE, (featureEnabled: boolean) => {
      setFeatureEnabled(featureEnabled);
    });
    
    socketClient.on(FEATURE_FLAG.UPDATED, (featureEnabled: boolean) => {
      setFeatureEnabled(featureEnabled);
    });

    return () => {
      socketClient.removeListener(FEATURE_FLAG.VALUE);
      socketClient.removeListener(FEATURE_FLAG.UPDATED);
    }
    
  }, []);

  return featureEnabled;
}

export default useFeature;