---
title: "Intro to Machine Learning for begginners"
date: 2020-06-29T19:21:50+01:00
draft: false
tags: programming, python, machine-learning
---

Following advice from leaders in the world of DS (Data Science) in Argentina, I decided to look for an old notebook that I had made to practice and write a short article that may help someone understand what is done in data science or able to introduce someone who has not the slightest idea in basic concepts.

## Summary

What we are going to be doing throughout the post is through a dataset (Dataset) provided by one of the kaggle competitions, we are going to first carry out a brief analysis of the information we have and then carry out a predictive model that identifies according to certain variables that the data set has if the person survived or not.

***Quick note***: *Kaggle is one of the best sites to learn data science and machine learning, it has many competitions to practice, free tutorials of many of the practices that are applied and user notebooks giving their point of view on each topic. I highly recommend going in and exploring on your own.*

## First step: Quick data check

First things first, kaggle provides us with two datasets: one for training (train.csv) and one for testing (test.csv). What does this mean? When we are developing a predictive model we have to feed our information model so that it learns and then somehow before taking it to production we have to perform a test with other information that is not the one used to train it, more than anything to eliminate possible biases. For this reason, generally when we have a dataset we divide the data before starting to develop the model, this time kaggle provides it directly divided.

Before starting, we are going to load the python libraries that we are going to be using in the post and a brief explanation of each one.


``` python

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

```

**Pandas**: One of the best python libraries, it allows us to import, manipulate and export data such as SQL databases, excel files, json and many more.

**Numpy**: Related to everything that is data structure manipulation and multidimensional arrays that are highly used by Machine Learning models.

**Matplot**: Focused on everything that is data visualization. Within it we can find thousands of configurations and ways to view information.

**Seaborn**: It is a library that is based on Matoplot lib but seeks to facilitate some features and be a little more aesthetic.


Now if we continue to import the data and with the `.head()` method we get the first five rows of our data set.

``` python

train = pd.read_csv('train.csv')
test = pd.read_csv('test.csv')

```

