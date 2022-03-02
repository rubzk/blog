---
title: "How to get through an Data Analyst/Scientist Interview Part 1"
date: 2021-10-27T00:19:32+01:00
draft: false
tags: ["programming", "interviews", "sql", "python"]
---


![stress](https://miro.medium.com/max/1400/1*RvpAxjhHbhJZb71G24uG3A.png)

When I was a teenager I was very bad at studying, in high school there was not a year where I did not go to summer school  and in general the habit of studying annoyed me. But years later, when I entered college, I realized that it wasn't that I hated studying, I hated what I believed back then to be studying. I used to think that studying was sitting down and reading the book or the summaries that I have written on the subject thousands of times. My definition was wrong but luckily I realized that it was not necessary to devote so much time to study but that you had to study in a more intelligent way, study smarter not harder.

What's this all about? Well, during the last month, as a result of my move to Spain, I knew that I was going to face many selection processes and I had to prepare different topics for each step of the process. So following the cliché phrase that I named moments ago, I decided to plan how to diagram each topic that can appear in a data interview and now that this apocalyptic month (of many interviews) is over, I can put together a series of posts to talk about the different processes of selection, what kind of questions you can find and where I can prepare each part of the interview.

For a better organization I divided the material into different parts, in this first one I will be focusing more on the description of the selection process and on the SQL part.

The posting roadmap would be as follows:

1. **Part 1: Journey of the selection process + SQL**
2. **Part 2: Programming + Machine Learning + Stats**
3. **Part 3: Metrics/Business + Business Case**


## Journey of the selection process and its variations:

Before starting, what is a journey? Well, it's not something that complicated, journey is a buzzword that has been romanized and is basically used to describe any process that takes a series of steps. A selection process can take both a single interview or as many variations as the company wants to measure the skills of the candidate in the face of the tasks that they will fulfill within the role (Spoiler: These are not day-to-day tasks).

Depending on the position, these processes usually vary, but in an ideal world, a selection process would look like this.

![interview](https://i.imgur.com/CMg2Jlq.png)

The problem arises when reality shows variations in these processes because each company adjusts it to their needs...

![interview2](https://i.imgur.com/pdftqLn.png)

And there are some companies that even abuse the time of a candidate:

![interview3](https://i.imgur.com/o9vtESq.png)

Now leaving aside the irony (and my hatred of long processes), let's focus on what do they usually evaluate at each step. What kind of tests can we find in the process? and how to prepare them?

## HR Screening

In this interview, most of the time it is with an HR person who asks a series of questions to get to know the person, observe their experience, evaluate certain soft skills and even in some cases ask some very high-level technical questions to apply a finer filter in the first stage.

My advice for this stage is to put together some presentation lines and order the tasks you were working on the last time. If you don't have experience, don't lie, talk about the personal projects you did and finally always add a comment regarding extra-work activities you do in your free time. It is a presentation to the front door of the company, there is not much science, be yourself. On the other hand, if you are  a psychopath,  you  will have to lie (lol)

A question may arise as to how they solved a difficult situation at work or in life in general, a good friend of mine who works in HR would recommend that they use the STAR method (Situation, Task, Action, Result)

## SQL Test

Outside of the task that you are going to perform in the company, if you cannot obtain the data, you are in trouble. And this is something that sometimes new joiners to the field take for granted and do not practice. We are at a time that  Data Science courses are at their peak, they spend a large part of the course talking about Python, its libraries, its beautiful algorithms, neural networks, blablablabla, but they do not focus on the importance of this first step, which is to ***obtain the data***.

### There are two ways to evaluate SQL:

- **Live Coding:** This is usually an interview with a person from the team in which questions about SQL are asked and practical exercises are evaluated on the spot.

- **Homework Challenge:** They usually send you a link to a platform like Hackerrank where you have some time to solve a number of SQL exercises.


***What high-level questions can we get asked? These are some of the ones that I was able to collect recently, they are often repeated quite a bit.***

- *What SQL syntax is used together with the SELECT so that the query returns unique values?*

- *Name three **types of JOINS** and explain their differences (Or else they make you explain all JOINS)*

- *What is the difference between **WHERE** and **HAVING**?*

- *What is a **Primary Key**? And a **Foreign Key**?* 

- *How would you optimize a query?*

- *What is a **Window Function** and what advantages does it have?*

- *What is a **CTE**?*

My idea is not to explain the answers, google is free and ***knowing how to google is the most important skill in any job I would say***. It is to give you an idea of what may appear.

Now moving on to the practical part of this type of interview, the interviewee is usually presented with a table or a table scheme and is asked a series of questions in which the query must be written.

**Note:** Not only the query you wrote is evaluated, but also how you explained as you write, what questions you ask and how you approach the problem.

![exmaple](https://miro.medium.com/max/475/1*8EKfYiNgRgDzz795bTs_3A.png)

It is usual to go from least to most complex in these tests, to observe the number of problems that the candidate can solve in a given time. ***If you did not solve everything, it does not mean that you failed, it is just a diagnosis of the level you have.***

**How many areas does the company have?**

```sql

SELECT DISINTCT(COUNT(area))
FROM employees

```

**What is the area with the highest average salary?**

```sql

SELECT e.area
FROM employees e
LEFT JOIN salaries s 
ON e.id = s.employee_id
GROUP BY e.area
ORDER BY AVG(s.salary) DESC
LIMIT 1;

```

**What is the top 5 employees with the highest salary?**

```sql

SELECT e.name,
       e.salary
FROM employees e
LEFT JOIN salaries s
ON e.id = s.employee_id
ORDER BY e.salary DESC;

```

**Query the list of areas (excluding the IT area) that earn at least more than $40,000 average**

```sql

SELECT e.area
FROM employees e
LEFT JOIN salaries s
ON e.id = s.employee_id
WHERE e.area != 'IT'
GROUP BY e.area
HAVING AVG(e.salary) > 40000

```

**Query the employee who earns the most from each area**

```sql

WITH cte AS(
SELECT e.area as area,
       e.name as employee,
       s.salary,
       DENSE_RANK() OVER(PARTITION BY e.area ORDER BY e.salary DESC) as rk
FROM employees e
LEFT JOIN salaries s
ON e.id = s.employee_id
WHERE e.name IS NOT NULL
)
SELECT area,
       employee,
       salary
FROM cte
WHERE rk = 1

```

Another mixed problem that can appear in this type of interview is that the interviewer presents the framework of a problem, shows the query that is being used and asks the candidate: **What errors do you notice in the query? How would you optimize it?**


## Resources to study

If you have a very basic level of SQL and have not yet used it  in a job, I recommend starting by reviewing the fundamentals of queries. I invite you to spend a few hours reading [W3Schools](https://www.w3schools.com/sql/) and [LearnSQL](https://www.learnsqlonline.org/).

When you feel confident enough and able to read a basic query on your own and understand  it, you can move on to [HackerRank](http://www.hackerrank.com/) or [LeetCode](https://leetcode.com/) exercises.

![hackerang](https://miro.medium.com/max/700/1*212ImEJ2Sx6WuEPNUY9Jig.png)


The two websites are very similar, they have many problems to solve with a statement and an IDE to be able to carry out the queries and even test the results. We can also find a forum tab where other users discuss how to solve the problem.

My humble opinion regarding this is that you try to solve it yourself or at least give yourself some time to try to solve it on your own, if some time passes and you don't know what you are doing wrong, consult the solutions left by other users and understand what they are doing. **Reading and understanding is a part of learning***

*Another way to continue exercising is a simple search on youtube...*

![yt](https://miro.medium.com/max/700/1*2JUXKRgY2CZhSMbFeAaaVQ.png)

As you will see there is a lot of content about questions and exercises that you can find in a SQL technical test. Many people film themselves doing mock-interviews (Tests) and document their mental process to carry them out. I recommend that as you watch them, try to do some of these questions or exercises on your own by stopping the video. Personally, I suggest the videos on the [Data Interview Pro](https://www.youtube.com/watch?v=pJeGiUTWi1s&list=PLY1Fi4XflWStFs6tLQ3Gey2Aaq_U4-Xnc&index=9) channel, they usually cover a wide range of examples and the explanation is very didactic for me.

Finally, one last alternative that I am going to present to you: We all have a Google account (If you don't have it, you are a psychopath) and this Google account allows us to access a Free-tier of 300USD in Google Cloud where we have the platform of Google for SQL, **BigQuery**.

![Bq](https://miro.medium.com/max/700/1*lv3DIvJsCFIyaZjt2zbM-Q.png)

It allows us to load our own dataset or explore the public ones. We can make our queries and see the results and it is quite friendly for anyone and a plus is that they can already add to the CV that they know how to use BigQuery (Yes, I know that you want to add it).

--- 

To conclude with this first post I would like to point out that as you will have read throughout the post it does not seem like something very difficult to do if you prepare yourself correctly, remember ***study smarter not harder***. But now the million dollar question, **what is the best way to prepare?**

Unfortunately I do not have that answer and it is an introspection that you will have to do or perhaps you have already done it. Each person is a different world, there are people who absorb more when they practice, others when they read and some when they observe another perform the problems. Try, fail, reflect and try again, it is the only way to know what suits each one better.

So I wish you the best of luck in your preparation for a dating job interview. I am already preparing the second part where we are going to talk a little about what to expect in the code/machine learning part.

Any questions, help or error *(Yes, sometimes I'm wrong)* feel free to contact me.