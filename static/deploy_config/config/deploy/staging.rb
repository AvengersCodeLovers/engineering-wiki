set :stage, :staging
set :rails_env, :staging
set :branch, :staging
set :deploy_to, "/home/deploy/deploy/engineering-wiki"
server "157.240.214.35", user: "deploy", roles: %w(web app db)
