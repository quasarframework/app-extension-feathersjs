# app-extension-graphql [WIP]
![official icon](https://img.shields.io/badge/Quasar%201.0-Official%20App%20Extension-blue.svg)
<a href="https://v1.quasar-framework.org" target="_blank"><img src="https://badge.fury.io/js/%40quasar%2Fquasar-app-extension-feathersjs.svg"></a>

| Statements | Branches | Functions | Lines |
 |-------|------------|----------|-----------|
 | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") 

This is the official Quasar 1.0 App-Extension for graphql.

## Installation
IN DEVELOPMENT, DO NOT USE IN PRODUCTION.

```
$ quasar ext add @quasar/feathersjs
```

### How to use

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

1. Install your dependencies

    ```
    $ cd path/to/server-feathers; yarn
    ```

2. Start your app

    ```
    $ node src/
    ```

## Default User

Open another terminal window and add a test user:

```
curl 'http://localhost:3030/users/' -H 'Content-Type: application/json' --data-binary '{ "email": "feathers@example.com", "password": "secret" }'
```

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
