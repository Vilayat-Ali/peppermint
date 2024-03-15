use axum::Router;

pub struct ApiRoutes;

async fn handle_hello() -> &'static str {
    "world"
}

impl ApiRoutes {
    pub fn get_router() -> Router {
        Router::new().route("/hello", axum::routing::get(handle_hello))
    }
}