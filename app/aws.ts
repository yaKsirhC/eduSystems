import {Endpoint, S3} from 'aws-sdk/';

const spacesEndpoint = new Endpoint('nyc3.digitaloceanspaces.com'); // Change this to your Space's region
const s3 = new S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.ACCESS_SECRET,
});

export {s3}
