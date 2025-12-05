# ecom-monitor-demo


Minimal Node.js e-commerce backend (in-memory) with Prometheus metrics and Kubernetes manifests.


## Steps (copy & paste)


### 1) Prepare files
- Copy the `backend/` folder and `k8s/` folder files into a local directory.
- Edit `k8s/deployment.yaml` and replace `YOUR_DOCKERHUB_USERNAME` with your Docker Hub username (or registry+repo).
- Edit `k8s/servicemonitor.yaml` label `release: prom` if you choose a different Helm release name.


### 2) Build and test locally
```bash
cd backend
npm install
node server.js
# open http://localhost:3000/products
# open http://localhost:3000/metrics