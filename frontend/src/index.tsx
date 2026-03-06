import { createRoot } from 'react-dom/client';
import { Index } from './routes';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <StrictMode>
        <BrowserRouter>
            <Index />
        </BrowserRouter>
    </StrictMode>
);

