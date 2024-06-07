use axum::{Router, routing::post};


async fn handle_register() -> &'static str {
    "Register"
}

async fn handle_login() -> &'static str {
    "Login"
}

pub struct AuthRoutes;

impl AuthRoutes {
    pub fn get_router() -> Router {
        Router::new()
            .route("/register", post(handle_register))
            .route("/login", post(handle_login))
    }
}