<script lang="ts">
	// This is a top level Layout page. There should never be anything in here aside
	// from some config files.

	import '../app.css';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production ' });
</script>

<slot />
