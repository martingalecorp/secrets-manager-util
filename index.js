const AWS = require('aws-sdk');
class SecretsManagerUtils {
  constructor(conf) {
    this.region = conf.region;
    this.endpoint = `https://secretsmanager.${this.region}.amazonaws.com`;
    this.client = new AWS.SecretsManager({
      region: this.region,
      endpoint: this.endpoint,
    });
  }

  async getSecretValue(key) {
    const data = await this.client.getSecretValue({ SecretId: key }).promise();
    // Decrypted secret using the associated KMS CMK
    // Depending on whether the secret was a string or binary, one of these fields will be populated
    if (data.SecretString !== '') {
      return data.SecretString;
    }
    return data.SecretBinary;
  }
}

module.exports = SecretsManagerUtils;
