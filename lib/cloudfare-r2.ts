import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME!;
const PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL!;

export async function uploadToR2(file: File, fileName: string) {
  const buffer = Buffer.from(await file.arrayBuffer());

  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return {
    success: true,
    key: fileName,
    url: `${PUBLIC_URL}/${fileName}`,
  };
}

export async function deleteFromR2(fileName: string) {
  await client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: fileName,
    })
  );

  return { success: true };
}
