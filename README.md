# sample-bootstrap
Sample Concourse CI bootstrap repository for use in blog post and sample pipeline.


## Getting Started


### Bootstrapping Concourse

Follow https://github.com/EngineerBetter/concourse-up to set up a Concourse instance on AWS.

To set up a pipeline from scratch in an AWS account of choice (with AWS variables defined), run e.g.

```
concourse-up deploy --domain ci.sandbox.comicrelief.com ci
```

To clean it up afterwards, you can run

```
concourse-up destroy ci
```

### Decrypt keys using git-crypt

To be able to see and change the contents of the private directory a key file is required.

Please ask your administrator for the key file, and then run:

```bash
git-crypt unlock KEY_FILE
```

For sample purposes, you can recreate this file yourself and run `git-crypt` to encode contents of this file. The format of that file is something like this:

```
aws_default_region: eu-west-1
aws_secondary_region: us-east-1
aws_access_key: XXXXXXXXXXXXXXX
aws_secret_key: 111111111111111111111111

... other key / values ...
```

There are other (and better!) methods to handle credential management than git-crypt, and that do not involve storing credentials (albeit encrypted) in git. Have a look at https://concourse-ci.org/creds.html for integrating Vault, Credhub or SSM. Unfortunately, as of now, Concourse-up only supports Credhub [although SSM seems to be on the roadmap](https://github.com/EngineerBetter/concourse-up/issues/46).

### Get fly

Go to https://concourse.ci/downloads.html and download `fly` and then run:
```bash
chmod +x fly;sudo mv fly /usr/local/bin/ 
```

### Login to concourse

```
fly -t ci-sandbox login --team-name main --concourse-url https://ci.sandbox.comicrelief.com
sudo fly -t ci-sandbox sync
```

### Deploy ([Pipeline](https://ci.sandbox.comicrelief.com/teams/main/pipelines/general))

```
fly -t ci-sandbox set-pipeline -p general -c concourse/general.yml -l private/concourse/cci_private_vars.yml
```