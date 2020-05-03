# INFO30005

## ***Overview***

InCuBeta is focused on 3 main functions of job listing, user profile creation, and a tagging function. With this, an additional authentication function is also enabled to create a personal experience for the interactions and functions available via InCuBeta. Each main function is separated and interacts with the server to create their own subsets of data/object storage, where they are sometimes linked together in providing their functionality.

## **Authentication (authController) ../config/auth.js**

The authentication function of InCubeta is established through the login and registration, done through ../config/passport.js (passport), ../routes/home.js (home) and ../controllers/userController.js (user controller). The router home will display and select handles that correspond to the user’s actions. When the user chose the corresponding handle, desired fill-in areas and prompted error messages will guide them throughout the whole process. If the “register” handle is activated, then a new validated user details will be generated and stored in the database.This data for each user is stored under the user data structure, with specific properties that will be shown below. After a user’s registration, InCuBeta will enable their own personal dashboard that is protected via authentication verification in ../routes/dashboard.js (dashboard) through ../config/auth.js, and thereby isn’t accessible through typing the associated URL in the browser. The user’s login status is also altered via passport, where the server keeps track of the user’s login status during their session visiting InCuBeta.

**Authentication Functions**

- Home page that allows users to register and login account:
	**`controllers/authController.js/exports.index`**

- Request to have user’s information registered in MongoDb database:
	**`controllers/authController.js/exports.register`**

- Request to authenticate user’s email with password:
    **`controllers/authController.js/exports.login`**

- Request to logout current account, redirects to login page:
    **`controllers/authController.js/exports.logout`**

## **User, profile (userController) ../controllers/userController.js**

After registering at the website, each user will generate a profile including all the information stored at ../models/user.js in the MongoDB. Once a user is logged onto the website, he can potentially update his profile information through the user controller. Published jobs are also tied to users through the job controller, which enables users to track each other’s job-listing histories. Note that it is prohibited to modify other people’s profiles while viewing their posted jobs.

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



**![](https://lh4.googleusercontent.com/24cw4KHCcWd20halX1vuBIHN_Ll4Tt03NKGBMlCJ23rIAIV2MgnIkCdUEWsEB5WRpNl4AO9gVoZ2cnlMD8YSzDt0mHzIvkCob9BpHmgFzfVqcxDRK6mBEmkhapmF1aF1KwC4G6yW)**

**User functions:**

- Request to view a user’s profile including all the jobs posted by the particular user:
  **`controllers/userController.js/exports.user_detail`**

- Request to update a user’s profile information:
**`controllers/userController.js/exports.user_update`**

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

**![](https://lh3.googleusercontent.com/3conz5A9ylXwnr2ENoCeilOQi16swM55_tU4eFHvPxmNp4rHM_Dwv-gEPnxb9Pw9AdrT9QsSdRE_lk6fw6rRIQz9LH0W-DgGbqZ-CY7j5aRpqi1e48BgbU46fZIA09Cad1uPHpy6)**

**Job functions:**

 
- Request to view all existing jobs:
**`controllers/jobController.js/exports.job_list`**

- Request to create a new job
**`controllers/jobController.js/exports.job_create`**

- Request to view a specific job listing
**`controllers/jobController.js/exports.job_detail`**

- Request to delete one job
**`controllers/jobController.js/exports.job_delete`**

- Request to update one job
**`controllers/jobController.js/exports.job_update`**

## **Tagging (../controllers/tagController.js)**

The features of tags are enabled via dashboard which draws upon ../controllers/tagController.js (tag controller). Currently tags can only be created by admins through tag controller, which is then stored as separate objects with their individual IDs. The full list of tags are able to be requested, and is seen done so in the job controller and dashboard. Although the function is now established, it is planned in the future to alter it so that tags will fall under user suggestion, and having ‘near term’ searches to reduce issues in terms of creating tags of incorrect spelling or similar typing nuances.

  
Note that only admins are authorised to create/delete/update tags, while regular users can only select the ags relevant to their job listings.

  
Note if there are existing jobs under a particular tag, then deleting this tag without deleting the jobs first is prohibited.

***Tag Object Properties***
| **Property** | **Description** |
| --- | --- |
| name | String type, created through tag controller, name of the tag |



**![](https://lh5.googleusercontent.com/V5hwahgGgfysthNTFgA8KA_zBj4cmQgaEPTdAWEbIZSXsBpazFb-vqWQ2_NG1fBrCE_M6AABUB5oAUxTfwjlVoO7b6B0vCnhQUUGDoiHlbHCxGHYVqetoMVE5KUt2_TQrV47apo3)**

**Tag Functions:**

  

- Request to view all the existing tags
**`controllers/tagController.js/exports.tag_list`**

- Request to create a new tag
**`controllers/tagController.js/exports.tag_create`**

- Request to view all the jobs associated with a particular tag
**`controllers/tagController.js/exports.tag_detail`**

- Request to delete a specific tag
**`controllers/tagController.js/exports.tag_delete`**

- Request to update a specific tag
**`controllers/tagController.js/exports.tag_update`**

## **Dashboard**

Overlooking all the controllers is the dashboard, where rendered after the user’s successful login, provides routing to the three controllers (jobController, userController, tagController) of the main functions of InCuBeta. Shown above, for both the job route and tag route via the two controllers, functions of viewing/ posting/ updating/ deleting are supported. Where as mentioned before, routing to the userController, users can also review peer profiles or to make changes of their own details.

  

Under the job routes, users can get/post requests to create/update/delete/view jobs.

Under the user routes, users can get/post requests to update their own profile and get requests to browse other people’s files.

Under the tag routes, users(only admins) can get/post requests to create/update/delete/view tags.

## Index

Index page acts as welcome page

