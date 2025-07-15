import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SecureBucket } from '../lib/secure-bucket';

test('S3 Bucket Created with Encryption', () => {
  const app = new App();
  const stack = new Stack(app, 'EncTestStack');

  new SecureBucket(stack, 'MyTestBucket', {
    projectId: 'testproj',
    enableEncryption: true,
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketEncryption: {
      ServerSideEncryptionConfiguration: [
        {
          ServerSideEncryptionByDefault: {
            SSEAlgorithm: 'AES256',
          },
        },
      ],
    },
  });
});

test('S3 Bucket Created with Versioning Enabled', () => {
  const app = new App();
  const stack = new Stack(app, 'VersioningTestStack');

  new SecureBucket(stack, 'MyTestBucket', {
    projectId: 'testproj',
    enableVersioning: true,
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::S3::Bucket', {
    VersioningConfiguration: {
      Status: 'Enabled',
    },
  });
});

test('OIDC IAM Role is created when GitHub repo is provided', () => {
  const app = new App();
  const stack = new Stack(app, 'OIDCTestStack');

  new SecureBucket(stack, 'MyTestBucket', {
    projectId: 'testproj',
    githubRepo: 'yourorg/yourrepo',
  });

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::IAM::Role', 1);

  template.hasResourceProperties('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            Federated: {
              "Fn::Join": [
                "",
                [
                  "arn:aws:iam::",
                  { Ref: "AWS::AccountId" },
                  ":oidc-provider/token.actions.githubusercontent.com"
                ]
              ]
            },
          },
          Action: 'sts:AssumeRoleWithWebIdentity',
          Condition: {
            StringLike: {
              'token.actions.githubusercontent.com:sub': 'repo:yourorg/yourrepo:*',
            },
          },
        },
      ],
    },
  });
});
