# act

A proof-of-concept CLI to manage **Schemas** and **Configurations** for **Services**.

## Services, Behaviors and Outcomes

When an *Enterprise* deploys *Services* (in the form of software) which their *Users* interact with, we can assume it has two basic goals:

1. That their Users have a high-quality, disruption-free user experience when interacting with said *Services*, and
2. That these interactions result in *Outcomes* which are desireable for the *Enterprise* (e.g. new sales).

In other words, a software platform is successful to the degree that it helps transform a collections of *Services* into desired business *Outcomes*.

*Outcomes* are not deterministic, since they depend on user decisions. However, *Outcomes* may be significantly influenced by changing a Service's *Behaviour* - the way in which the Service responds to *Input*.

Most Services offer some degree of control over their Behavior through *Configuration*. That means an Enterprise may alter the *Behavior* of the Services it controls by changing their *Configurations*, which in turn affects *Outcomes*.

Configurable Services need to define a *Schema*, a *Semantically Versioned* contract, through which they explicitly document *how* they can be configured. Configurations, on the other hand, are be versioned with a *Revision Number*.

### Definitions:

- A **Service** is any business capability packaged as software which displays consistent *Behavior* when interacting with the outside world (Users or other Services). 
- A **Behavior** is the way in which a Service responds to external Input, or otherwise acts. A Behavior is usually determined, at least partially, by *Configuration*. 
- An **Outcome** is a business goal which depends on *Users* interacting with *Services* (and their *Behaviors*).
- A **Configuration** is any artifact which deterministically alters the Behavior of a Service. A Configuration must follow a *Schema*.
- A **Schema** is any Service-define artifact against which any Configuration might be *Validated* in order to determine if said configuration is usable by the Service. In other words, Schemas define which Configurations are valid for a given Service.


