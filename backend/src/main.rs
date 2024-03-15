use std::{collections::HashMap, sync::{Arc, Mutex}};

use axum::Router;
use tower::ServiceBuilder;
use tower_http::compression::CompressionLayer;
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;

use peppermint_backend::{db::{model::{user::UserModel, Model}, Mongo, Collection}, routes::ApiRoutes};

#[derive(Debug)]
pub struct AppState {
    pub models: HashMap<&'static str, Collection>
}

#[shuttle_runtime::main]
async fn main() -> shuttle_axum::ShuttleAxum {
    // middlewares
    let cors = CorsLayer::new()
        .allow_headers(tower_http::cors::Any)
        .allow_methods(tower_http::cors::Any)
        .allow_origin(tower_http::cors::Any);
    let compression = CompressionLayer::new().gzip(true);
    let trace = TraceLayer::new_for_http();

    let db = Mongo::establish_conn().await.unwrap();

    // models
    let mut model_map: HashMap<&'static str, Collection> = HashMap::with_capacity(5);

    model_map.insert("user", Collection::User(UserModel::create_collection(&db).await.unwrap())); // user model
    
    let _ = Arc::new(Mutex::new(AppState {
        models: model_map
    }));

    // routing
    let router = Router::new()
        .nest("/api", ApiRoutes::get_router())
        .layer(ServiceBuilder::new().layer(trace).layer(compression))
        .layer(cors);
        // .with_state(Arc::clone(&ctx));

    Ok(router.into())
}
