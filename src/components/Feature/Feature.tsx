import React, { 
  FC, 
  Fragment,
  useEffect,
  useMemo,
  useState
} from "react";
import createSocketClient from '../../socketClient';
import { FeatureProps } from './Feature.types';
import { FEATURE_FLAG } from "./socketEvents";

const {
  FEATURELY_ENV,
  REACT_APP_FEATURELY_ENV,
  NODE_ENV
} = process.env;

const Feature: FC<FeatureProps> = ({ 
  flag, 
  children,
  defaultValue = false
}) => {

  const [enabled, setEnabled] = useState(defaultValue);

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
    
    const socketClient = createSocketClient({
      flagName: flag,
      environment: environment
    }).connect();

    socketClient.on(FEATURE_FLAG.VALUE, (featureEnabled) => {
      setEnabled(featureEnabled);
    });
    
    socketClient.on(FEATURE_FLAG.UPDATED, (featureEnabled) => {
      setEnabled(featureEnabled);
    });

    return () => {
      socketClient.removeListener(FEATURE_FLAG.VALUE);
      socketClient.removeListener(FEATURE_FLAG.UPDATED);
    }
  }, [])

  if (!enabled) {
    return null;
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  )
};

export default Feature;
