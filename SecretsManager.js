class SecretsManager
{
    constructor() {
        let key = "";
        let secret = "";

        console.log("---",process.env.SecretsManager_ACCESS);

        let SecretsManagerSecurityCredentials = process.env.SecretsManager_ACCESS;
        SecretsManagerSecurityCredentials = JSON.parse(SecretsManagerSecurityCredentials)

        key = SecretsManagerSecurityCredentials?.KEY;
        secret = SecretsManagerSecurityCredentials?.SECRET;

        this.key = key;
        this.secret = secret;
    }
    async getData (secretName){
        try {

            var AWS = require('aws-sdk'),
                region = "us-east-1",
                secret;


            var client = new AWS.SecretsManager({
                region: region,
                accessKeyId: this.key,
                secretAccessKey: this.secret
            });
            return new Promise((resolve,reject)=> {

                client.getSecretValue({SecretId: secretName},  function (err, data) {
                    if (err) {
                        reject(err);
                        // if (err.code === 'DecryptionFailureException')
                        //     // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                        //     // Deal with the exception here, and/or rethrow at your discretion.
                        //     throw err;
                        // else if (err.code === 'InternalServiceErrorException')
                        //     // An error occurred on the server side.
                        //     // Deal with the exception here, and/or rethrow at your discretion.
                        //     throw err;
                        // else if (err.code === 'InvalidParameterException')
                        //     // You provided an invalid value for a parameter.
                        //     // Deal with the exception here, and/or rethrow at your discretion.
                        //     throw err;
                        // else if (err.code === 'InvalidRequestException')
                        //     // You provided a parameter value that is not valid for the current state of the resource.
                        //     // Deal with the exception here, and/or rethrow at your discretion.
                        //     throw err;
                        // else if (err.code === 'ResourceNotFoundException')
                        //     // We can't find the resource that you asked for.
                        //     // Deal with the exception here, and/or rethrow at your discretion.
                        //     throw err;
                    } else {
                        // Decrypts secret using the associated KMS CMK.
                        // Depending on whether the secret is a string or binary, one of these fields will be populated.
                        if ('SecretString' in data) {
                            secret = JSON.parse(data.SecretString);
                            if(secret[secretName] !== undefined){
                                resolve(secret[secretName]);
                            }
                            resolve(secret);
                        } else {
                            let buff = new Buffer(data.SecretBinary, 'base64');
                            resolve(buff.toString('ascii'));
                        }
                    }
                });
            });


        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = SecretsManager;