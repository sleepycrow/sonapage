# 🐾 sonapage

A small [fursona schema](https://github.com/pyrox0/fursona-schema) viewer! Parses and displays .well-known/fursona files! Wow! :3  
As of v1.3 of the schema, it supports everything except birthdates.

## Reporting Bugs and Contributing

Please send bug reports, feature suggestions and patches via e-mail, to the appropriate mailing list on the project's [sourcehut page](https://sr.ht/~sleepycrow/sonapage/). For patches, you might want to use [git send-email](https://git-send-email.io) or -- if you have a sourcehut account -- the "Prepare a patchset" tool on the git repo page. Thanks! <3

As a fallback, this repo is mirrored on [GitHub](https://github.com/sleepycrow/sonapage/), contributions can also be made there.

## Local Development

```sh
# Serve frontend
bun install
bun dev

# Serve backend (in a separate console)
cd public/api
php -S 127.0.0.1:8000
```

## Deploying

```sh
bun run build

# ...then just copy everything in the dist/ folder to your site (make sure you get the hidden, dot-prefixed files!)
```
