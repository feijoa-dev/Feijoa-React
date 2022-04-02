# @feijoa/react


[![NPM](https://img.shields.io/npm/v/@feijoa/react.svg)](https://www.npmjs.com/package/@feijoa/react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

- [Dashboard](#dashboard)
- [Install](#install)
- [Usage](#usage)
- [Setup](#setup)
- [Problem](#problem)
- [Solution](#solution)
- [Props](#props)
- [Environment Variables](#environment-variables)
- [Overrides](#overrides)

## Dashboard

[Feijoa Dashboard](https://app.feijoa.dev)

## Install

```bash
npm install --save feijoa-react
```

## Usage

### Component

```tsx
import React, { Component } from 'react'

import { Feature } from "@feijoa/react";

class Example extends Component {
  render() {
    return (
      <Feature enabled={true}>
        <MyFeature />
      <Feature>
    )
  }
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

## Setup

Feijoa offers a centralised dashboard for managing features. As shown in the examples above, this is not essential for using this library but the advantages are discussed below.

## Problem

Feature flags are a great way to manage your feature release. They make it super easy to enable or disable your feature with the flick of a switch. However, as your application grows and you get more and more features and more and more developers on the team, it becomes a lot harder trying to manage all your feature flags. 

Flags become obsolete, meaning your feature has been fully released but you still have relics of flags in your environment variables. 

You also need to make sure your other team members have access to the list of feature flags in their environment variables since they are typically not version controlled. 

Furthermore, in order to toggle the value of a feature flag, you often need to do a release if your flag is in your source code or force your app / server to restart so that it picks up your new environment variable value. 

## Solution

Feijoa tries to simplify feature flag management by providing a centralised dashboard to manage all these features. Flags can be toggled in real time allowing anybody to enable a feature when they are ready or even immediately disable it if they notice a bug. Sometimes a dashboard can be overkill so Feijoa still offers the ability to manage flags with booleans or environment variables to make things easy to get up and running. 

## Props

| Prop            | Type        | Description                                                       | Required |
| ------------    | ----------- | -------------------------------------------------------           | ---------|
| `enabled`       | boolean     | `true` = show, `false` = hide                                     | false    |
| `envVar`        | string      | Maps to a environment variable                                    | false    |
| `flag`          | string      | Maps to a flag managed in Feijoa Dashboard                        | false    |
| `defaultValue`  | boolean     | Sets the initial value of your feature when your app loads        | false    |
-------------------------

## Environment Variables

*NOTE: All env vars can be prefixed with `REACT_APP_` for use with create-react-app*

| Env Var         | Type        | Description                                                       | 
| ------------    | ----------- | -------------------------------------------------------           | 
| `FEIJOA_ENV` | string      | Sets the environment for the managed feature flag and maps to the environments configured in Feijoa Dashboard. The defaults are `local`, `development`, `staging`, `production` but you can add custom environments in the dashboard| 
| `FEIJOA_APP_ID` | string      | Sets the app ID of your Feijoa configured app |
| `FEIJOA_ACCESS_KEY` | string  | Sets your access key provided in the Feijoa Dashboard to grant access to the app | 
-------------------------

## Overrides

Sometimes it's useful for some users to be able override feature flags on their local browser. This is paticularly useful if you want a feature disabled for the public but need to enable it for a one person to test. E.g. for the QA tester or a product owner etc.

This can be done either via a query string or via a setting a cookie

*NOTE: query string or cookie keys must match either the `flag` or `envVar` name you pass into the Feijoa component or hook*

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
