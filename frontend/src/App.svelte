<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import routablePages from "./pages";
</script>

<div>
  <Router>
    {#each routablePages as {route, component}}
      <Route path={route} component={component} />
    {/each}
  </Router>
</div>