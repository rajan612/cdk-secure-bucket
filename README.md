# 🚀 CDK Secure Bucket

This project provides a reusable AWS CDK construct written in **TypeScript** for provisioning a secure and configurable **Amazon S3 bucket** with optional **encryption**, **versioning**, and **GitHub Actions OIDC IAM role** support.

---

## ✨ Key Features

- 🔐 **Secure S3 Bucket**  
  - Optional **S3-managed encryption**
  - Optional **versioning**
- 🔗 **GitHub Actions Integration**  
  - Automatically provisions an IAM role with **OIDC trust** for GitHub Actions (optional)
- 📤 **Stack Outputs**  
  - Outputs the **S3 bucket name** and **IAM role ARN**
- 🔁 **Reusable Construct**  
  - Easily customizable via the `SecureBucketProps` interface
- ⚙️ **Multi-Environment Ready**  
  - Supports seamless deployments across environments (e.g., `dev`, `prod`)
- ✅ **CI/CD Support**  
  - Example GitHub Actions workflows included (`.github/workflows`)

---

## 🔧 Usage Example

```ts
new SecureBucket(this, 'MySecureBucket', {
  projectId: 'abc123',
  enableVersioning: true,
  enableEncryption: true,
  githubRepo: 'yourorg/yourrepo', // Optional: enables GitHub OIDC role creation
});

📂 Project Structure
.
├── bin/                      # CDK app entrypoint
├── lib/                      # SecureBucket construct definition
├── test/                     # Unit tests
├── .github/workflows/        # Example GitHub Actions CI/CD workflows
├── cdk.json                  # CDK CLI configuration
├── package.json              # NPM project config
├── tsconfig.json             # TypeScript config
└── README.md                 # Project documentation