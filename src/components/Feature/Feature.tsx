import React, { 
  FC, 
  Fragment
} from "react";
import { FeatureProps } from '../../types/Feature.types';
import useFeature from "../../hooks/useFeature";

const Feature: FC<FeatureProps> = ({ 
  enabled,
  envVar,
  children,
  defaultValue = false
}) => {

  const flagEnabled = useFeature({
    enabled,
    envVar,
    defaultValue
  });

  return (
    <Fragment>
      {flagEnabled && children}
    </Fragment>
  )
};

export default Feature;
