Not implemented yet.

Idea here is the following:

```
onTouchMove={momentum(doStuff)}
```

`momentum` function gives the same values as `onTouchMove` normally would, but also takes momentum into account - so `momentum` would fire also after the `onTouchEnd` event.
