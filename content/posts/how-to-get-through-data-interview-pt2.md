---
title: "How to Get Through Data Interview Part 2"
date: 2021-12-09T18:51:19+01:00
draft: false
tags: ['programming', 'python', 'stats']
---

![header](https://miro.medium.com/max/700/1*EMklRKvxjOUBSUitZ_Au0Q.png)

Continuing with the series of posts that I am putting together about the selection processes in the world of data, I leave here this second part focused on the evaluations of statistics, programming and machine learning. Everything you are going to read is subject to a compilation of personal experiences, talks with colleagues and the Internet. There is no exact formula but I hope I can provide you with a skeleton of how the different parts are evaluated.

## Roadmap

1. Parte 1: Interview process + SQL questions
2. Parte 2: Stats + Programming + Machine Learning
3. Parte 3: Business Case + Metrics

## Stats

If you work or want to work with data, I am sorry to tell you that you are going to have to have at least a basic notion of statistics, you do not have to be the next Bayes, but you will surely have to know something about descriptive statistics, probabilities and eventually start to learn more advanced concepts of inferential statistics.

**What can we find in an evaluation about statistics?**

In general, they are usually evaluated in the form of conceptual questions, to see the candidate's understanding of these concepts, and in questions or exercises that need to perform some calculation, to not only observe if the candidate understands the concepts, but also is able to apply them in some real situation. An example of a conceptual question might be ***What is the difference between a mean, mode, and median?*** And an example of a more practical exercise could be ***How do I determine the duration of an A/B Testing experiment?***

From my point of view, questions or exercises on statistics do not usually deviate from the following topics:

- Descriptive statistics (mean, mode, median, standard deviation etc).
- Probabilities and distributions.
- Hypothesis tests, A/B Testing and Regression.

***Note:***  **It is not usually so deep in this evaluation of the candidate, it is about looking for questions that serve to check that the candidate knows the subject. It is usually a conceptual question about descriptive statistics, probability, or distributions coupled with a hypothesis testing, a/b testing, or regression exercise.**

Here are some sample questions for each topic I mention:

- ***In a distribution in which outliers are present, would you use the mean or the median to understand the mean values ​​of the distribution?***
- ***What does the standard deviation represent in a distribution?***
- ***What is the probability that at least two people share the same birthday in a room of 10 people?***
- ***Name and explain three types of distributions***
- ***Briefly explain what the central limit theorem is.***
- ***What is the p-value? Represents?***
- ***How do I determine the size of a population in A/B Testing?**

To prepare the aforementioned topics I recommend the following book: **["Practical Statistics for Data Scientists"](https://www.amazon.com/Practical-Statistics-Data-Scientists-Essential/dp/1491952962)**, I continue to use this same one when I do not remember a concept and I want to reread it (Yes, in case you did not know it, you do not need to know everything perfectly ). And for anything related to hypothesis testing and A/B testing, I recommend the book **[“Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing”](https://www.amazon.com/Trustworthy-Online-Controlled-Experiments-Practical/dp/1108724264)**

If you want more audiovisual content to kick off before moving on to a book, you can go to the Data Interview Pro channel (I don't have any trade-ins with this channel, I just love the content) which has a video for each of these topics I mention . I leave some that seemed relevant to me:

- **[Cracking A/B Testing Problems in Data Science Interviews](https://www.youtube.com/watch?v=X8u6kr4fxXc)**
- **[5 Statistics Concepts in Data Science Interviews](https://www.youtube.com/watch?v=Allap_hrjyo&list=PLY1Fi4XflWStFs6tLQ3Gey2Aaq_U4-Xnc&index=5)**
- **[Cracking Hypothesis Testing Problems in Data Science Interviews](https://www.youtube.com/watch?v=IY7y-t30UJc&list=PLY1Fi4XflWStljP1tzfAfU_Qn0wHzhzYm&index=3)**

---

## Programming

Then concentrating on one of the most intense parts and perhaps the one that lasts the longest when evaluating. It is most likely that it will be evaluated in Python or R although it can also be done in pseudo-code or if you are applying for a Data Engineer position, in Java (Run).

In most cases they will be practical exercises either via hacker rank or a live coding session, but some conceptual question about the language or a particular library may always arise. Let's start with what kind of problems we can find in a practical exercise:

***Note:*** *We must always observe and analyze the position to which we are applying, I mention this because: from my point of view, evaluating a Data Analyst/Scientist in a programming interview in the same way as a Software engineer, is wrong. While a good level of coding is required, they should not have the same skill.*

The practical part usually has two exercises:

- **Logic exercises with strings or numbers:** It is important to evaluate that the candidate can solve a logic with the elements of the language, but we do not want to waste all the time of the interview in the exercise, for this reason these types of exercises are usually taken, which are fast. resolving.
- **Data manipulation with pandas:** After the logic exercise, sometimes an exercise is taken where it is evaluated how the candidate performs some applications in pandas, more than anything they are cleaning and perhaps metrics.

I leave some exercises and their resolutions:

#### How would you write a function that prints all the numbers between 30 and 1000 that are divisible by 7?

```python
def divisible_7():
     for n in range(30,1000):
         if n % 7 == 0:
             print(n)
```

#### Write a function that returns the first n digits of the Fibonacci series:

```python
def fibonacci(n):
    s = [0,1]
    if n == 0:
        print("n debe ser mayor que 0")
    elif n == 1:
        return 1
    else:
        for i in range (2,n):
           s.append(s[i-1] + s[i-2])
        return s
```

#### Write a function that returns a list in reverse:

```python
def reverse(l):
    return l[::-1]
```

In addition to these exercises, the interviewer can complement with some conceptual questions about programming or a particular library. Here are some sample questions on these topics to give you an idea:

*What is object-oriented programming? What are its main differences with functional programming?*

*What is the difference between a list and a tuple?*

*In the Pandas library, why is it more convenient to use the apply method rather than a for loop?*

*What is a virtual environment? And why is it convenient to use it?*

To practice logic exercises and also understand Python concepts, I recommend reading the first chapters of the book ***[“Data Structures and Algorithms in Python”](https://www.amazon.es/Structures-Algorithms-Python-Michael-Goodrich/dp/1118290275/ref=sr_1_1?hvadid=80814136905924&hvbmt=be&hvdev=c&hvqmt=e&keywords=data+structures+and+algorithms+in+python&qid=1638906577&sr=8-1)***. The good thing about spending a little time on this book is that you will understand the basics of the language and how it works. It also has many exercises that help exercise logic.

They can also use both [HackerRank](https://www.hackerrank.com/) and [LeetCode](https://leetcode.com/) exercises. As you go through the exercises, don't despair if you find them difficult, these types of problems are aimed at training Software Engineers but you may find some interesting ones that may be useful to you.

Finally, for the section where you evaluate the use of libraries, there is no better way to practice than using them. Enter [Kaggle](https://kaggle.com/) and look for Data Cleaning Notebooks.

![img](https://miro.medium.com/max/411/1*0aLcrletCF55FiHJEs3uYg.png)

First search and see how other people solve it, when you understand what they are doing, look for a dataset that interests you and try to replicate it yourself. They will see that when they take an exercise like this, they will feel very comfortable when it comes to solving it.

---

## Machine Learning

Finally, the evaluation part of Machine Learning usually includes conceptual questions and questions where situations are presented and the candidate is asked to develop the reason for their decisions.

Some examples of conceptual questions that are often used are the following:

- **What is the difference between supervised and unsupervised learning? What types of algorithms exist in each of them? For what kind of problems is each of them used?**
- **Briefly explain how the K-means algorithm works.**
- **What is overfitting? How could it be detected and avoided?**

Then situations such as the following usually arise:

***If you are developing a model that tries to predict a serious heart disease and you have as a result of the training that model A has an accuracy of 85% and model B of 90%, are those two metrics enough to make a decision? What other metrics would you take into account when choosing the final model?***

To understand all these problems and terms, I recommend, very subjectively (Because I'm a die-hard fan of him) Josh Starmer's videos on his StatQuest channel. They are not only very well explained but also try to keep them simple and concise to make them easy to understand (at least at a high level).

I leave some relevant to the previous questions:

- **[StatQuest: K-means clustering](https://www.youtube.com/watch?v=4b5d3muPQmA)**
- **[Machine Learning Fundamentals: Sensitivity and Specificity](https://www.youtube.com/watch?v=vP06aMoz4v8)**
- **[Machine Learning Fundamentals: The Confusion Matrix](https://www.youtube.com/watch?v=Kdsp6soqA7o)**

---

To conclude, I wanted to mention that after this interview, if the candidate obtained a good performance, there are occasions where a business case or homework is usually sent, where he usually has a week to solve it. But I will talk about this topic in the last part of this series of posts.

As always, if you find bugs, have feedback (always welcome) or need help with a particular topic, you can contact me on my networks:

- [Linkedin](https://www.linkedin.com/in/tomas-ertola/)
- [Twitter](https://twitter.com/theworldisdata)


Thanks for reading!