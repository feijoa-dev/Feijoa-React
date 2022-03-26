import React, { 
  FC, 
  Fragment
} from "react";
import { FeatureProps } from '../../types/Feature.types';
import useFeature from "../../hooks/useFeature";

const Feature: FC<FeatureProps> = ({ 
  flag, 
  children,
  defaultValue = false
}) => {

  const flagEnabled = useFeature({
    flag,
    defaultValue
  });

  return (
    <Fragment>
      {flagEnabled && children}
    </Fragment>
  )
};

export default Feature;
