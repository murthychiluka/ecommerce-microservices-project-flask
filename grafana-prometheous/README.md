# Prometheus & Grafana Setup

Add these commands to install Helm, add chart repos, create the `prometheus` namespace, install the kube-prometheus-stack, and edit the Prometheus and Grafana services.

Run the following in a shell:

```bash
curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

helm repo add stable https://charts.helm.sh/stable
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
kubectl create namespace prometheus
helm install stable prometheus-community/kube-prometheus-stack -n prometheus

kubectl patch svc stable-kube-prometheus-sta-prometheus \
-n prometheus \
-p '{"spec":{"type":"NodePort"}}'

##################
kubectl patch svc stable-grafana \
-n prometheus \
-p '{"spec":{"type":"LoadBalancer"}}'

```
# grafana pasword
```
kubectl get secret -n prometheus stable-grafana \
-o jsonpath="{.data.admin-password}" | base64 -d
```
```bash
kubectl get pods -n prometheus
kubectl get svc -n prometheus
```
<img width="989" height="561" alt="photo_2026-08-21_08-50-49" src="https://github.com/user-attachments/assets/ac97f288-f9ee-4bc6-8dd9-dff385422577" />

Notes:
- Replace the release name `stable` with a more descriptive release name if desired.
- Editing the services with `kubectl edit svc` lets you change ports, annotations, or type (e.g., to `NodePort`/`LoadBalancer`) as needed.
