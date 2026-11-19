---
title: "Motor insurance pricing: from GLMs to XGBoost"
group: projects
order: 1
cover: insurance-poisson-gamma.svg
hidden: false
metadata:
  type: team project, now a personal rework
  date: 2024, rework 2026
  status: in progress
  stack: [R, Python, GLM, XGBoost, FastAPI, Docker]
links:
  - label: vujadinovic/glms_in_insurance
    url: https://github.com/vujadinovic/glms_in_insurance
---

A team project on a real motor insurance dataset of about 100,000 rows: data quality checks, missing values, new features, and removing features that leaked future information. We modeled claim frequency and severity and compared GLMs with tree-based methods, linear regression and neural networks. I'm now rebuilding it in Python with gradient boosting and a FastAPI service in Docker.
