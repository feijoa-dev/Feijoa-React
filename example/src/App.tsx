import React from 'react'

import { 
  useFeature, 
  Feature
} from '@feijoa/react'

const App = () => {

  const showBooleanFeature = useFeature({
    enabled: true
  })

  const hideBooleanFeature = useFeature({
    enabled: false
  })
  
  return (
    <>
      <Feature envVar="VISIBLE_FEATURE">
        <p className='other-unmanaged-feature-flag'>New Visible Feature</p>
      </Feature>
      <Feature envVar="REACT_APP_VISIBLE_FEATURE">
        <p className='unmanaged-feature-flag'>Env var Visible</p>
      </Feature>
      <Feature envVar="REACT_APP_HIDDEN_FEATURE">
        <p className='unmanaged-feature-flag hidden'>Env var Hidden</p>
      </Feature>

      {
        showBooleanFeature && <p>Visible hook with boolean flag</p>
      }

      {
        hideBooleanFeature && <p>Hidden hook with boolean flag</p>
      }
    </>
  )
}

export default App
