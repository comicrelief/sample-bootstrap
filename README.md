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