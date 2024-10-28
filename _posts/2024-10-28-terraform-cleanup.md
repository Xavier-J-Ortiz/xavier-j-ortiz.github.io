---
layout: single
classes: wide
title: Wormhole Mapping Tool Cleanup

tags:
- EvE
- Terraform
- Bash
---

# Quick Update on Terraform Tripwire Project

Circled back on this project, with the goal of getting it on Github.

I needed to do some cleanup, housekeeping, and slight improvements

## Add Additional Logic to Startup Script
Startup scripts are introduced into a new instance on it's creation. It setups a lot of configuration within the instance so it can run correctly.

The logic would be:
- If the startup script detects and can download a backup file from nightly backups, it should leverage the saved certificate and database backups to spawn the new instance. This way, it doesn't regenerate a cert that doesn't need to be regenerated, as well as not lose any of the backup tripwire data from exploration
  - If the startup script doesn't detect a backup file, then it creates a new tripwire instance from scratch with no `tripwire` data, and generates a new certificate from scratch.

This was achieved with code like this in the startup script

```bash
if [ $(gsutil ls gs://${tripwire-backup-bucket-name}/backup_latest.tar.gz 2> /dev/null) ]; then
  BACKUP_EXISTS="true"
  gsutil cp gs://${tripwire-backup-bucket-name}/backup_latest.tar.gz /tmp/startup/.

  sudo tar xvfz backup_latest.tar.gz
  sudo gunzip tripwire.sql.gz
  sudo tar xvfz letsencrypt_certs.tar.gz -C /
else
  BACKUP_EXISTS="false"
  echo "Backup file doesn't exist, creating webserver from scratch"
fi
```

The variable will allow us to gate whether or not to use existing backup information or not later in the startup script.

```bash
sudo docker exec -i ${docker-compose-path}-mariadb-1 /usr/bin/mysql -u root <<< "CREATE DATABASE tripwire"
if [ $BACKUP_EXISTS == "true" ]; then
  echo "waiting 60 seconds before importing database" && sleep 60
  sudo docker exec -i ${docker-compose-path}-mariadb-1 /bin/bash -c "while ! mysqladmin ping  -h localhost -u root --silent; do sleep 5 && echo \"MariaDB instance not ready. Will check in another 5 seconds.\"; done"
  echo "starting to load sql database from saved tripwire backup"
  sudo docker exec -i ${docker-compose-path}-mariadb-1 /usr/bin/mysql -u root --wait tripwire < /tmp/startup/tripwire.sql
  echo "ending sql database load"
  cd /home/${username}/${docker-compose-path} && sudo docker compose run --rm certbot renew && cd /tmp/startup/
else
  echo "starting to load sql database from tripwire database from the tripwire repo"
  sudo docker exec -i ${docker-compose-path}-mariadb-1 /usr/bin/mysql -u root tripwire --wait < /home/${username}/${docker-compose-path}/html/${tripwire-hostname}.${tripwire-domain-name}/.docker/mysql/tripwire.sql
  echo "ending sql database load"
  cd /home/${username}/${docker-compose-path} && docker compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot -d ${tripwire-hostname}.${tripwire-domain-name} -m ${lets-encrypt-email} --agree-tos --non-interactive --no-eff-email && cd /tmp/startup/
fi
```

## Remove Any Sensitive Data
Because at some point, I would like this repo to be made public, I need to remove any sensitive data from the files within the repo. Though a long term goal is to use github secrets, I think I'd have to use github actions on some level to leverage that, and that would be a larger project which would also require some planning to determine if it's worth the effort and feasibility.

For now, removing sensitive data is achieved by creating a `variables.tf` file that contains sensitive information, and adding the `variables.tf` file into the `.gitignore`.

An example of this is when passing eve sso client/secret keys into the startup script.

From the `variables.tf` file, the sso client/secret keys are input and later rendered into the startup script file:
```terraform
variable "eve-sso-client" {
  type = string
  default = "XXXXXXXXXXX"
}

variable "eve-sso-secret" {
  type = string
  default = "YYYYYYYYYYY"
}

...

data "template_file" "startup-script" {
  template = "${file("./scripts/startup-script")}"
  vars = {
    docker-compose-path = var.docker-compose-path
    eve-sso-client = var.eve-sso-client
    eve-sso-secret = var.eve-sso-secret
    username = var.username
    tripwire-hostname = var.tripwire-hostname
    tripwire-domain-name = var.tripwire-domain-name
    tripwire-backup-bucket-name = var.tripwire-backup-bucket-name
    lets-encrypt-email = var.lets-encrypt-email
  }
}
```

In the startup script, the sso client/secret keys generated and passed into the `startup-script` template are invoked in the following way:
```php
// EVE SSO info
define('EVE_SSO_CLIENT', '${eve-sso-client}');
define('EVE_SSO_SECRET', '${eve-sso-secret}');
define('EVE_SSO_REDIRECT', 'https://${tripwire-hostname}.${tripwire-domain-name}/index.php?mode=sso');
```

## Cleanup and Organize Variable Names for Consistency
Though tedious, it makes reading the terraform references and code much easier. Many references, variables, and terraform resource names had slight misnomers. As an example, `website-domain-name` instead of `tripwire-domain-name`. Using `website` is pretty generic, and doesn't reflect what the domain name is going to be used for.

 Besides reading better, since the repo _only_ contain resources specific to the `tripwire` app, and not a general repo with all the apps within a specific domain. For context, the repo previously housed the _all_ apps and resources for the `xavierjortiz.com` domain before making the decision to making each repo be _per app_.

# Next Steps
Currently, the repo is private, pending a final check to make sure that all sensitive data has been removed.

Once made public, my next step for this project as mentioned earlier, is to evaluate if the project is a good candidate to use `Github Actions` on in order to:
- Run the terraform directly from from github via `Actions`
- Save variables and sensitive data within `Actions`
