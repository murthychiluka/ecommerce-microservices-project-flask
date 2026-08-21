# kubernetes-veeraops-ecommerce-microservices-app
/
This README provides end-to-end steps for installing **eksctl**, **kubectl**, **Docker**, **Ingress-Nginx**, **MariaDB**, **ArgoCD**, and creating necessary namespaces and database tables

## 📸 Architecture & Workflow Diagrams

### Workflow Diagram

![Workflow Diagram](p1.png)

![Workflow Diagram](p2.png)

## Prerequisites

- AWS Account with appropriate IAM permissions
- Linux/Unix environment or WSL2 on Windows
- Sufficient compute resources for EKS cluster

---

# 🧱 AWS Infrastructure Flow

``` text
AWS
│
├── VPC
│   │
│   ├── Public Subnet 1
│   ├── Public Subnet 2
│   │
│   ├── Private Subnet 1
│   └── Private Subnet 2
│
├── Internet Gateway
│
├── NAT Gateway
│
├── EKS
│   ├── Control Plane
│   └── Worker Nodes
│
└── RDS
    └── Application Database
```

## Deployment Workflow

Follow these steps in order for successful deployment:

### Step 1: EKS Cluster Setup with terraform
- Create EKS with terraform files mention on eks terrafom dirictory 

### Step 2: EKS Client & Cluster Update
- Already eks clinet server is creted update your terraform keys 
- Update cluster configuration
- Verify cluster connectivity using `kubectl get nodes`

### Step 3: Configure GitHub Secrets
Store the following secrets in your GitHub repository settings:
- AWS Access Key ID
- AWS Secret Access Key
- AWS Account ID
- Git PAT (Personal Access Token)

---
## Installation Steps

### 4. Install Git

```bash
yum install git -y
```

### 5. Install Ingress-Nginx

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx
```

### 6. Install ArgoCD

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
kubectl get svc -n argocd
```

### 7. Create Application Namespace

```bash
kubectl create namespace microservices
```

### 8. Retrieve ArgoCD Initial Admin Password

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```
### Step 9: Clone Repository on server
```bash
git clone <your-repository-url>   
```
### rds using as a data base mens run the follwing  scripts
```
on backend dirictory run test.sql

sudo dnf install mariadb105-server -y

mysql -h rds-endpoint -u admin -p < test.sql
```
### Step 10 : Deploy Backend
```bash
cd k8s-argocd/backend
kubectl apply -f .
# Wait for Load Balancer to be assigned
kubectl get svc -n microservices
```
### Step 11: Deploy Frontend
```bash
cd ../frontend
kubectl apply -f .
```

### Step 12: Deploy EFK Stack (Elasticsearch, Fluent Bit, Kibana)
```bash
cd ../efk-stack
kubectl apply -f .
```

### Step 13: Install Grafana & Prometheus
```bash
cd ../../grafana-prometheous
# Follow installation commands in grafana-prometheous/README.md
```
### Step 14: Access the Application
- Get the Ingress Load Balancer URL:
```bash
kubectl get ingress -n google
```
- Access the application using the Ingress Load Balancer URL in your browser



## Summary of Key Components

| Component | Purpose |
|-----------|---------|
| **EKS** | Managed Kubernetes service on AWS |
| **RDS** | Managed relational database (MySQL/MariaDB) |
| **ArgoCD** | Continuous Deployment tool |
| **Ingress-Nginx** | Ingress controller for routing |
| **EFK Stack** | Logging and debugging (Elasticsearch, Fluent Bit, Kibana) |
| **Grafana** | Metrics visualization |
| **Prometheus** | Metrics collection and alerting |

---
## for rds 
- sudo dnf install mariadb105-server -y
- on backend dirictory run test.sql
- mysql -h rds-endpoint -u admin -p<veerasir> < test.sql



# 📁 Complete Repository Structure

``` text
kubernetes-veeraops-ecommerce-microservices-app/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── EKS-Terraform/
│   ├── main.tf
│   └── rds.tf
│
├── backend/
│   ├── Dockerfile
│   ├── app.py
│   ├── requirements.txt
│   ├── backend-cm.yml
│   ├── backend-deployment.yml
│   ├── mysql-deployment.yml
│   ├── sql-cm.yml
│   └── test.sql
│
├── frontend/
│   ├── main/
│   │   ├── Dockerfile
│   │   ├── deployment.yml
│   │   ├── ingress.yml
│   │   ├── index.html
│   │   ├── nginx.conf
│   │   ├── image-fallback.js
│   │   ├── mobile.css
│   │   ├── session-watchdog.js
│   │   └── session-watchdog copy.js
│   │
│   ├── appliances/
│   ├── auto/
│   ├── beauty/
│   ├── books/
│   ├── computers/
│   ├── earphones/
│   ├── electronics/
│   ├── fashion/
│   ├── food/
│   ├── furniture/
│   ├── googlegrocery/
│   ├── googlemusic/
│   ├── googlepay/
│   ├── home/
│   ├── mobiles/
│   ├── sports/
│   ├── toys/
│   └── two-wheelers/
│
├── efk-stack/
│   ├── custom-ns.yml
│   ├── elasticsearch-sts.yml
│   ├── elasticsearch-svc.yml
│   ├── fluentbit-cm.yml
│   ├── fluentbit-cr.yml
│   ├── fluentbit-crb.yml
│   ├── fluentbit-ds.yml
│   ├── fluentbit-sa.yml
│   ├── kibana-deploy.yml
│   ├── kibana-svc.yml
│   └── storage-cls.yml
│
├── k8s-argocd/
│   ├── backend/
│   │   └── backend.yaml
│   │
│   ├── frontend/
│   │   ├── frontend-main.yml
│   │   ├── frontend-appliances.yml
│   │   ├── frontend-auto.yml
│   │   ├── frontend-beauty.yml
│   │   ├── frontend-books.yml
│   │   ├── frontend-computers.yml
│   │   ├── frontend-earphones.yml
│   │   ├── frontend-electronics.yml
│   │   ├── frontend-fashion.yml
│   │   ├── frontend-food.yml
│   │   ├── frontend-furniture.yml
│   │   ├── frontend-googlegrocery.yml
│   │   ├── frontend-googlemusic.yml
│   │   ├── frontend-googlepay.yml
│   │   ├── frontend-home.yml
│   │   ├── frontend-mobiles.yml
│   │   ├── frontend-sports.yml
│   │   ├── frontend-toys.yml
│   │   └── frontend-two-wheelers.yml
│   │
│   └── efk-stack/
│       └── efk.yaml
│
├── grafana-prometheous/
│   └── README.md
│
├── p1.png
├── p2.png
└── README.md
```


**Last Updated:** Aug 2026
