require "yaml"

def get_intances_targets
  deploying_roles = ENV["DEPLOYING_ROLES"].split(",")
  @instance_name_tags ||= YAML
    .load_file(ENV["SETTING_FILE"] || "config/deploy/settings.yml")["instance_name_tags"][ENV["RAILS_ENV"]]
    .select { |role_name, _| deploying_roles.include? role_name }
end
