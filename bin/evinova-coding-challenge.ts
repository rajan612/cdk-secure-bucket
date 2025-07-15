#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SecureBucket } from '../lib/secure-bucket';

const app = new cdk.App();
const envContext = app.node.tryGetContext('env') || 'dev';

if (envContext === 'dev') {
  const devStack = new cdk.Stack(app, 'SecureBucketDevStack', {
    env: { region: 'us-east-1' }
  });

  new SecureBucket(devStack, 'MySecureBucketDev', {
    projectId: 'devproj',
    enableEncryption: true,
    githubRepo: 'rajan612/cdk-secure-bucket', // Optional: creates OIDC IAM role
  });
}

if (envContext === 'prod') {
  const prodStack = new cdk.Stack(app, 'SecureBucketProdStack', {
    env: { region: 'us-east-1' }
  });

  new SecureBucket(prodStack, 'MySecureBucketProd', {
    projectId: 'prodproj',
    enableEncryption: true,
    githubRepo: 'rajan612/cdk-secure-bucket',
  });
}
