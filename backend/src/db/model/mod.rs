pub mod user;
pub mod utils;

use lazy_static::lazy_static;
use mongodb::{bson::Document, results::{DeleteResult, InsertManyResult, InsertOneResult, UpdateResult}, Database};
use regex::Regex;

lazy_static! {
    pub static ref WALLET_ADDRESS_REGEX: Regex = Regex::new("[0-9a-zA-Z]{27,34}").unwrap();
}

lazy_static! {
    pub static ref EMAIL_REGEX: Regex = Regex::new("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}").unwrap();
}

lazy_static! {
    pub static ref SIGNATURE_REGEX: Regex = Regex::new("[A-Fa-f0-9]{64}").unwrap();
}

#[allow(async_fn_in_trait)]
pub trait Model<T> {
    type Schema;

    async fn create_collection(db: &Database) -> Result<T, mongodb::error::Error>;
    async fn create(&self, schema: Self::Schema) -> Result<InsertOneResult, mongodb::error::Error>;
    async fn create_many(&self, schema_vec: Vec<Self::Schema>) -> Result<InsertManyResult, mongodb::error::Error>;
    async fn read(&self, page: u32, limit: Option<u32>) -> mongodb::error::Result<Vec<Self::Schema>>;
    async fn read_one(&self, id: String) -> mongodb::error::Result<std::option::Option<Self::Schema>>;
    async fn update(&self, id: String, updated: Document ) -> Result<UpdateResult, mongodb::error::Error>;
    async fn delete(&self, id: String) -> Result<DeleteResult, mongodb::error::Error>;
}