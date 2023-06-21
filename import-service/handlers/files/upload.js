const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const { responseHeaders, errorResponseHeaders, productsBucketParams, bucketName } = require('../../constants/constants');
const { createSignedUrl } = require('../../helpers/signedUrl');

module.exports.upload = async (event) => { 
    const { queryStringParameters } = event;
    const { name } = queryStringParameters;
    const s3 = new AWS.S3()

    let response = {}

    try {
        const s3Response = await s3.listObjectsV2(productsBucketParams).promise()
        const files = s3Response.Contents

        const key = files.filter((file) => file.Key === `uploaded/${name}`)[0].Key

        const signedUrlObject = await createSignedUrl(key)

         response = {
            ...responseHeaders,
             body:  JSON.stringify(signedUrlObject)
        }
    } catch (error) {
        console.error('Error apears:')
        console.error(error)

        response = {
            ...errorResponseHeaders,
            body: JSON.stringify({
            error: error || 'Something went wrong'
            })
        }
    }

    return response
}