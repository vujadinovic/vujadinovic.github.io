---
title: DeepAR from scratch
group: projects
order: 2
cover: deepar-forecast-fan.svg
hidden: false
metadata:
  type: personal project
  date: "[YEAR]"
  status: finished
  stack: [Python, PyTorch, LSTM, time series]
links:
  - label: vujadinovic/deepar
    url: https://github.com/vujadinovic/deepar
---

An implementation of Amazon's DeepAR on top of PyTorch's LSTM, applied to stock market time series. For every step the model outputs a predictive distribution instead of a single number. I benchmarked it against AR, ARIMA, GARCH and a random walk on RMSE, ND and the 10% and 90% quantile losses.
