const { build } = require('esbuild');

build({
  entryPoints: ['./src/main.ts'],
  outbase: './src', 
  outdir: './lib', 
  platform: 'node', 
  external: [],
  bundle: true,
  watch: false 
})
