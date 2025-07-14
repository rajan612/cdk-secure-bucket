import { Construct } from 'constructs';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Role, WebIdentityPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Stack, CfnOutput } from 'aws-cdk-lib';

export interface SecureBucketProps {
  projectId: string;
  enableVersioning?: boolean;
  enableEncryption?: boolean;
  githubRepo?: string; // e.g. 'yourorg/yourrepo'
}

export class SecureBucket extends Construct {
  public readonly bucket: Bucket;
  public readonly oidcRole?: Role;

  constructor(scope: Construct, id: string, props: SecureBucketProps) {
    super(scope, id);

    this.bucket = new Bucket(this, 'Bucket', {
      bucketName: `${props.projectId}-${Stack.of(this).stackName.toLowerCase()}`,
      versioned: props.enableVersioning ?? false,
      encryption: props.enableEncryption ? BucketEncryption.S3_MANAGED : undefined,
    });

    new CfnOutput(this, 'BucketNameOutput', {
      value: this.bucket.bucketName,
    });

    if (props.githubRepo) {
      const oidcProviderUrl = 'token.actions.githubusercontent.com';

      this.oidcRole = new Role(this, 'GitHubOIDCRole', {
        assumedBy: new WebIdentityPrincipal(`arn:aws:iam::${Stack.of(this).account}:oidc-provider/${oidcProviderUrl}`)
          .withConditions({
            'StringLike': {
              [`${oidcProviderUrl}:sub`]: `repo:${props.githubRepo}:*`
            }
          }),
        description: 'Role for GitHub Actions via OIDC',
      });

      this.oidcRole.addToPolicy(new PolicyStatement({
        actions: ['s3:*'],
        resources: [this.bucket.bucketArn, `${this.bucket.bucketArn}/*`]
      }));

      new CfnOutput(this, 'OIDCRoleArnOutput', {
        value: this.oidcRole.roleArn,
      });
    }
  }
}
