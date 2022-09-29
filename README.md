# Installation

```bash
$ git clone https://github.com/vladbarcelo/coinmarketcap-test.git
$ npm i
$ npm run build
$ cp .env.example .env
# Don't forget to enter your API key in .env
```

# Usage

```bash
$ node dist/main.js convert --from=BTC --to=USD --amount=1
# 340162.75
# You can also select the digit count
$ node dist/main.js convert --from=BTC --to=USD --amount=1 --digits=4
# 340162.7590
```