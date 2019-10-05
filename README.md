# WEave

## Inspiration
The motive of our team was to build something that helped and gave back to the community which we are a part of. Crime alerts are a huge thing around Tempe and our idea was to help build a network which helps each other. Although we agree unequivocally that this is not the final solution, this could be a step in the right direction.
## What it does
WEave is a desktop/mobile application that helps law enforcement track down perpetrators with the help of the network built on WEave alongside realtime data analysis. 
Law enforcement has access to a dashboard wherein they can monitor crimes and various other alerts in real-time. This dashboard updates in realtime displaying the drive-time areas of where the perpetrators could have gone. Other WEavers who have downloaded the application will get a push notification once they have entered into the vicinity of the crime. With sufficient suspect details, the WEavers respond back notifying that they have or have not seen the victim. They now act as new nodes in the network and the vicinity is updated around them as well. This forms an Directed Acyclic Graph. Areas that are overlapping are the most probable locations of the suspect's getaway. The motive is to corner or triangulate the suspect's location with the highest efficiency using updates from WEavers.
Each user on the WEave network downloads a mobile app and is given real-time alerts of suspects in their area wherein they can respond if spotted. This helps the community and the police department in narrowing down areas in which the suspect could have gotten away.
## How we built it
We utilized ArcGIS' apis to build out the dashboard map and the optimal paths in which the perpetrator could have escaped. Mongodb was used as a backend in communication with AWS lambda.
On the mobile app, React-Native was utilized.
## Challenges we ran into
Understanding the ArcGIS APIs
Building out the dashboard from scratch
Building the mobile app
Connecting mongodb with AWS
CORS!!

## Accomplishments that we're proud of
Learnt and created an app using ArcGIS in 36 hours
Created fully functioning mobile app along with dashboard

## What we learned
ArcGIS, React-Native, AWS, Mongodb

## What's next for WEave
WEave can integrate itself with various machine learning models to further ehance the possible ways in tracking down the suspect.
With further data collected, we can plot out safe areas and most optimal routes in which the perpetrator could have escaped. We can also calculate the safest route for WEave users based on the real-time data coming in.

