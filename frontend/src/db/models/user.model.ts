import { Schema } from "mongoose";
import encrypt from "mongoose-encryption";
import { z } from "zod";

export const userZodSchema = z.object({
  profileImageUrl: z.string().url().optional(),
  firstName: z
    .string()
    .min(1, {
      message: "`First Name` input value not provided",
    })
    .max(25, {
      message: "`First Name` input value cannot exceed 25 characters",
    }),
  lastName: z
    .string()
    .min(1, {
      message: "`Last Name` input value not provided",
    })
    .max(25, {
      message: "`Last Name` input value cannot exceed 25 characters",
    }),
  email: z
    .string()
    .email()
    .min(1, {
      message: "`Email` input value not provided",
    })
    .max(35, {
      message: "`Email` input value cannot exceed 35 characters",
    }),
  walletAddress: z
    .string()
    .regex(
      /^(0x[a-fA-F0-9]{40})|(([1-9A-HJ-NP-Za-km-z]{43}|(0x)?[0-9A-Fa-f]{40}))$/,
      {
        message: "Invalid Wallet Address provided",
      }
    )
    .min(1, {
      message: "`Wallet Address` input value not provided",
    })
    .max(100, {
      message: "`Wallet Address` input value cannot exceed 100 characters",
    }),
  signature: z
    .string()
    .min(1, {
      message: "`Signature` input value not provided",
    })
    .max(100, {
      message: "`Signature` input value cannot exceed 100 characters",
    }),
});

export type UserZodType = z.infer<typeof userZodSchema>;

const UserSchema = new Schema({
  profileImageUrl: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  signature: {
    type: String,
    required: true,
    unique: true,
  }
});

UserSchema.plugin(encrypt, {
  secret: process.env.MONGO_ENCR_SECRET,
  encryptedFields: [
    'profileImageUrl',
    'firstName',
    'lastName',
    'email',
    'signature',
    'walletAddress'
  ]
})

export default UserSchema;
