
# INFO30005 Incubeta 

## ***Overview***

InCuBeta is focused on 3 main functions of job listing, user profile creation, and a tagging function. With this, an additional authentication function is also enabled to create a personal experience for the interactions and functions available via InCuBeta. Each main function is separated and interacts with the server to create their own subsets of data/object storage, where they are sometimes linked together in providing their functionality.



## *3 Core Functionality*


There are three core functionalities to our website “Incubeta”, including job-listing, user profile, and the tagging system.

*****Common files that all 3 functionality uses:*****
***View***: Dashboard.pug. Header.pug, Error.pug, Index.pug, About_us.pug

***Route:*** index.js https://incubeta.herokuapp.com/
 dashboard.js https://incubeta.herokuapp.com/dashboard
 
***Controller***: jobController.js, tagController.js, searchController.js

## ***User:***

Users can register at the website. Once the information is authenticated, user details will be displayed on the user profile, including their associated tags. Users can make changes and update his own profile while able to only browse other users’. Users will also be informed about websites updates on job-posting under subscribed tags and also message other users via email notifications. Certain functinoality can only be accessed once log in. 

***User Views:*** user_detail.pug, user_update.pug, home.pug, login.pug, register.pug
 ***User routes:*** home.js
 ***User Controllers***: authController.js, emailController.js, userController.js

## ***Job***:

 Each user is welcomed to post job-listings through the dashboard. All the jobs are stored in the database along with its description and the tags associated with it so that a list of jobs can be viewed by users. Jobs can be further updated by the original job-lister or even be deleted by the user. Only admins can modify/delete all users’ jobs as a form to moderate the website. Featured job listings will be presented via dashboard with changes upon each refresh.

***Job Views:*** job_create.pug, job_delete.pug, job_detail.pug, job_list.pug, job_update.pug
 ***Job routes:*** dashboard.js
 ***Job Controllers***: jobController.js, searchController.js, emailController.js

## ***Tag***

：Each job posted can choose to add as many tag associations to give users a better understanding of the task. Tags can only be newly initiated or deleted by admin, while the majority of users can select from the large given list of tags. All the job under existing tags can be accessed from the dashboard. If none of the current existing tags fits the job description, there is also the option of “others” where users can choose to contact the admin for further tag suggestions. Subscribed tags will be exhibited on dashboard, meaning users will get email notifications each time a job is associated with a subscribed tag being posted.

***Tag Views:*** tag_create.pug, tag_delete.pug, tag_detail.pug, tag_list.pug, tag_update.pug
 ***Tag routes:*** dashboard.js
 ***Tag Controllers***: tagController.js

## 

# Controllers

***

## **Authentication (authController) ../config/auth.js**

The authentication function of InCubeta is established through the login and registration, done through ../config/passport.js (passport), ../routes/home.js (home) and ../controllers/userController.js (user controller). The router home will display and select handles that correspond to the user’s actions. When the user chose the corresponding handle, desired fill-in areas and prompted error messages will guide them throughout the whole process. If the “register” handle is activated, then a new validated user details will be generated and stored in the database.This data for each user is stored under the user data structure, with specific properties that will be shown below. After a user’s registration, InCuBeta will enable their own personal dashboard that is protected via authentication verification in ../routes/dashboard.js (dashboard) through ../config/auth.js, and thereby isn’t accessible through typing the associated URL in the browser. The user’s login status is also altered via passport, where the server keeps track of the user’s login status during their session visiting InCuBeta.

**Authentication Functions**

- Home page that allows users to register and login account:
	**`controllers/authController.js/exports.index`**
 https://incubeta.herokuapp.com/home
 
- Request to have user’s information registered in MongoDb database:
	**`controllers/authController.js/exports.register`**
https://incubeta.herokuapp.com/home/register

- Request to authenticate user’s email with password:
    **`controllers/authController.js/exports.login`**
https://incubeta.herokuapp.com/home/login

- Request to logout current account, redirects to login page:
    **`controllers/authController.js/exports.logout`**
    https://incubeta.herokuapp.com/home/logout
    

## **User, profile (userController) ../controllers/userController.js**

After registering at the website, each user will generate a profile including all the information stored at ../models/user.js in the MongoDB. Once a user is logged onto the website, he can potentially update his profile information through the user controller. The ../controllers/emailController.js) works closely with userController to achieve email notification function while jobs are posted under subscribed tag. Also users can message each other through the message box in the form of email. Published jobs are also tied to users through the job controller, which enables users to track each other’s job-listing histories. Note that it is prohibited to modify other people’s profiles while viewing their posted jobs. User can associate themselves with skillset tags or tags of areas of interest and the associated tags will be displayed on profile.

