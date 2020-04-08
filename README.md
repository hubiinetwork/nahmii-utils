# NAHMII UTILS

## About nahmii

[_nahmii_](https://www.nahmii.io) is _hubii_'s scaling solution for the Ethereum block chain. It is a
hybrid centralized/decentralized solution that enables instant
(micro-) payments, trading and trustless settlements.

## About hubii

See www.hubii.com for more information.

## Prerequisites

To use this software you need a version of **NodeJS and NPM**. The code base has been successfully tested
with NodeJS LTS versions v10.x and v12.x.

## Installation

To install and make the command part of your path:

    npm install -g github:hubiinetwork/nahmii-utils

## Generate keystore file from private key 

The binary for generation of keystore file from private and password is 
`private-key-to-keystore-file`.

To show the built-in help:

    > private-key-to-keystore-file --help
    Usage: private-key-to-keystore-file [--out-dir] <privateKey> <password>
    
    Options:
      --out-dir  Output directory
                             [string] [default: "<home directory>/.nahmii/keystore"]
      --help     Show help                                                 [boolean]

## Add keystore file from generated private key 

An alternate binary that takes a password, generates a random private key and
outputs into a keystore file exists as `add-keystore-file`.

To show the built-in help:

    > add-keystore-file --help
    Usage: add-keystore-file [--dump-private-key] [--out-dir] <password>
    
    Options:
      --dump-private-key  Dump the private key to console [boolean] [default: false]
      --out-dir           Output directory
                             [string] [default: "<home directory>/.nahmii/keystore"]
      --help              Show help                                        [boolean]

