pub mod auth;

use auth::AuthRoutes;
use axum::Router;

pub struct ApiRoutes;

async fn handle_hello() -> &'static str {
    "world"
}

impl ApiRoutes {
    pub fn get_router() -> Router {
        Router::new()
            .nest("/auth", AuthRoutes::get_router())
            .route("/hello", axum::routing::get(handle_hello))
    }
}