![train_data](https://miro.medium.com/max/700/1*fomGyY2hswrKAt4z-CgPwg.png)

Once the data is loaded, we can begin to observe what type of columns we have and perform an analysis of them, but first we are going to give a little context of the name of each column.

**PassengerId**: unique passenger ID

**Survived**: Indicates if this passenger survived or not

**pclass**: It is the class of the passenger ticket, we have first, second and third class.

**Name**: Passenger name

**Sex**: Gender of the passenger

**Age**: Age

**sibsp**: This column gives us the sum of siblings/partner of the passenger who are on the ship.

**patch**: This column tells us the sum of parents/children of the passenger who are on the ship.

**ticket**: The ticket number

**fare**: The cost of the ticket paid by the passenger.

**cabin**: passenger cabin number

**embarked**: The port where the passenger embarked, being C: Cherbourg, Q: Queenstown and S: Southampton.


## Second step: Breif analysis of the data

Having all this clear, we can start to play a little with the data and see what information it can give us.

``` python

plot = train.groupby(['Sex', 'Survived']).size().reset_index()\
			.pivot(columns=['Survived', index='Sex', values=0])

plot.plot(kind='bar', stacked=True)

```

![plotstacked](https://miro.medium.com/max/419/1*b5Eu7UVOVAYMoiav_TgtYQ.png)

In this graph we make a pivot to see according to gender how many of each survived. We observed that there were more female than male survivors.

Now let's see the number of female survivors per Pclass

``` python

plot = train[train.Sex == 'female'].groupby(['Sex', 'Survived']).size().reset_index()\
								   .pivot(columns=['Survived', index='Sex', values=0])

plot.plot(kind='bar', stacked=True)

```

![plotstacked](https://miro.medium.com/max/395/1*dD24NlBmPj9_Bq6uK-cVmw.png)

As a result we can see the largest number of women who did not survive are within the lowest class, something that sadly seems logical.

If we look at the age distribution within the passenger classes and whether or not they survived we see that many young women within the lowest class did not survive

``` python


g = sns.FacetGrid(train, col='Survived', row='Pclass')
g = g.map(plt.hist, 'Age')

```

![facetgrid](https://miro.medium.com/max/483/1*udFHCcxhGmFN0wvhtoHQ4w.png)

Now we wonder that among the survivors there should be children, right? Let's check the age distribution within the male survivors.

``` python


g = sns.FacetGrid(train[train.Sex == 'male'], col='Pclass', row='Survived')
g = g.map(plt.hist, 'Age')

```

![facetgrid](https://miro.medium.com/max/680/1*qlfJn4bGWtVjaoZxgnDGrQ.png)

Continuing with our theory, we can see how it is reinforced. In the first two social classes the children were mostly rescued but when we get to the lowest social class we can see that there were a number of children who did not survive.

As a mini conclusion of this small analysis we can say that although we will never know the reality of each of the stories of these people, sometimes the data leaves certain behaviors that we can deduce even if they can never be verified.

## Third step: Starting with Machine Learning

First, before entering the explicit code to develop the model, we have to define what kind of problem we want to solve.
What do I mean by this? Well, in Machine Learning, algorithms are generally intended to solve two types of problems, classification problems and regression problems.

**Classification Problems**: As their name suggests, these problems challenge algorithms to predict, based on certain X variables, a category or a classification. Example: According to weight and color variables, predict the type of fruit.

**Regression Problems:** On the other hand, in these problems according to an input of X variables, what we are looking to predict is a real value such as a number or an amount. Example: Having historical information on sales of a business, predict how many sales I will have in a certain month approximately.

Now that we understand what each of the problems refers to, we can say that the problem we are trying to solve is a classification problem because, based on the variables that we choose to train the model, we are going to want to predict if this person survived or no.

Well now moving towards the creation of the model we have to select with which variables we want to train our model. To make a simple model we are going to take variables that we have been working on in data analysis and we have seen that they have quite an impact. We ended up choosing just Pclass, Sex, and Age.
Now that we have the variables, a.k.a features, that we are going to use in our model, we are going to see if within both data sets we have any missing or null values.

![result](https://miro.medium.com/max/325/1*odwLr0KUdW0couAFYoY6Yw.png)

Only feature Age has nulls in both data sets, in these cases we have to make a decision to fill these values.

***Could we just drop these values and do the training without them?***

The answer in this case is **NO**, the training data set has 177 nulls out of a total of 891 records, resulting in almost 20% of the total records. It is not worth wasting so many records that can help us generate a more accurate model so we have to choose another strategy to define what we are going to do with these null values.
A strategy that is usually done in these cases to get a basic predictive model and leave the thought of a more advanced strategy for later is to use the average of the variable. Let's look at the age distribution.

![dist](https://miro.medium.com/max/592/1*AYs6lljz-gC-kCryz1ITCQ.png)
![mean](https://miro.medium.com/max/291/1*cAicX8ShhATLHghJ6ol0UQ.png)

We see that the average age within the data set is around 29 years old, so with this data we can take as a strategy to fill in the nulls with this value.

``` python

train['Age'].fillna(value = train['Age'].mean(), inplace=True)
test['Age'].fillna(value = test['Age'].mean(), inplace=True)

```
To continue with the preparation of the data before training the model, we have to map the column Sex. Why do you have to do this? Because Machine Learning algorithms do not usually understand when we send them a text variable as input. Without going into detail about how they work internally, they take numerical values as inputs, so we are going to change the female and male registers to '1' and '0'.

## Fourth Step: Training the model

Having the data ready to train the model, we proceed to import a very famous classification model called Random Forest Classifier. Which uses Decision Trees as a principle:

![dt](https://miro.medium.com/max/567/1*WWdaYXvioZhS6vw6FIAFqg.png)

``` python

from sklearn.ensemble import RandomForestClassifier

features = ['Age', 'Sex', 'Pclass']

model_clf = RandomForestClassifier()


```

Having imported the model, we proceed to train it or you will also find that in the world of Machine Learning it is called fitting. We are going to be passing to the model our features with which we are going to train it and also the variable that we want it to predict.

![clf](https://miro.medium.com/max/700/1*8gyv3V_JJPRxIHrTG8LhGQ.png)

When we run the fit we find that it returns the parameters with which the model was trained. These parameters can be changed to achieve a more precise model, for now we are going to train the model with default parameters.

Now we can test the model and have a minimal idea of its accuracy, predict with our training data set and compare it against the real value that we have. With this prediction we observe the accuracy score of the basic model we made.

![accuracy](https://miro.medium.com/max/539/1*OSFCl6Xoor5cZR1MqKm9Lw.png)

The model ended up returning almost 88% accuracy, which is very good for having put together a very basic model. **But let's not forget that we are testing the model with the data set with which we train it, obviously when we upload our results to kaggle we will really know how good the model is.**


## Final Step: Predicting the test model

Everything is very nice, but we will find the truth of the milanesa as soon as we try to predict the test set that we have separately. So first of all we are going to define a function that prepares the csv file that Kaggle asks for to make our submission.

``` python

def upload_sub(prediction, test_df):
	output = pd.DataFrame({'PassengerId': test_df['PassengerId'],
						   'Survived' : prediction})
	output.to_csv('my_sub.csv', index=False)


```

``` bash

kaggle competitions submit -c titanic -f my_sub.csv -m test

```

Now we enter the kaggle page and go to our competitions to see the scoring result assigned to us.

![score](https://miro.medium.com/max/700/1*Idp-9vwBm7ONH_ioSw9acw.png)

A score too high for not having done much work on the data!

I hope that this small demo has served to understand a very limited workflow in the world of DS.

[I leave the github with the notebook for those who need it.](https://github.com/rubzk/titanic-medium)


