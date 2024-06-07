use std::{collections::HashMap, sync::{Arc, Mutex}};

use axum::Router;
use tower::ServiceBuilder;
use tower_http::compression::CompressionLayer;
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;

use peppermint_backend::{db::{model::{user::UserModel, Model}, Mongo, Collection}, routes::ApiRoutes};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[derive(Debug)]
pub struct AppState {
    pub models: HashMap<&'static str, Collection>
}

#[shuttle_runtime::main]
async fn main() -> shuttle_axum::ShuttleAxum {
    // tracing logs
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "RUST_LOG=trace".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();
    
    // Middlewares
    let cors = CorsLayer::new()
        .allow_headers(tower_http::cors::Any)
        .allow_methods(tower_http::cors::Any)
        .allow_origin(tower_http::cors::Any);
    let compression = CompressionLayer::new().gzip(true);
    let trace = TraceLayer::new_for_http();

    // Establish database connection
    let db = Mongo::establish_conn().await.unwrap();

    // Models
    let mut model_map: HashMap<&'static str, Collection> = HashMap::with_capacity(5);
    model_map.insert("user", Collection::User(UserModel::create_collection(&db).await.unwrap())); // User model

    let ctx = Arc::new(Mutex::new(AppState {
        models: model_map
    }));

    // Routing
    let router = Router::new()
        .nest("/api", ApiRoutes::get_router())
        .layer(ServiceBuilder::new().layer(trace).layer(compression))
        .layer(cors)
        .with_state(Arc::clone(&ctx));

    Ok(router.into())
}
