# act - WORK IN PROGRESS

> *~think~ act different*

*app config tree*  
*automatic config tool*  
*autonomy creates trust*  
*alignment causes transformation*  
*TODO: create a three-word image generator as WIP for act itself.*  

`act` is a git-and-deno-based framework for distributed configuration management following the *code as configuration* pattern, inspired by [Facebook's `configerator`](https://research.fb.com/wp-content/uploads/2016/11/holistic-configuration-management-at-facebook.pdf) and VTEX IO [`apps and workspaces`](https://vtex.io/docs/concepts/workspace/).

`act` proposes a mechanism to version and deploy inter-dependent configuration packages (*apps*) for distributed services. It does that by defining how these *apps* and *services* may relate to each other (e.g. *extend, configure, depend*) and providing tools to deploy, run and A/B test these services over time.

You can think of `act` as an opinionated toolset that allows organizations to safely evolve how arbitrarily large and complex systems act. While git is a low-level powertool to manage the state of a specific set of files, `act` wraps it (and deno) to implement a distributed and scalable end-to-end configuration management solution.

## Getting started

`act-cli` implements the lowest level API of operations to manage the state of an `act tenant`, which is an `act`-managed git repository. To start using `act`, simply create a GitHub repository and add it as a remote by using the command:

```bash
> act login <org>/<repo>
```

This will clone the repository locally into `~/.act/tenants/<org>/<repo>` and allow you to interact with this tenant, e.g. manage branches, install apps, deploy release trains, etc.

`TODO: write detailed tutorial for getting started and link here. Should cover login, branch, install, build, deploy, merge.`

## act apps and services

Apps are the building blocks of `act` - to the top-level user, they act as enablers of certain features, but they are actually more versatile. Formally, they are versioned packages of code-as-configuration for services. When a list of apps is compiled together, a given state is produced, which will be used by a service to dynamically decide it's behaviour.

Services are running instances of *configurable* cloud software. They might be expressed in different languages and executed in multiple runtimes, but ultimately they respond to internet traffic and serve practical purposes. Services own their data and are independent - they provide a working functionality which is useful by itself, and that may change according to provided configuration. **Different configuration makes services act different**.

Apps declare four major hooks: builders (generate a versioned *build* from an *app source*), assemblers (generate a versioned *state* from a list of *builds*), runners (generate a response from a *request* and a given *state*) and *probers* (generate *status* from a list of *metrics*). Finally, they declare a *scorecard* which is the "declaration of a desired future as measured by *probers*". This allows them to create new *experiments*, consisting of proposed changes to configuration that would produce different outcomes (in terms of metrics).

## Building apps

Apps are expressed as a collection of `.ts` TypeScript files, which are *securely* executed by a Deno service. Apps may use any safe Deno packages to help them build complex configuration. These files must export specific `act` classes to express the intended configuration that should be used when this particular app is installed.

For example, the list of installed apps in a tenant **is a** TypeScript file named `installed.ts` that exports a `Deno.App[]`. The contents of this array must implement the `Deno.App` class, that is in itself declared in a TypeScript file defined by each imported app. This allows for flexible emergence of patterns for advanced configuration generation while leveraging all the modern tooling used to create typed software.

App code (which describes how to generate configuration) *and the resulting generated config files* are both versioned in git repositories.

## Publishing apps

Apps may be published to the `act registry` to allow for easy installation. The registry is actually a rewriter service for Github repositories, precisely like [deno.land/x/](https://deno.land/x/). This means publishing an app consists of creating a PR towards a centralized, versioned json file.

## The act cli

The act cli offers basic commands to interact with two types of repos:

- Tenant repo - represents the state of a tenant, which will ultimately express how services in a cloud infrastucture should act. This is where the state of installed apps is persisted and versioned.
- App repo - represents the proposed configuration that is exercised when this app is installed in a tenant.

An app may further be divided in two types:

- Services - declares a deployable service that responds to web traffic and may be configured by other apps.
- Configs - declares configuration that affects the behaviour of running services. 

(Technically, Services are ultimately Configs that affect the behaviour of the native `act` services, but pragmatically it is useful to create the distinctions of whether an app defines a new functionality altogether or simply exports configuration. Services also tipically require more effort to deploy and rollback than Configs.)

## Services are configured by apps

Services express they are configurable by defining "builders" (a `service/builder` combination might be referred to simply as `builder`, imprecisely). These builders are functions which receive as arguments any content in this builder's "folder" in the app source and returns either a successful build and any output files, or an error. These files are appended to the app package before it is published to the registry.

Apps are versioned git repositories with a specific structure:

- There is an app.ts definition file.
- Every folder represents a `service` this exports some configuration to.
- Every subsequent nested folder represents a `builder` in this service.
- Any nested folder and files are offered as arguments to this `builder` during publish.

## app.ts example file

```ts
import { App } from 'https://act.pm/std/1/app.ts'

export default new App({
  ...
})
```

Generated config:

```json
{
  "publisher": "act",
  "name": "calculator",
  "version": "4.2.0",
  "description": "",
  
  "bugs": "URL",
  "repository": {},
  "contributors": [],

  "extends": "",
  "configures": {},
  "depends": {},
}
```

## Tenants manage branches of installed apps

Apps are only useful when they are installed to a `tenant branch`. This allows services to act differently when given access to the service state generated by assembling the apps installed in this branch.

## TODO: Calculator service example

For example, if app `act.calculator@4` wants to configure the `router` service `http` builder, ...

## TODO: act native services

There are three basic services which offer the baseline for the creation of custom services:

### Builder

Receives app source as parameter. Outputs are appended to published package.

### Assembler

Receives list of built packages as parameter. Outputs service state.

### Runner

A runner is a docker image with a server which receives requests with a service state hash.

## TODO:  Three relationships - extend, configure, depend

### Apps extend Apps

Extend allows to inherit exported configurations and override them selectively (IS A applies). e.g. gtm extends pixel (which configures render).

### Apps configure Services

Packaged configuration is used to generate service state and ultimately impact service behaviour.

### Services depend on Services

Static services calculate responses from request params and service state solely, but dynamic services might require I/O to other running services. This constitutes a runtime dependency.

## TODO: Router example

`act-router` implements a the `router` service, which routes requests based on state generated by it's `http` builder. This allows other services to request routes by exporting configuration for this builder.

By doing so, every service that wants to claim a new route must go through the process of publishing an *app* - a versioned package of configuration - and later generating a new versioned state for the `router`, which might be on-demand or scheduled - depending on how you configure it.

These configuration changes then go through e2e testing in a production-like environment and are then gradually distributed to live `router` instances. If any of the service-defined success metrics are disturbed according to ML-enabled projection, we automatically reverse to previous state and alert configuration publishers, resuming previous behaviour without human interaction.

This allows to maximize iteration speed on configuration tests without compromising on user experience. Move fast without breaking things, as a service.

## (Historical, probably will be removed or heavily modified) Motivation

Act is a proof-of-concept CLI to manage **Schemas** and **Configurations** for **Services**.

### Services, Behaviors and Outcomes

When an *Enterprise* deploys *Services* (in the form of software) which their *Users* interact with, we can assume it has two basic goals:

1. That their Users have a high-quality, disruption-free user experience when interacting with said *Services*, and
2. That these interactions result in *Outcomes* which are desireable for the *Enterprise* (e.g. new sales).

In other words, a software platform is successful to the degree that it helps transform a collections of *Services* into desired business *Outcomes*.

*Outcomes* are not deterministic, since they depend on user decisions. However, *Outcomes* may be significantly influenced by changing a Service's *Behaviour* - the way in which the Service responds to *Input*.

Most Services offer some degree of control over their Behavior through *Configuration*. That means an Enterprise may alter the *Behavior* of the Services it controls by changing their *Configurations*, which in turn affects *Outcomes*.

Configurable Services need to define a *Schema*, a *Semantically Versioned* contract, through which they explicitly document *how* they can be configured.

#### Definitions

- A **Service** is any business capability packaged as software which displays consistent *Behavior* when interacting with the outside world (Users or other Services).
- A **Behavior** is the way in which a Service responds to external Input, or otherwise acts. A Behavior is usually determined, at least partially, by *Configuration*.
- An **Outcome** is a business goal which depends on *Users* interacting with *Services* (and their *Behaviors*).
- A **Configuration** is any artifact which deterministically alters the Behavior of a Service. A Configuration must follow a *Schema*.
- A **Schema** is any Service-define artifact against which any Configuration might be *Validated* in order to determine if said configuration is usable by the Service. In other words, Schemas define which Configurations are valid for a given Service.
