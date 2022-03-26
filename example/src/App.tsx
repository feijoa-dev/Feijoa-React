import React from 'react'

import { Feature } from '@feijoa/react'

const App = () => {
  return (
    <>
      <Feature flag="test">
        <p>Feature 1</p>
      </Feature>
      <Feature flag="test-3">
        <p>Feature 2</p>
      </Feature>
      <Feature flag="visible">
        <p>Feature 3</p>
      </Feature>
    </>
  )
}

export default App
