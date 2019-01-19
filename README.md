# sample-bootstrap
Sample Concourse bootstrap repository for use in blog post and sample application


## Getting Started

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