1. Goal & Assumptions

1.1. Goal: Build an effective, reliable, maintainable, and responsive personal AI coding assistant using JavaScript, with a primary focus on maximizing cost efficiency in LLM API utilization through intelligent resource allocation.

1.2. Cost: Achieve the maximum possible intelligent reduction of LLM API token costs (target 65-75%+ savings) through a dynamic, multi-level routing system and aggressive, multi-tiered caching mechanisms. The core driver is to minimize operational expenses while maintaining acceptable performance and response quality.

1.3. Rout: Implement a system that intelligently and transparently routes user queries to the optimal AI model for each specific request. This routing decision will dynamically select between: 1) Local LLMs (running on user's machine, e.g., CodeLlama via Ollama), 2) Cheap Remote LLMs (value-priced cloud APIs), and 3) Premium Remote LLMs (high-performance, higher-cost APIs like GPT-4, Claude Opus). The routing logic will be based on a deep, multi-faceted analysis of:
* Query Characteristics (qryInfo): Complexity (estimated token count, code vs. natural language), user intent (code generation, refactoring, debugging, explanation, question answering, auto-completion), and identified entities (symbols, file paths).
* Project Context (ctxInfo): Rich context derived from static and potentially dynamic code analysis provided by the Hub Service, including project structure, symbol definitions, dependencies, and relevant code snippets.
* Interaction History: Relevant parts of the conversation history (multi-turn context) to maintain coherence and context awareness.
* User-Defined Strategies: User-configurable preferences for cost vs. quality (e.g., "prioritize cost", "balance cost and quality", "maximize quality regardless of cost").

1.4. Resrc: Implement efficient and responsible management of all system resources, including:
* LLM API Usage: Optimize token consumption, minimize API calls, respect rate limits and billing budgets of external LLM APIs.
* Local Compute Resources: Efficiently utilize local CPU and GPU (if available) for running local LLMs, embedding generation, and code parsing, minimizing resource contention and impact on user's machine performance.
* Memory Management: Optimize RAM usage for in-memory caches (L1 cache), Hub data representation, and telemetry aggregation, preventing memory leaks and excessive memory footprint.
* Persistent Storage: Efficiently manage persistent storage (SQLite database) for L2 cache, telemetry data, and backup files, minimizing disk I/O and storage overhead.
* Network Bandwidth: Minimize network traffic, especially for repeated queries (via caching) and large context transfers.

1.5. Savin:
* 1.5.1. Scale Benchmark: Project cost savings against a benchmark consumption profile of approximately 2 billion tokens per month.
* 1.5.2. Savings Percentage Target: Achieve a target cost reduction of at least 65-75% (and ideally exceeding this) compared to a hypothetical baseline of using only the most expensive premium LLM for all queries. Actual savings percentage will heavily depend on real-world usage patterns, the effectiveness of the routing logic, and cache hit rates.
* 1.5.3. Monetary Savings Value: Realize potential monthly monetary savings exceeding $13,000 USD based on the benchmark token consumption and targeted percentage reduction.
* 1.5.4. PoC Time Constraint: A minimal Proof-of-Concept (PoC) validating the absolute core request path (input -> minimal call -> output) is targeted within an extremely ambitious 24-hour timeframe. It is crucial to understand that achieving the full scope of "Enhanced" features, robust testing, and production-readiness described in this plan will require a significantly longer development effort spanning weeks to months, not days. The 24-hour PoC serves solely as a validation of basic technical feasibility and project setup, not a functional MVP.

1.6. Design Priorities:
* 1.6.1. User Experience & Perceived Performance: Prioritize minimizing both actual and perceived latency. Employ aggressive caching strategies, response streaming (SSE), and fully asynchronous operations to ensure a fluid and responsive user interaction. Provide clear visual feedback (spinners, progress updates) to manage perceived wait times effectively. Responsiveness of the application thread (event loop) is critical.
* 1.6.2. JS Code Quality & Maintainability: Maintain functional clarity despite naming constraints through rigorous, mandatory JSDoc (@param, @returns, @typedef for all non-trivial code), strict ESLint/Prettier enforcing coding standards, modular design (ES Modules preferred), and thorough testing. Adherence to Single Responsibility Principle (SRP) and writing short, focused functions is key. [Consider adopting TypeScript for enhanced maintainability post-PoC].
* 1.6.3. Proven Technologies and Best Practices: Leverage established, well-documented, and actively maintained Node.js libraries and frameworks. Adhere to industry-standard best practices for asynchronous programming, error handling, security, and observability.
* 1.6.4. Comprehensive Observability and Monitoring: Integrate robust observability from the outset. Implement detailed, structured logging (Pino with context/crids), detailed metrics collection (Prometheus format, counters, gauges, histograms), and tracing capabilities (via Correlation IDs) for deep system visibility, debugging, performance analysis, and cost verification.
* 1.6.5. LLM Dev Process: Embrace the use of LLMs as development assistants throughout the implementation process itself. Leverage LLMs for code generation (scaffolding, boilerplate, utility functions), automated test case generation, JSDoc documentation, and potentially for code refactoring suggestions. Implement the mandatory LLM self-logging process (3.2) to encourage self-reflection, identify areas for improvement, and document the LLM-assisted development workflow.

2. UI/Design Considerations

Aesthetic Vision for a Modern Developer UI:
* Overall Theme: Dark, professional, and visually appealing, minimizing eye strain during prolonged coding sessions.
* Color Palette: Dominated by dark shades of blue and deep navies (e.g.,
#1A202C,
#2D3748) providing a low-fatigue background, complemented by vibrant, high-contrast accent colors (Cyan
#0BC5EA, Purple
#805AD5, Green
#48BB78 for success indicators, code syntax highlighting, and interactive elements. Red
#F56565 reserved for error states and critical alerts). Ensure WCAG AA or AAA compliant color contrast ratios for text and interactive elements for accessibility.
* Layout and Information Hierarchy: Clean, minimalist design with a focus on information clarity and efficient workflow. Utilize negative space effectively to reduce visual clutter. Implement a logical and intuitive layout, potentially using a sidebar navigation for core features, a main content area for code and AI interactions, and a status bar for system feedback.
* Visual Elements and Depth: Employ subtle gradients and soft, layered shadows (box-shadow) to add visual depth and separate UI elements. Experiment with a "glassmorphism" effect (transparency with background blur and thin, light borders) for modal windows, secondary panels, or overlays to create a sense of layering and visual hierarchy.
* Typography and Code Rendering: Choose highly readable, modern sans-serif fonts (e.g., Inter, Roboto) for UI text elements (labels, menus, buttons). Use a clear, fixed-width font (e.g., Source Code Pro, Fira Code, JetBrains Mono) optimized for code display, with configurable font sizes and syntax highlighting themes (potentially customizable dark themes aligning with the overall UI palette).
* User Interactions and Feedback: Design for fluid and responsive user interactions. Implement subtle, non-blocking animations (~200-300ms transitions) for state changes, menu expansions, and loading indicators. Provide immediate visual feedback for user actions (button presses, menu selections). Utilize progress spinners (ora-inspired) and response streaming (token-by-token display) to manage perceived latency and provide continuous feedback during AI processing.

Backend API and CLI Support for UI:
* API Server (srv.js): The API is designed to be the data provider for a rich frontend UI. API endpoints will consistently return structured JSON data for all non-streaming responses, facilitating easy parsing and rendering of data in the UI. This includes structured data for: Hub information (symbol lists, file trees, symbol details), telemetry and statistics (query counts, cost breakdowns, performance metrics in chart-ready formats), code diffs (suitable for side-by-side code comparison views). [CRITICAL] The /v1/query endpoint is specifically designed to support Server-Sent Events (SSE), enabling efficient, real-time streaming of AI-generated text token-by-token to the frontend, allowing for dynamic and visually engaging text rendering (e.g., animated typing effects). Standardized JSON error responses allow the UI to display errors consistently and informatively.
* CLI Interface (cli.js): While primarily a command-line tool, the CLI is designed with a degree of visual clarity in mind. Utilize chalk library for color-coding output (syntax highlighting, status messages, error/warning indicators) to improve readability in the terminal. Employ ora spinners to provide basic progress feedback for long-running operations. Consider offering structured output options (e.g., --json flag) for commands that return data, enabling easier parsing and integration with external tools or potential terminal-based UIs (TUIs).

3. Proof-of-Concept (PoC) Definition

2.1. PoC Goal: Deliver a bare minimum, functional Proof-of-Concept (PoC) within the [CRITICAL] extremely tight 24-hour timeframe. The PoC's sole purpose is to validate the fundamental technical feasibility of the core query processing pathway and establish a basic project structure. It is NOT intended to be a feature-complete Minimum Viable Product (MVP) and will lack most of the "Enhanced" features described in the full system plan. The PoC is a rapid technical spike to assess core integration and identify immediate roadblocks, not a user-ready tool.

2.2. PoC Scope - Functionality to be Implemented (Strict 24-Hour Limit):
* 2.2.1. Minimal Setup (Phase 1 Subset): Focus on the absolute minimum setup required to get a basic Node.js application running and configured. This includes:
* Project initialization (npm init -y).
* Installation of only essential core dependencies: dotenv, pino, axios (or node-fetch), minimist, uuid.
* Creation of a basic directory structure (src/, config/).
* Configuration of a very basic logger (logr.js with console output only) and minimal configuration loading (cfg.js reading API key from .env - no Zod validation in PoC). Setup a single .env file with one API key.
* 2.2.2. Core Logic - Minimal Stubs and Hardcoding: Implement stubbed versions of the core services, prioritizing speed of implementation over functionality or robustness:
* ApiS.js (Minimal API Client Stub): Implement one function that makes a direct, hardcoded call to a single, pre-selected remote LLM API endpoint (e.g., OpenAI's chat completions API). Hardcode API key directly in the code (for PoC simplicity, NOT for production). Implement minimal error handling: log a generic error message, return null or an empty string on failure. No retry logic, no streaming support. Reads API key from cfg.js.
* RoS.js (Trivial Routing Stub): Implement a function that completely ignores the user query and always returns a pre-determined, hardcoded model identifier (the single model used in ApiS). No query analysis, no routing rules, no model selection logic.
* CtxB.js (Trivial Context Builder Stub): Implement a function that always returns a fixed, empty string or a very short, hardcoded string as the context for every query. No interaction with the Hub, no context selection logic.
* 2.2.3. Interface - Minimal Command-Line Interface (CLI):
* cli.js (Basic CLI Entry Point): Implement a barebones command-line interface using process.argv or minimist for argument parsing. Implement a single command: ask <prompt>. The ask command should:
1. Generate a unique Correlation ID (crid) using uuid.v4().
2. Call the stubbed RoS function to "select" the hardcoded model.
3. Call the stubbed CtxB function to get the trivial context.
4. Call the minimal ApiS function to send the user-provided prompt (and the trivial context) to the pre-configured LLM API.
5. Print the raw, unformatted text response received from the API directly to stdout.
6. Use logr.js to log the start and end of the ask command execution, including the generated crid and any errors encountered. On error, print a generic error message to stderr.
* 2.2.4. [CRITICAL EXPLICIT EXCLUSIONS FROM 24h PoC]: To achieve the 24-hour target, the PoC scope must strictly exclude the following features and functionalities:
* [CRITICAL EXCLUSION] NO Hub Service implementa
