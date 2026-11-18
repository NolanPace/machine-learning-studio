# Machine Learning Studio

An educational interactive **React + TypeScript** dashboard for training linear regression with gradient descent, paired with a **C++17** command-line regression engine and C++ unit tests.

The browser UI lets you generate samples, adjust learning rate and iterations, run training, and see training loss and predictions as SVG plots. The native engine loads comma-separated `x,y` pairs and trains a matching simple linear model.

## Run visual interface
```bash
cd web
npm install
npm run dev
```

## Compile native engine
```bash
cmake -S native -B build
cmake --build build
ctest --test-dir build --output-on-failure
./build/ml_studio data/sample.csv 0.001 4000
```

The two implementations use compatible mathematical models, but execute separately. This is intentionally a teaching tool rather than a production ML framework. MIT licensed.
