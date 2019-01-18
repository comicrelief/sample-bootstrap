## Yarn Build & Deploy Script

This script will run an Yarn build command and then deploy a directory to an S3 bucket. 

### Parameters
- `AWS_ACCESS_KEY_ID` - AWS access key to send the built files to.
- `AWS_SECRET_ACCESS_KEY` - AWS secret to send the built files to.
- `S3_BUCKET_PATH` - The bucket that the files will be sent to.
- `DIRECTORY` - The directory that will be uploaded to S3.
