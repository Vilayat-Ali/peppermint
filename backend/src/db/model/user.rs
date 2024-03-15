use mongodb::{bson::doc, results::InsertOneResult};
use serde::{Serialize, Deserialize};

use super::{Model, utils::validate::{Validate, WalletAddress, Email, Signature}};

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub username: String,
    pub email: String,
    pub wallet_address: String,
    pub signature: String,
}

impl User {
    pub fn new(username: String, email: String, wallet_address: String, signature: String) -> Result<User, String> {
        let wallet_address = WalletAddress::validate(wallet_address)?;
        let signature = Signature::validate(signature)?;
        let email = Email::validate(email)?;

        Ok(User {
            username,
            email,
            wallet_address,
            signature
        })
    }
}

#[derive(Debug)]
pub struct UserModel {
    collection: mongodb::Collection<User>
}

impl Model<UserModel> for UserModel {
    type Schema = User;

     async fn create_collection(db: &mongodb::Database) -> Result<UserModel, mongodb::error::Error> {
        let collections = db.list_collection_names(None).await?;

        if collections.into_iter().find(|col_name| col_name == "user").is_none() {
            db.create_collection("user", None).await?;
        }

        Ok(UserModel {
            collection: db.collection("user")
        })
        
    }
    
    async fn create(&self, schema: Self::Schema) -> Result<InsertOneResult, mongodb::error::Error> {
        self.collection.insert_one(schema, None).await
    }
    
    async fn create_many(&self, schema_vec: Vec<Self::Schema>) -> Result<mongodb::results::InsertManyResult, mongodb::error::Error> {
        self.collection.insert_many(schema_vec, None).await
    }
    
    async fn read(&self, page: u32, limit: Option<u32>) -> mongodb::error::Result<Vec<Self::Schema>> {
        let limit = limit.unwrap_or(10);
        let pipeline = vec![
            doc! {
                "$skip": (page - 1) * limit
            },
            doc! {
                "$limit": limit
            }
        ];

        let mut results: Vec<Self::Schema> = Vec::with_capacity(limit as usize);
        let mut users = self.collection.aggregate(pipeline, None).await?;
        
        while let Ok(_) = users.advance().await {
            let curr_user: Self::Schema = mongodb::bson::from_slice(users.current().to_raw_document_buf().as_bytes()).unwrap();
            results.push(curr_user);
        }
        
        Ok(results)
    }
    
    async fn read_one(&self, id: String) -> mongodb::error::Result<std::option::Option<Self::Schema>> {
        self.collection.find_one(doc! {
            "_id": id
        }, None).await
    }
    
    async fn update(&self, id: String, updated: mongodb::bson::Document ) -> Result<mongodb::results::UpdateResult, mongodb::error::Error> {
        self.collection.update_one(
            doc! {
                "_id": id
            }, 
            updated, None).await
    }
    
    async fn delete(&self, id: String) -> Result<mongodb::results::DeleteResult, mongodb::error::Error> {
        self.collection.delete_one(
            doc! {
               "_id": id 
            }, None).await
    }
    
}