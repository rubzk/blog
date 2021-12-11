---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
author:
draft: false
categories:
- 
---

*the quote that I want* by ** "{{ .Params.author }}" **