***NOTE THAT** users have to log in to view their own profile and perform user-related actions. Follow the following directions to access the user profile update. After logging in, press the icon on the top left corner, on the user name(directs the user to user profile), then onto the "user update" button located at the buttom of the page*

***User Object Properties***
| **Property** | **Description** |
| --- | --- |
| first_name | String type, created through user controller, first name of user |
| last_name | String type, created through user controller, last name of user|
| password| String type, created through user controller, password of user account|
| email | String type, created through user controller, email address of user|
| summary | String type (an optional self-bio to introduce personal interests and specialised learning areas used for personal networking), created through user controller |
| profile_img|String type, updated through user controller, url address of the image|
| phone_num| String type, updated through user controller, phone number of user|
|date_of_birth| Date type, updated through user update page, can be updated as user’s birthday, displayed as age|
|tags| Array type, linked to the skillset tag or tag of interest that user associates themselves with.|
|followed_tag| Array type, link to users’ subscribed tag, displayed at user’s dashboard. ( will also generate email notification is jobs are posted under subscribed tag.)|
|popularity| Number type, recording each user’s popularity through the number of times the user-detail page is visited.|
|infoDisplayConsent |Boolean type, consent of displaying personal contact details on user profile.|
|emailConsent|Boolean type, consent of receiving emails from Incubeta website.|
|isAdmin |Boolean type, authority to create and update tags.|



