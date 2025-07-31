<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';

const [ appInstanceName, appRepoUrl, appCommitHash ] = [ __APP_INSTANCE_NAME__, __APP_REPO_URL__, __APP_COMMIT_HASH__ ];
const route = useRoute();
</script>

<template>
	<header>
		<h1>
			<RouterLink
				:to="{ name: 'home' }"
				class="header-site"
			>
				{{ appInstanceName }}
			</RouterLink>
			
			<template v-if="route.name === 'lookup' && route.params.host">
				/ <span class="header-subject">{{ route.params.host }}</span>
			</template>
		</h1>
	</header>

	<RouterView />

	<footer>
		<p>
			Made with 🏳️‍🌈 by <a href="https://magpie.monster">Cass!</a>
			•
			<a :href="appRepoUrl">Source code</a> ({{ appCommitHash }})
		</p>
		
		<p>
			<!-- FC2 Clap tag starts here -->
			<a href="//clap.fc2.com/post/magpie/?url=https%3A%2F%2Fsona.ovh&title=sona.ovh" target="_blank" title="Web Clap by FC2">
				<img src="//clap.fc2.com/images/button/white/magpie?url=https%3A%2F%2Fsona.ovh&amp;lang=en" alt="Web Clap by FC2" style="border:none;" />
			</a>
			<!-- FC2 Clap tag ends here -->
		</p>
	</footer>
</template>

<style scoped lang="scss">
header {
	h1 {
		color: var(--color-text-light);
		text-transform: lowercase;
		
		a {
			text-decoration: none;
			color: inherit;
		}
		
		.header-subject {
			color: var(--color-text);
		}
	}
}

footer {
	text-align: center;
	font-size: 0.9rem;
	color: var(--color-text-light);
}
</style>
