import React from 'react'

import { useFeature, Feature} from '@feijoa/react'

const App = () => {
  
  const showVisibleFeature = useFeature({
    flag: "visible"
  })

  const showHiddenFeature = useFeature({
    flag: "hidden"
  })

  const showBooleanFeature = useFeature({
    enabled: true
  })

  const hideBooleanFeature = useFeature({
    enabled: false
  })
  
  return (
    <>
      <Feature flag="visible">
        <p className='feature-flag'>Visible</p>
      </Feature>
      <Feature flag="hidden">
        <p className='feature-flag hidden'>Visible</p>
      </Feature>

      <Feature flag="visible">
        <p className='unmanaged-feature-flag'>Unmanaged Visible</p>
      </Feature>
      <Feature flag="hidden">
        <p className='unmanaged-feature-flag hidden'>Unmanaged Hidden</p>
      </Feature>

      {
        showVisibleFeature && <p>Visible hook</p>
      }
      {
        showHiddenFeature && <p>Hidden hook</p>
      }

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
