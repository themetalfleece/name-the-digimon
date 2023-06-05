/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import { App } from './App.component';

import { D1Database as D1DatabaseType } from '@cloudflare/workers-types';

const root = document.getElementById('root');

declare global {
  type D1Database = D1DatabaseType;
}

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() => <App />, root!);
