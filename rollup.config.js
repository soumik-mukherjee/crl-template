 
import pkg from './package.json';
import { babel } from '@rollup/plugin-babel';
import  commonjs  from "@rollup/plugin-commonjs";
import  { nodeResolve }  from "@rollup/plugin-node-resolve";

const extensions = ['.js', '.jsx'];

export default [
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'lib/main.js',
		external: ['ms'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' },
		],
        plugins: [
			nodeResolve({
				mainFields: ['module', 'main', 'jsnext:main', 'browser'],
				extensions 
			}),
			commonjs(),
			babel({ 
				babelHelpers: 'bundled', 
				extensions
			})
		]
	}
];