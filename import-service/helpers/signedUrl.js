const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const {  bucketName } = require('../constants/constants')

const createSignedUrl = async (key) => {
  const s3 = new AWS.S3()
  const signedUrlExpireSeconds = 60 * 5
  
   const url = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: key,
        Expires: signedUrlExpireSeconds
    });

    return url
}

module.exports = {
  createSignedUrl
}