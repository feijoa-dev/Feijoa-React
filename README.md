# @feijoa/react

[![NPM](https://img.shields.io/npm/v/@feijoa/react.svg)](https://www.npmjs.com/package/@feijoa/react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

- [What is Feijoa](#what-is-feijoa)
- [Problem](#problem)
- [Install](#install)
- [Usage](#usage)
- [Props](#props)
- [Overrides](#overrides)

## What is Feijoa?
A comprehensive React feature flag library providing reusable components and hooks along with easy override features so internal, non-technical users can toggle them off with ease without effecting anybody else.

## Problem

As code bases grow larger, it can be unclear what code is part of a feature and if it should be enabled. Some feature flags are also unclear if they are part of some other config or just simply a conditional statement. Having a verbose feature flag component or hook helps distinguish them from the rest of your code.

## Install

```bash
npm install --save feijoa-react
```
or
```bash
yarn add feijoa-react
```

## Usage

### Component
```tsx
import React, { Component } from 'react'

import { Feature } from "@feijoa/react";

const Example = () => {
  return (
    <Feature name="MY_FEATURE">
      <MyFeature />
    <Feature>
  );
}
```

### Hook

```tsx
import React, { Component } from 'react'

import { useFeature } from "@feijoa/react";

const Example = () => {
  const showFeature = useFeature({
    name: "MY_FEATURE"
  });

  return (
    showFeature ? <MyFeature /> : null
  );
}
```

You can use the `enabled` prop to conditionally enable your feature

```tsx
import React, { Component } from 'react'

import { useFeature } from "@feijoa/react";

const Example = () => {
  const showFeature = useFeature({
    name: "MY_OTHER_FEATURE",
    enabled: true
  });

  return (
    showFeature ? <MyFeature /> : null
  );
}
```

## Props

| Prop            | Type        | Description                                                       | Required | default Value  |
| ------------    | ----------- | -------------------------------------------------------           | ---------| ---------|
| `name`          | string      | Name of your feature flag (used for overrides)                    | true     | N/A      |
| `enabled`       | boolean     | `true` = show, `false` = hide                                     | false    | `false`    |
-------------------------

## Overrides

Sometimes it's useful for some users to be able override feature flags on their local browser. This is particularly useful if you want a feature disabled for the public but need to enable it for a one person to test. E.g. for the QA tester or a product owner etc.

This can be done either via a query string or via a setting a cookie

*NOTE: query string or cookie keys must match the `name` you pass into the Feijoa component or hook props*

### Query string

```sh
 // enable
 https://example.com?MY_FEATURE=true

 // disable
 https://example.com?MY_FEATURE=false
```

### Cookie

```js
  // enable
  document.cookie = 'MY_FEATURE=true;'

  // disable
  document.cookie = 'MY_FEATURE=false;'
```

Environment Variables
```sh 
#.env
MY_FEATURE=true
# or if you're using create react app
REACT_APP_MY_FEATURE=true
# or if you're using Gatsby
GATSBY_MY_FEATURE=true
```

## License

MIT © [Feijoa Dev](https://github.com/feijoa-dev)
