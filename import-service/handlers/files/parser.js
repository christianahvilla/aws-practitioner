const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const csv  = require('csvtojson')
const { bucketName } = require('../../constants/constants');

module.exports.parser = async (event) => {
    const key = event.Records[0].s3.object.key

    const s3 = new AWS.S3()

    try {
        const s3Stream = s3.getObject({
            Bucket: bucketName,
            Key: key
        }).createReadStream();

       // convert csv file (stream) to JSON format data
        const json = await csv().fromStream(s3Stream);
        console.log(json);
    } catch (error) {
        console.error('Error apears:')
        console.error(error)
    }
 }