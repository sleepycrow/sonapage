# 🐾 sonapage

A small [fursona schema](https://github.com/pyrox0/fursona-schema) viewer! Parses and displays .well-known/fursona files! Wow! :3  
As of v1.3 of the schema, it supports everything except birthdates.

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
