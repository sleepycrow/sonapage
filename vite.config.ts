import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'child_process';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const getCommitHash = () => {
	try {
		return execSync('git rev-parse --short HEAD').toString().trim();
	} catch (e) {
		return '??????';
	}
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
	define: {
		__APP_INSTANCE_NAME__: JSON.stringify("sona.page"),
		__APP_NAME__: JSON.stringify(process.env.npm_package_name),
		__APP_REPO_URL__: JSON.stringify('https://github.com/sleepycrow/sonapage'),
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
		__APP_COMMIT_HASH__: JSON.stringify(getCommitHash()),
		__PROXY_URL_PATTERN__: JSON.stringify("http://127.0.0.1/proxy.php?host={host}"),
	},
})
