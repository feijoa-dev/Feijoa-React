import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Feature from '.'

describe('Feature Component', () => {

  describe.only("Unmanaged flags", () => {
    it('Should render feature when enabled value is true', () => {

      const { queryByText } = render(
        <Feature enabled={true}>
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeTruthy()
    })

    it('Should NOT render feature when enabled value is false', () => {

      const { queryByText } = render(
        <Feature enabled={false}>
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeFalsy()
    })

    it('Should render feature when environment variable value is true', () => {

      const { queryByText } = render(
        <Feature envVar="REACT_APP_SHOW_FEATURE_1">
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeTruthy()
    })

    it('Should NOT render feature when environment variable value is false', () => {

      const { queryByText } = render(
        <Feature envVar="REACT_APP_SHOW_FEATURE_2">
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeFalsy()
    })
  })
})
