# nitro-unkit

simple kit for nitro

<br />

## setup

```shell
npm i nitro-unkit -D
```

### appToEvent

```ts
// in nitro middleware
import { appToEvent } from "nitro-unkit";

// some express logic

export default appToEvent(app, "express");
```
