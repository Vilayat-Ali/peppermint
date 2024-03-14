use jsonwebtoken::{decode, encode, errors::Result, DecodingKey, EncodingKey, Header, TokenData, Validation};
use serde::{de::DeserializeOwned, Serialize};

pub enum JwtTokenType {
    AccessToken,
    RefreshToken
}

pub struct JWT;

impl JWT {
    pub fn generate_token<C>(claims: &C, token_type: Option<JwtTokenType>) -> Result<String> 
        where C: Serialize + DeserializeOwned {
        let secret: &[u8] = match token_type.unwrap_or(JwtTokenType::AccessToken) {
            JwtTokenType::AccessToken => "access_secret".as_bytes(),
            JwtTokenType::RefreshToken => "refresh_secret".as_bytes()
        };
        let token = encode(&Header::default(), claims, &EncodingKey::from_secret(secret))?;
        Ok(token)
    }

    pub fn verify_token<'a, S, C>(token: S, token_type: Option<JwtTokenType>) -> Result<C>
        where S: Into<&'a str>, 
        C: Serialize + DeserializeOwned,
         {
            let secret: &[u8] = match token_type.unwrap_or(JwtTokenType::AccessToken) {
                JwtTokenType::AccessToken => "access_secret".as_bytes(),
                JwtTokenType::RefreshToken => "refresh_secret".as_bytes()
            };
            let token_data: TokenData<C> = decode(token.into(), &DecodingKey::from_secret(secret), &Validation::default())?;
            Ok(token_data.claims as C)
    }
}