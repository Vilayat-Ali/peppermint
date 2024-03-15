pub mod model;

use mongodb::{options::ClientOptions, Client, Database};

pub struct Mongo;

impl Mongo {
    pub async fn establish_conn() -> mongodb::error::Result<Database> {
        let client_options = ClientOptions::parse("mongodb://localhost:27017/peppermint").await?;
        let client = Client::with_options(client_options)?;
        let db = client.default_database().unwrap_or(client.database("peppermint"));
        Ok(db)
    }
}