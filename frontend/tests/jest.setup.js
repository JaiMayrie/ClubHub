import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}

process.env.VITE_API_URL = "http://localhost:5000/api";
