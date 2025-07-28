import "@testing-library/jest-dom";

import { TextEncoder } from "util";

// Use Node.js built-in TextEncoder for Jest jsdom environment
global.TextEncoder = TextEncoder;
