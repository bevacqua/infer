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
> 'carlos'
```

# API

The API exposes a single `expose(email, placeholder?, strict?)` method. The placeholder is used if the name cannot be inferred.

```shell
infer('carlos@gmail.com', 'you');
// <- 'carlos'
```

The return value is a name when it matches completely with some part of the email address.

```js
infer('nicolas_bevacqua+spam@gmail.com', 'you');
// <- 'nicolas'
```

If no name is matched, the full local part of the address is returned.

```js
infer('abudabi+junk@gmail.com');
// <- 'abudabi'
```

If the input wasn't even a valid email address, the `placeholder` is returned.

```js
infer('abudabi');
// <- 'you'
```

If the input didn't match up with a name and `strict` is truthy, the `placeholder` is returned as well.

```js
infer('abudabi@gmail.com', 'foo', true);
// <- 'foo'
```

# License

MIT

[1]: http://bevacqua.github.io/infer
