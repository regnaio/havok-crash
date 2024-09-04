# havok-crash

```shell

docker build --target nonroot-dev -t havok-ts-dev .

docker run -it --rm -p 3000:3000 --name havok-ts-dev-container -v ${PWD}:/home/nonroot/app havok-ts-dev /bin/bash

npm i

npm run clean && npm run format && npm run lint && npm run build

npx --yes serve ./dist/ -p 3000

```

http://localhost:3000/
