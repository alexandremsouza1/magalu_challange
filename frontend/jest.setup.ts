import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "node:util";

// Corrige erros de encoder/decoder no jsdom
global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
