#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');
const homedir = require('os').homedir();
const Wallet = require('ethereumjs-wallet');
const EthUtil = require('ethereumjs-util');
const {utils} = require('nahmii-sdk');

const argv = require('yargs')
  .usage('Usage: $0 [--out-dir=<out-dir>] <privateKey> <password>')
  .options({
    'out-dir': {
      describe: 'Output directory',
      type: 'string',
      nargs: 1,
      default: path.resolve(homedir, '.nahmii/keystore')
    }
  })
  .fail((msg, err) => {
    if (err) {
      if (process.env.LOG_LEVEL === 'debug')
        console.error(err.stack);
      else
        console.error('Error: ' + err.message);
    } else
      console.error(msg);
    process.exit(1);
  })
  .strict()
  .help()
  .version(false)
  .parse();

const privateKey = argv._[0];
const password = argv._[1];
const keystoreDir = argv.outDir;

const wallet = Wallet.fromPrivateKey(EthUtil.toBuffer(utils.prefix0x(privateKey)));

const keystore = wallet.toV3(password);

if (!fs.existsSync(keystoreDir))
  fs.mkdirSync(keystoreDir, {recursive: true});

fs.writeFileSync(path.join(keystoreDir, wallet.getV3Filename()), JSON.stringify(keystore), 'utf-8');
