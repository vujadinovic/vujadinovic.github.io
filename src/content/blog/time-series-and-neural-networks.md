---
title: Time series and neural networks
description: "[Short description of the post.]"
lead: Classical models forecast a number. DeepAR forecasts a distribution. This post follows the path from one to the other.
category: time series
tags: [forecasting, LSTM, DeepAR, PyTorch]
date: 2026-12-01
draft: true
featured: true
cover: time-series-ridgeline.svg
code: https://github.com/vujadinovic/deepar
---

> Example text from the design prototype. Replace it with the real post.

## From autoregression to recurrent networks

The simplest useful model of a time series says that today looks like a weighted sum of the last few days, plus noise. That is the autoregressive model of order $p$:

$$
y_t = c + \sum_{i=1}^{p} \varphi_i \, y_{t-i} + \varepsilon_t
$$

Here $\varphi_i$ are the weights we estimate and $\varepsilon_t$ is white noise. The model is linear and its memory is exactly $p$ steps long. A recurrent network keeps the same idea, the past predicts the future, but replaces the fixed window with a hidden state that it learns to update.

## Predicting a distribution

DeepAR feeds the previous value and the current covariates into an LSTM, and instead of predicting $y_t$ directly, it predicts the parameters $\theta_t$ of a likelihood:

$$
h_t = \operatorname{LSTM}(h_{t-1}, y_{t-1}, x_t), \qquad \theta_t = g(h_t), \qquad y_t \sim p(y \mid \theta_t)
$$

Training maximizes the log-likelihood of the observed values over all series and time steps:

$$
\mathcal{L} = \sum_{t} \log p(y_t \mid \theta_t)
$$

In code, one step of that loop is three lines:

```python title="deepar/train.py"
h, state = lstm(torch.cat([y_prev, x_t], dim=-1), state)
mu, sigma = head_mu(h), F.softplus(head_sigma(h))
loss = -Normal(mu, sigma).log_prob(y_t).mean()
```

## What changes in practice

Because every step ends in a distribution, sampling many paths forward gives quantiles for free. The forecast is no longer a line but a fan that widens as the horizon grows.

![Observed series, then the forecast median with 50% and 90% predictive intervals.](deepar-forecast-fan.svg "fig. 1: observed series, then the forecast median with 50% and 90% predictive intervals.")

[The rest of the post goes here.]
