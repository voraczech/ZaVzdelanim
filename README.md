# zavzdelanim

> Software pro agregaci vzdělávacích akcí
> Součástí je git repozitář nasměrovaný na `master` větev pro lokální spuštění. Produkční verze se nachází na větvi `aaa`, ta běží ale na vlastním prostředí. 

## Prerekvizity

- node.js (verze >=10)

- yarn

- git (pouze v případě přístupu k různým verzím)

## Instalace

Preferovaným způsobem je instalace yarn balíčků (ty by ale měly být zahrnuty) a následné lokální spuštění

``` bash
# instalace, neměla by být třeba
$ yarn

# spuštění na localhost:3000
$ yarn nuxt

```

Případně lze použít i následující příkazy, jsou uvedeny pouze informativně

``` bash
# alternativní příkaz instalace
$ yarn install

# alternativní příkaz spuštění na localhost:3000
$ yarn dev

# build pro produkci a spuštění serveru (otestovaným způsobem je spuštění prvního příkazu a spuštění složky /dist vlastním způsobem na localhostu)
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

Další informace poskytují [NuxtJS docs](https://nuxtjs.org).
