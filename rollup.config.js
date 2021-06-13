import * as path from 'path'
import multi from '@rollup/plugin-multi-entry';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete'
import { terser } from "rollup-plugin-terser";

const DIST = 'dist'

export default {
	input: {
		include: ['lib/**/*.ts'],
		exclude: ['**/?(*.)+(test|spec).[tj]s']
	},
	output: [{
		file: path.resolve(DIST, 'index.esm.js'),
		format: 'es',
	}, {
		file: path.resolve(DIST, 'index.cjs.js'),
		format: 'cjs'
	}, {
		file: path.resolve(DIST, 'index.js'),
		name: 'kerb',
		format: 'umd'
	}, {
		file: path.resolve(DIST, 'index.min.js'),
		name: 'kerb',
		format: 'umd',
		plugins: [
			terser()
		]
	}],
	plugins: [
		del({ targets: DIST }),
		multi(),
		typescript(),
		copy({
			targets: [
				{
					src: [
						'package.json',
						'readme.md'
					],
					dest: 'dist'
				},
			]
		})
	]
}
