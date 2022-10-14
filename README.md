# @feijoa/react


[![NPM](https://img.shields.io/npm/v/@feijoa/react.svg)](https://www.npmjs.com/package/@feijoa/react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

- [What is Feijoa](#what-is-feijoa)
- [Install](#install)
- [Problem](#problem)
- [Usage](#usage)
- [Props](#props)
- [Overrides](#overrides)

## What is Feijoa?
A comprehensive React feature flag library providing reusable components and hooks along with easy override features so internal, non-technical users can toggle them off with ease without effecting anybody else.

## Problem

As code bases grow larger, it can be unclear what code is part of a feature and if it should be enabled. Some feature flags are also unclear if they are part of some other config or just simply a conditional statement. Having a verbose feature flag component or hook helps distinguish them from the rest of your code.

Old feature flags often get left in code bases as teams are unsure if they are still being used or not. Having a common component to manage features makes it much easier to find them all when the time comes to remove them.

## Install

```bash
npm install --save feijoa-react
```
or
```bash
yarn add feijoa-react
```

## Usage

```sh 
#.env
FEATURE_ENABLED=true
# or if you're using create react app
REACT_APP_FEATURE_ENABLED=true
```

### Component
```tsx
import React, { Component } from 'react'

import { Feature } from "@feijoa/react";

const Example = () => {
  return (
    <Feature envVar="FEATURE_ENABLED">
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
    enabled: true
  });

  return (
    showFeature ? <MyFeature /> : null
  );
}
```

## Props

| Prop            | Type        | Description                                                       | Required |
| ------------    | ----------- | -------------------------------------------------------           | ---------|
| `enabled`       | boolean     | `true` = show, `false` = hide                                     | false    |
| `envVar`        | string      | Maps to a environment variable                                    | false    |
| `defaultValue`  | boolean     | Sets the initial value of your feature when your app loads        | false    |
| `name`          | string      | Name of your feature flag (used for overrides)                    | false    |
-------------------------

## Overrides

Sometimes it's useful for some users to be able override feature flags on their local browser. This is particularly useful if you want a feature disabled for the public but need to enable it for a one person to test. E.g. for the QA tester or a product owner etc.

This can be done either via a query string or via a setting a cookie

*NOTE: query string or cookie keys must match the `envVar` name you pass into the Feijoa component or hook*

### Query string

```sh
 // enable
 https://example.com?my_feature=true

 // disable
 https://example.com?my_feature=false
```

### Cookie

```js
  // enable
  document.cookie = 'my_feature=true;'

  // disable
  document.cookie = 'my_feature=false;'
```

## License

MIT © [Feijoa Dev](https://github.com/feijoa-dev)
