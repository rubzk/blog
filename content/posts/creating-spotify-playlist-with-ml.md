---
title: "Creating Spotify Playlist with Machine Learning"
date: 2020-08-23T15:20:44-03:00
draft: false
tags: ["programming", "python", "clustering"] 
---


## Have you ever wondered how companies or Apps do to recommend moderately successful content to what we are consuming?

![img](https://miro.medium.com/max/681/1*-pEHTlOdX_7mlvzk3UUHPQ.png)

When I asked myself this question I thought that obviously they must have a lot of information about their products such as Mercado Libre or Amazon: Product categories, weight, our purchase and search history, which product is usually bought together with another and so we can continue thinking of variables that could help recommend a product to a potential buyer.

But then I changed the focus of my thinking towards more intangible products such as music. Although music could be acquired in a tangible way in the form of CDs, we all know that today the music business does not work that way if not digitally. Several companies have emerged from this new business model and one of them is Spotify, which I think does not need to present it due to its wide popularity. Now going back to my previous thought, Spotify not only has our searches, playlists and most listened songs to be able to recommend new music to us, but it can also afford to perform an analysis of the music to find more features that lead to a better recommendation.

![img](https://miro.medium.com/max/1400/1*8-BtIdanLJEUtSKkoqSmAw.png)

Researching their official API, I found that they offer a request in which one can get the audio features of a song. There are several features that we obtain and they range from how instrumental the song is, how danceable, how energetic and among many more. I recommend that you enter yourself and see the large number of options that the API offers.

---

Having found this functionality I came up with the following: use an unsupervised algorithm so that with all my lists, I generate different clusters according to the features of the API.

## First Step: Create Keys to access the API

We start first with everything that would be the configuration to use the API. We go to the official website of the API and go to the dashboard section where it will ask us to register as developers. They register and right there we go to the option “Create an App”

![img][https://miro.medium.com/max/894/1*Prkvi8VQTZL9Jh48mmYgAg.png]

It will ask us for a name, a description and that we accept the terms and conditions.

![img](https://miro.medium.com/max/980/1*JMOXFdyrHY88psBtWcRSnA.png)

Once the App is created, it will redirect us to its Dashboard where we can see the API credentials, which is what matters most to us. We copy them and within our repository we create a python type file where we are going to paste them.

![img](https://miro.medium.com/max/1400/1*pcHi5bL002r6QzAi8ARh9g.png)

The reason why we leave them outside the notebook is to be able to share it without the risk of someone using our credentials for something malicious.

***Important note:*** We are going to be using the Python Spotipy library that facilitates the handling of the API.

We then start by importing the libraries and loading the credentials into the notebook.

```python
import spotipy
import credentials
from tqdm import tqdm_notebook as tqdm
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth
import pandas as pd
client_credentials_manager = SpotifyClientCredentials(client_id=credentials.client_id,
                                                      client_secret=credentials.client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

```

---

## Second Step: Extract the data from the API and process it:

Now that we have the credentials loaded in the jupyter notebook, we can start making basic queries to see the API responses.
I first thought that in order to extract all my songs I would have to be able to extract all my playlists. The get_user_playlist() function allows us to fetch all our playlists, with many specifications for each one.

***Note:*** As you can see, I am going to show only the first result because if I paste the entire result, the post would take forever.

`sp.user_playlists('11101312700')['items'][0]`

![img](https://miro.medium.com/max/1400/1*yNhW5Sugcrm8wO8t38VpqQ.png)

As we can see, the API provides us with the details of each playlist that my user has, the most important data we need is the id to later use it in conjunction with the get_playlists_tracks() function

`sp.playlist_tracks('39ATQymddYN7NyYh9o1wJt')['items'][0]`

![img](https://miro.medium.com/max/1400/1*7WV-PrCVdfcAhbvKlkvx3w.png)

As a result, it returns all the tracks that the list has with all the information of each one. The most important thing would be missing... the audio features that I mentioned so much before and to get each of them there is a function called audio_features()

`sp.audio_features('2kmX8QNMLg72Vy9Ux6mdmi')`

![img](https://miro.medium.com/max/1242/1*1oi4zsq1mff56UjjeJWmvg.png)

Using these three functions, I created two functions that allow me to extract all the songs from my playlists and also concatenate the audio features of each one.

```python

def get_all_data(user_id):
    
    #get all the playlist id's
    
    track_list = []
    sname_list = []
    artist_list = []
    audio_ft = []
    
        
    for playlist in tqdm(sp.user_playlists(user_id)['items']):
            for idx,track in enumerate(sp.playlist_tracks(playlist['id'])['items']):
                if track['track']['id'] is not None:
                    
                    track_list.append(track['track']['id'])
                    sname_list.append(track['track']['name'])
                    artist_list.append(track['track']['album']['artists'][0])
                    #print(track['track']['id'])
                    audio_ft.append(sp.audio_features(track['track']['id'])[0])
    
    df = pd.DataFrame({'name': sname_list,
                       'artist': artist_list,
                       'id': track_list,
                       'audio_ft': audio_ft})
    
    return df

```

And in the following function it's just a slight transformation where we drop columns that are irrelevant to the analysis.

```python

def transform_data(df):
    
    df['artist'] = df['artist'].apply(pd.Series)['name']
    
    df = pd.concat([df,df['audio_ft'].apply(pd.Series)], axis=1)
    
    df = df.drop(labels=['time_signature','duration_ms','analysis_url','track_href','type','audio_ft'], axis=1)
    
    return df


```

The result returns a Data Frame like this:

![img](https://miro.medium.com/max/1400/1*lpwJhlSKYSFhhV7t3NixGA.png)

## Third Step: Data clustering:

As a name at the beginning of the post, my idea was to use an unsupervised algorithm, but what is this?

Unsupervised learning is a technique used in machine learning where the algorithm feeds on our data set and the selected features to be able to cluster (divide into segments) according to some pattern found in the data. It feeds on “unlabeled” data, that is to say that in this case we are not trying to make the algorithm predict something, but to explore it by itself.


![img](https://miro.medium.com/max/1192/1*CSPfuqAIzu__DCNhuRw_DA.png)


One of the best known unsupervised algorithms is K-means, which is the one we will use in this post. But before continuing with the algorithm process I want to explain the features that I chose for this clustering.

```python
features = ['danceability','energy','acousticness'
           ,'instrumentalness','valence']
```

***danceability:*** Describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is less danceable and 1.0 is more danceable.

***energy:*** It is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual characteristics that contribute to this attribute include dynamic range, perceived loudness, timbre, onset frequency, and overall entropy.

***acousticness:*** A 0.0 to 1.0 confidence measure of whether the track is acoustic. 1.0 represents high confidence that the track is acoustic.

***instrumentalness:*** Predicts whether a track contains no vocals. The sounds “Ooh” and “aah” are treated as instrumental in this context. Rap tracks or spoken words are clearly "vocals." The closer the instrumentality value is to 1.0, the greater the probability that the track contains no vocal content. Values ​​greater than 0.5 are intended to represent instrumental tracks, but the confidence increases as the value approaches 1.0.

***valence:*** A measure from 0.0 to 1.0 that describes the musical positivity conveyed by a track. Tracks with a high valence sound more positive (eg, happy, cheerful, euphoric), while tracks with a low valence sound more negative (eg, sad, depressed, angry).


***[Note: I recommend visiting the documentation where all the features are found with an even better explanation.]***(https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/)

![img](https://miro.medium.com/max/1400/1*qr_BMOhmLslbWL_MyCJvbA.png)

Once the features have been explained, we are going to induce ourselves in the training of the algorithm. One drawback of k-means is that it will cluster the data into the number of clusters you want regardless of whether this number is not optimal for the problem.

One way to solve this and have an estimate of what our optimal amount would be is to use the Elbow Method. Which basically consists of iterating over a number of clusters, let's say from 1 to 10, and calculating the SSE (Sum of Squared Errors) in each one. Looking at the visualization of this iteration we should choose the number of clusters that has the smallest SSE.

![img](https://miro.medium.com/max/790/1*xBrHScNV7wimsOPgg1L8Dg.png)

In our case, we observe that from the range of 4 to 6, our ideal cluster is found with a relatively low SSE and with the least number of clusters. For this analysis I ended up using four clusters.

![img](https://miro.medium.com/max/1400/1*VLbim6qpidRuBWZhHfYpLg.png)

We can observe in a visual way how the clustering of the songs resulted. Now we want to know, what criteria did the algorithm use for each one? And what is the difference between one and the other? To corroborate this, we are going to plot the characteristics of each cluster in a polar chart.

![img](https://miro.medium.com/max/1400/1*YIJrgWtE6XbpiESxOblAeA.png)

With the polar chart we obtain a much more visual graph to be able to understand which pattern the algorithm chose for each cluster. We quickly observe that, for example, cluster number 1 is the one with the greatest instrumentalness, therefore the songs in this cluster do not have many lyrics. On the other hand, we observe that cluster three has a greater range of acousticness, therefore the songs that compose it will be mostly acoustic.

![img](https://miro.medium.com/max/1256/1*C0Cf-LwM7lOH04H_4cGb2g.png)

These two clusters at first glance in the graph above seem to have a lot in common, the reality is that when comparing them we see that cluster 0 has higher valence and a minimal increase in energy and danceability. At the time of practice, perhaps the songs on both playlists seem to have a lot in common.

---

As a final conclusion of this post we can begin to understand how Spotify creates its lists at a very basic level, obviously its recommendations have a deeper level of analysis and code but to be something that we put together in a short time, the result is quite good in my opinion. opinion and you can see the patterns in the lists we generate.

I leave you the links of the playlists so that you can try it and give your own verdict.

[Cluster 0](https://open.spotify.com/playlist/4ludJ86aIyt11kXCF81C49?si=7Vkgi49BSSWA-HIAGEqqzQ)

[Cluster 1](https://open.spotify.com/playlist/54XX5WNijK2LVNNupCi8Kp?si=3EteH5GGQvKzPQNnYZMMug) 

[Cluster 2](https://open.spotify.com/playlist/4LdTX6IVtQcqGQmp0XPy5C?si=y_Zp6_4XSpCUKXZjLT34Zg)

[Cluster 3](https://open.spotify.com/playlist/4ZE5nTjZCa2fWbZU2ogCjS?si=AsuuRlAsRtmUdClYx1pQHA)

Finally I leave the [link to the repository](https://github.com/rubzk/spotify-data-analysis) in case you want to see the complete code.


