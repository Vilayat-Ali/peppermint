use std::{collections::HashMap, sync::{Arc, Mutex}};

use shuttle_runtime::SecretStore;
use axum::Router;
use tower::ServiceBuilder;
use tower_http::compression::CompressionLayer;
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;

use peppermint_backend::{db::{model::{user::UserModel, Model}, Mongo, Collection}, routes::ApiRoutes};

pub struct AppState {
    pub models: HashMap<&'static str, Collection>,
    pub secrets: SecretStore
}

#[shuttle_runtime::main]
async fn main(
    #[shuttle_runtime::Secrets] secrets: SecretStore
) -> shuttle_axum::ShuttleAxum {
    let mongo_uri = secrets.get("MONGO_URI").unwrap();
 
    // Middlewares
    let cors = CorsLayer::new()
        .allow_headers(tower_http::cors::Any)
        .allow_methods(tower_http::cors::Any)
        .allow_origin(tower_http::cors::Any);
    let compression = CompressionLayer::new().gzip(true);
    let trace = TraceLayer::new_for_http();

    // Establish database connection
    let db = Mongo::establish_conn(mongo_uri).await.unwrap();

    // Models
    let mut model_map: HashMap<&'static str, Collection> = HashMap::with_capacity(5);
    model_map.insert("user", Collection::User(UserModel::create_collection(&db).await.unwrap())); // User model

    let ctx = Arc::new(Mutex::new(AppState {
        models: model_map,
        secrets
    }));

    // Routing
    let router = Router::new()
        .layer(ServiceBuilder::new().layer(trace).layer(compression))
        .layer(cors)
        .with_state(Arc::clone(&ctx))
        .nest("/api", ApiRoutes::get_router());

    Ok(router.into())
}
