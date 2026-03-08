import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Index } from "src/routes";

import './styles/index.scss';
import './fonts/font.scss'
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<BrowserRouter>
            <div className={styles.screen}>
                <Index />
            </div>
		</BrowserRouter>
	</StrictMode>
);
