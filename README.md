# @featurely/react

[![NPM](https://img.shields.io/npm/v/@featurely/react.svg)](https://www.npmjs.com/package/@featurely/react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save feijoa-react
```

## Usage

```tsx
import React, { Component } from 'react'

import { Feature } from "@featurely/react";

class Example extends Component {
  render() {
    return (
      <Feature flag="my-feature-flag">
        <MyFeature />
      <Feature>
    )
  }
}
```

## License

MIT © [stretch0](https://github.com/stretch0)
