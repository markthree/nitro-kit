# nitro-kit

simple kit for nitro

<br />

## setup

```shell
npm i nitro-kit -D
```

### appToEvent

```ts
// in nitro middleware
import { appToEvent } from "nitro-kit";

// some express logic

export default appToEvent(app, "express");
```
