#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');
const homedir = require('os').homedir();
const Wallet = require('ethereumjs-wallet');

const argv = require('yargs')
  .usage('Usage: $0 [--dump-private-key] [--out-dir=<out-dir>] <password>')
  .options({
    'dump-private-key': {
      describe: 'Dump the private key to console',
      type: 'boolean',
      default: false
    },
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

const password = argv._[0];
const keystoreDir = argv.outDir;

const wallet = Wallet.generate();

const keystore = wallet.toV3(password);

if (!fs.existsSync(keystoreDir))
  fs.mkdirSync(keystoreDir, {recursive: true});

fs.writeFileSync(path.join(keystoreDir, wallet.getV3Filename()), JSON.stringify(keystore), 'utf-8');

if (argv.dumpPrivateKey)
  console.log(`Private key of 0x${wallet.getAddress().toString('hex')}: ${wallet.getPrivateKey().toString('hex')}`);
