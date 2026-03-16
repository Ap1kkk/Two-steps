import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from "src/routes";

import './styles/index.scss';
import './fonts/font.scss'

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<RouterProvider router={router}>
		</RouterProvider>
	</StrictMode>
);
