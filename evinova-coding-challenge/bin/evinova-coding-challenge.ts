#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SecureBucket } from '../lib/secure-bucket';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'SecureBucketDevStack', {
  env: { region: 'us-east-1' }
});

new SecureBucket(stack, 'MySecureBucket', {
  projectId: 'devproj',
  enableVersioning: true,
  enableEncryption: true,
  githubRepo: 'rajan612/cdk-secure-bucket'
});
