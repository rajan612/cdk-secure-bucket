# CDK Secure Bucket

This project contains a reusable AWS CDK construct written in TypeScript to provision an S3 bucket with optional encryption, versioning, and GitHub Actions OIDC IAM role support.

## Features

- Create an S3 bucket with optional versioning and encryption
- Automatically create GitHub OIDC IAM role for secure CI/CD
- Outputs bucket name and OIDC role ARN
- Ready-to-use GitHub Actions workflow with environment separation

## Getting Started

```bash
npm install
npx cdk synth
npx cdk deploy
