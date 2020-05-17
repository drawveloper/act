# Temporary local state xample

This is an example of a `.act` folder local state when using `act`.
This is here because I'm brainstorming how to express the relationships between apps and tenants more conveniently.  

When `act` works:

- Each folder inside `tenants` will be a separate git repo, with it's own independent history.
- Each folder in `act.pm/` will be actually hosted by `https://act.pm/`, which will be a rewriter for GitHub using a centralized `database.json`.

Eventually, this will go away. :)  
