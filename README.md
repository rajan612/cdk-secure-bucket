# CDK Secure Bucket

This project contains a reusable AWS CDK construct written in TypeScript to provision an S3 bucket with optional encryption, versioning, and GitHub Actions OIDC IAM role support.

---

## ✨ Features

- 🔐 Create an S3 bucket with optional:
  - Versioning
  - S3-managed encryption
- 🔗 Automatically provision a GitHub OIDC IAM role (optional)
- 📤 Outputs bucket name and role ARN
- 🔁 Easily reusable via props (`SecureBucketProps`)
- ⚙️ Multi-environment deployments: dev & prod
- 🚀 GitHub Actions support for CI/CD (see `.github/workflows`)

---

## 🔧 SecureBucket Usage

```ts
new SecureBucket(this, 'MySecureBucket', {
  projectId: 'abc123',
  enableVersioning: true,
  enableEncryption: true,
  githubRepo: 'yourorg/yourrepo' // Optional
});
