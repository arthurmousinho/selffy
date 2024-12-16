# Selffy - AI Model API

## Tech Stack
- Node.js
- Express.js
- TypeScript
- Zod
- Ollama

## How to run it?
1. Go to the **model** folder:
```bash
cd model
```

2. Install the dependencies:
```bash
npm install
```

3. Create a **.env** file in the root of the project and add the following variables:
```python
API_KEY="api-key"
PORT=3333
```

4. Install Ollama:
[https://github.com/ollama/ollama](https://github.com/ollama/ollama)

5. Install Tinyllama:
```bash
ollama pull tinyllama
```

6. Run the application:
```bash
npm run start
```