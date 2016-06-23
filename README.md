# The Council
Crowd sourced coin flip app built with React and Flux

##Start up app:
 - _run postgres_
 - `make web-dev`
 - `make api`
 - _Go to localhost:8080`_

##Setup checklist:
 - `npm install`
 - `make db-fresh`

##Front-end
Run Dev Server `make web-dev`

##Back-end
Start API `make api`

###DB
Setup / Clean DB `make db-fresh`
Connect `psql council`

####Migrations
Check `make check-migrations`
Run `make migrate`
New Migrations:
  in api/db/ `add_migration new "migration name"`
  
