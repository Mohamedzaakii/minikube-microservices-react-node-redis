# Demo: React + Node.js + Redis on Minikube
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?logo=githubactions)
![Docker](https://img.shields.io/badge/Docker-Container-2496ED?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Minikube-326CE5?logo=kubernetes&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?logo=redis&logoColor=white)


## 🚀 Project Overview
This project demonstrates a full-stack microservices application deployed on Kubernetes (Minikube):
- Frontend: React SPA interacting with backend API
- Backend: Node.js REST API
- Cache: Redis for caching backend responses
- CI/CD: GitHub Actions builds and pushes Docker images to DockerHub
- Kubernetes: Deployments, Services, StatefulSet, Ingress, HPA, ConfigMaps, Secrets
- Local Dev: Minikube simulates a production-like environment

  
## 🧰 Features
- React frontend calling backend API
- Node.js backend integrated with Redis cache
- Ingress routes: /api → backend, / → frontend
- Horizontal Pod Autoscaler (HPA) for backend scaling
- ConfigMaps & Secrets for environment variables
- Fully containerized, deployable locally
- Automated CI/CD pipeline for Docker images
## 📊 Architecture Diagram




## Getting Started (Local)

#### 1- Install Requirements
- Docker
- Minikube
- kubectl
#### 2- Start Minikube
```
minikube start
eval $(minikube docker-env)
```
#### 3- Build Docker Images Locally
```
docker build -t demo-backend:latest ./backend
docker build -t demo-frontend:latest ./frontend
```
#### 4- Deploy Kubernetes Resources
```
kubectl apply -f k8s/ -n demo
```
#### 5- Verify Deployment
```
kubectl get pods -n demo
kubectl get svc -n demo
kubectl get ingress -n demo
```
## Access the Application
#### Port-forward Backend
```
kubectl -n demo port-forward svc/backend-service 5000:80
curl http://127.0.0.1:5000/api/time
```
## Frontend

- React app fetches /api/time from backend
- Cached responses demonstrate Redis usage
  
## CI/CD Workflow (GitHub Actions)
- Triggered on push to main branch
- Builds backend & frontend Docker images
- Logs in to DockerHub (using secrets: DOCKERHUB_USERNAME & DOCKERHUB_TOKEN)
- Pushes images to DockerHub

### Workflow Steps:
-  Checkout repository
-  Set up Docker Buildx & QEMU
-  Build backend and frontend images
-  DockerHub login via GitHub secrets
-  Push images to DockerHub
-  Post-job cleanup (automatic)
## Kubernetes Components 
| Resource                | Purpose                                 |
| ----------------------- | --------------------------------------- |
| Deployment              | Backend and frontend pods               |
| StatefulSet             | Redis pod with persistent storage       |
| Service                 | Frontend, backend, Redis services       |
| Ingress                 | Routes `/` → frontend, `/api` → backend |
| ConfigMap               | Environment variables                   |
| Secret                  | Sensitive data (JWT, Redis password)    |
| HorizontalPodAutoscaler | Scales backend pods automatically       |
| PersistentVolumeClaim   | Redis data persistence                  |












































































































