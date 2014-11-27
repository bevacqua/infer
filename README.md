# infer

> Infer a name from an email address

A demo is available at [bevacqua.github.io/infer][1]
# Install

```shell
npm install -S infer
```

# CLI

```shell
infer carlos@gmail.com
> carlos
```

# API

The API exposes a single `expose(email, placeholder)` method. The placeholder is used if the name cannot be inferred.

```shell
infer('carlos@gmail.com', 'you');
// <- carlos
```

# License

MIT

[1]: http://bevacqua.github.io/infer
