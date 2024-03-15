use nutype::nutype;

use crate::db::model::{WALLET_ADDRESS_REGEX, EMAIL_REGEX, SIGNATURE_REGEX};

pub trait Validate<T> {
    fn validate(input: T) -> Result<T, String>;
}

#[nutype(
    sanitize(trim, lowercase),
    validate(not_empty, regex=WALLET_ADDRESS_REGEX),
    derive(Debug)
)]
pub struct WalletAddress (String);

impl Validate<String> for WalletAddress {
    fn validate(input: String) -> Result<String, String> {
        match WalletAddress::new(input) {
            Ok(validated_val) => Ok(validated_val.into_inner()),
            Err(err) => Err(err.to_string())
        }
    }
}

#[nutype(
    sanitize(trim, lowercase),
    validate(not_empty, regex=EMAIL_REGEX),
    derive(Debug)
)]
pub struct Email (String);

impl Validate<String> for Email {
    fn validate(input: String) -> Result<String, String> {
        match Email::new(input) {
            Ok(validated_val) => Ok(validated_val.into_inner()),
            Err(err) => Err(err.to_string())
        }
    }
}

#[nutype(
    sanitize(trim, lowercase),
    validate(not_empty, regex=SIGNATURE_REGEX),
    derive(Debug)
)]
pub struct Signature (String);

impl Validate<String> for Signature {
    fn validate(input: String) -> Result<String, String> {
        match Signature::new(input) {
            Ok(validated_val) => Ok(validated_val.into_inner()),
            Err(err) => Err(err.to_string())
        }
    }
}