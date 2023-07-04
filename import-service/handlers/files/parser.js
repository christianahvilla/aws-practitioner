const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const csv = require("csvtojson");
const {
  bucketName,
  responseHeaders,
  queueURL,
} = require("../../constants/constants");

module.exports.parser = async (event) => {
  const key = event.Records[0].s3.object.key;
  const s3 = new AWS.S3();
  const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

  try {
    const s3Stream = s3
      .getObject({
        Bucket: bucketName,
        Key: key,
      })
      .createReadStream();

    // convert csv file (stream) to JSON format data
    const json = await csv().fromStream(s3Stream);

    await sqs
      .sendMessage(
        {
          // DelaySeconds: 2*5,
          MessageBody: JSON.stringify(json),
          QueueUrl: queueURL,
        },
        (error, data) => {
          if (error) {
            console.error(error);
          }
          console.log(data);
        }
      )
      .promise();
  } catch (error) {
    console.error("Error appears:");
    console.error(error);
  }
};
