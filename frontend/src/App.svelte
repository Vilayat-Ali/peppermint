<script lang="ts">
import { Router, Link, Route } from "svelte-routing";

// Pages
import HomePage from "./pages/HomePage.svelte";
import ListingPage from "./pages/ListingPage.svelte";

export let url: string = "";
</script>

<div>
  <Router {url}>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/nfts">Shop</Link>
      <Link to="/blog">Blog</Link>
    </nav>
    <div>
      <Route path="/nfts" component={ListingPage} />
      <Route path="/">
        <HomePage />
      </Route>
    </div>
  </Router>
</div>