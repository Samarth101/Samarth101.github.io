import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function localChatApi(): Plugin {
  return {
    name: "local-chat-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", (req, res, next) => {
        const incoming = req as any;
        const outgoing = res as any;
        if (incoming.method !== "POST") {
          next();
          return;
        }

        const chunks: string[] = [];
        const decoder = new (globalThis as any).TextDecoder();
        incoming.on("data", (chunk: string | Uint8Array) => {
          chunks.push(typeof chunk === "string" ? chunk : decoder.decode(chunk));
        });
        incoming.on("end", async () => {
          try {
            incoming.body = JSON.parse(chunks.join(""));
            const { default: handler } = await server.ssrLoadModule("/api/chat.js");
            const response = {
              status(code: number) {
                outgoing.statusCode = code;
                return response;
              },
              json(payload: unknown) {
                outgoing.setHeader("Content-Type", "application/json");
                outgoing.end(JSON.stringify(payload));
                return response;
              },
            };
            await handler(incoming, response);
          } catch {
            outgoing.statusCode = 400;
            outgoing.setHeader("Content-Type", "application/json");
            outgoing.end(JSON.stringify({ error: "Invalid chat request" }));
          }
        });
      }
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const runtime = globalThis as typeof globalThis & {
    process?: { env: Record<string, string | undefined> };
  };
  if (env.GROQ_API_KEY && runtime.process) {
    runtime.process.env.GROQ_API_KEY = env.GROQ_API_KEY;
  }

  return {
    plugins: [react(), localChatApi()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            three: ["three", "three-stdlib"],
            "react-three": ["@react-three/fiber", "@react-three/drei"],
            gsap: ["gsap"],
            vendor: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      include: ["three", "gsap", "lenis"],
    },
  };
});