**![](https://media.discordapp.net/attachments/702324760411111449/711467101524590623/unknown.png)**

**User functions:**

- Request to view a user’s profile including all the jobs posted by the particular user:
  **`controllers/userController.js/exports.user_detail`**
https://incubeta.herokuapp.com/dashboard/user/:id
(Log in the view this page as it is protected. Follow the following directions to access the user page. After logging in, press the icon on the top left corner, then on your user name)

- Request to update a user’s profile information:
**`controllers/userController.js/exports.user_update`**
https://incubeta.herokuapp.com/dashboard/user/:id/update
(Log in the view this page as it is protected. Follow the following directions to access the user profile update. After logging in, press the icon on the top left corner, on your user name, then onto the "user update" button located at the buttom of the page)


## **Job listing (../controllers/jobController.js)**

With the job listing function, users are able to create, update, and delete jobs, enabled by ../controllers/jobController.js (job controller). The job object is firstly able to be created through the ../models/job.js that will have properties of a title, description, the user who created it and the associated date and time of creation, and will receive a system generated unique ID through mongoose. Associated pre-determined tags will also be added, which is associated with the tagging function and is linked to the job’s object ID. With the ID of the user who created the job stored, this enables restrictions to only allow the original poster to update or delete the job listing.

  

Note that admins have the rights to update job listings (admins may update job’s associated tags once there are more newly relevant tags created) or to delete inappropriate jobs while the regular users are prohibited in modifying other people’s job listings.

  


***Job Object Properties***
| **Property** | **Description** |
| --- | --- |
| title | String type, created through job controller |
| description | String type, created through job controller|
| user| User ID obtained, finding current user in job controller|
| tag | Array of tag object IDs, finding all associated tags in job controller |
| date | Date type, using function Date.now() |
|popularity| Number type, recording each job’s popularity through the number of times the job-detail page is visited.|

**![enter image description here](https://media.discordapp.net/attachments/702324760411111449/711467469965099048/unknown.png)**

**Job functions:**

 - Request to view all existing jobs:
**`controllers/jobController.js/exports.job_list`**
https://incubeta.herokuapp.com/dashboard/jobs

- Request to create a new job
**`controllers/jobController.js/exports.job_create`**
https://incubeta.herokuapp.com/dashboard/job/create

- Request to view a specific job listing
**`controllers/jobController.js/exports.job_detail`**
https://incubeta.herokuapp.com/dashboard/job/:id

- Request to delete one job
**`controllers/jobController.js/exports.job_delete`**
https://incubeta.herokuapp.com/dashboard/job/:id/delete

- Request to update one job
**`controllers/jobController.js/exports.job_update`**
https://incubeta.herokuapp.com/dashboard/job/:id/update

## **Tagging (../controllers/tagController.js)**


The features of tags are enabled via dashboard which draws upon ../controllers/tagController.js (tag controller). Currently tags can only be created by admins through tag controller, which is then stored as separate objects with their individual IDs. The full list of tags are able to be requested, and is seen done so in the job controller and dashboard. Although the function is now established, it is planned in the future to alter it so that tags will fall under user suggestion, and having ‘near term’ searches to reduce issues in terms of creating tags of incorrect spelling or similar typing nuances.

  

Users can also follow tags so that each time jobs associated with this tag get posted, they will be notified via email subscriptions. These subscribed tags will be displayed on their dashboard as well.

  

Note that only admins are authorised to create/delete/update tags, while regular users can only select the ags relevant to their job listings.

  

Note if there are existing jobs under a particular tag, then deleting this tag without deleting the jobs first is prohibited.

***Tag Object Properties***
| **Property** | **Description** |
| --- | --- |
| name | String type, created through tag controller, name of the tag |
| Popularity | Number type, recording each job’s popularity through the number of times the job-detail page is visited. |


**![enter image description here](https://media.discordapp.net/attachments/702324760411111449/711467211444977714/unknown.png)**

**Tag Functions:**

  

- Request to view all the existing tags
**`controllers/tagController.js/exports.tag_list`**
https://incubeta.herokuapp.com/dashboard/tags

- Request to create a new tag
**`controllers/tagController.js/exports.tag_create`**
https://incubeta.herokuapp.com/dashboard/tag/create

- Request to view all the jobs associated with a particular tag
**`controllers/tagController.js/exports.tag_detail`**
https://incubeta.herokuapp.com/dashboard/tag/:id

- Request to delete a specific tag
**`controllers/tagController.js/exports.tag_delete`**
https://incubeta.herokuapp.com/dashboard/tag/:id/delete

- Request to update a specific tag
**`controllers/tagController.js/exports.tag_update`**
https://incubeta.herokuapp.com/dashboard/tag/:id/update

## **Search (../controllers/searchController.js)**

To allow better user experience, the ../controllers/searchController.js (searchController) enables jobs filtering with key-words search inside job listings. Regex is employed to support both uppercase and lowercase search. Links to relevant jobs will be listed if the search is successful. On other hand if jobs with certain keywords do not exist in the database, reminders will be returned to inform users.

Besides, the searchController can generate featured jobs recommendations for users, displaying on the dashboard. Each time the web page refreshes, the featured jobs will be changed.

***Functions:***

Request to search for job keywords & generate featured jobs in dashboard page

*controllers/searchController.js/exports.index*
https://incubeta.herokuapp.com/dashboard/jobs

## **Email subscription(../controllers/emailController.js)**

The emailController enables the website to inform users about the newest updates via emails. Once new jobs are listed under the subscribed tags (given the user have subscribed to some tags), notification emails will be sent to the users. Besides, if a user decided not to reveal his personal contact details for privacy reasons, other users can also reach out to him via email.

## *Route*

## Index Page

Index page acts welcome page. Users can click on the animation of logo to get redirected to the dashboard page.

## **Dashboard**


Overlooking all the controllers is the dashboard, where rendered after the user’s successful login, provides routing to the three controllers (jobController, userController, tagController) of the main functions of InCuBeta. Shown above, for both the job route and tag route via the two controllers, functions of viewing/ posting/ updating/ deleting are supported. Where as mentioned before, routing to the userController, users can also review peer profiles or to make changes of their own details.

  

Under the job routes, users can get/post requests to create/update/delete/view jobs.

Under the user routes, users can get/post requests to update their own profile and get requests to browse other people’s files.

Under the tag routes, users(only admins) can get/post requests to create/update/delete/view tags.

  
6 featured jobs will be generally each time when the user refreshes the dashboard page and will be present to users in the form of a carousel. The tags subscribed by user will also be shown.

## Home
The home page is served as a register/login page for users if they want to use certain functions. 

## *Test Account details:*

(A real gmail account for email notification purpose,Email notifications will be sent if you follow tags and new jobs if said tags are updated. If a user messages you under your profile to further connect, an email will be sent too.)

*password is the name for Gmail login and incubeta login

Name: H1 Please (regular user)

Email: [incubetatest@gmail.com](mailto:incubetaTest@gmail.com)

Password: h1h1h1h1

  

Test account (authorized to CRUD actions)

Email: theresalee0311@gmail.com

Password: 1234 (set before applying password length constrictions) 


