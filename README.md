# INFO30005
***Overview***

InCuBeta is focused on 3 main functions of job listing, user profile creation, and a tagging function. With this, an additional authentication function is also enabled to create a personal experience for the interactions and functions available via InCuBeta. Each main function is separated and interacts with the server to create their own subsets of data/object storage, where they are sometimes linked together in providing their functionality.

**Authentication (authController) ../config/auth.js**

The authentication function of InCubeta is established through the login and registration, done through ../config/passport.js (passport), ../routes/home.js and ../controllers/userController.js (user controller). This data for each user is stored under the user data structure, with specific properties that will be shown below. After a user’s registration, InCuBeta will enable their own personal dashboard that is protected via authentication verification in ../routes/dashboard.js (dashboard) through ../config/auth.js, and thereby isn’t accessible through typing the associated URL in the browser. The user’s login status is also altered via passport, where the server keeps track of the user’s login status during their session visiting InCuBeta.

**User, profile (userController) ../controllers/userController.js**

After registering at the website, each user will generate a profile including all the information stored at ../models/user.js in the MongoDB. Once a user is logged onto the website, he can potentially update his profile information through the user controller. Published jobs are also tied to users through the job controller, which enables users to track each other’s job-listing histories. Note that it is prohibited to modify other people’s profiles while viewing their posted jobs.

***User Object Properties***
| **Property** | **Description** |
| --- | --- |
| first_name | String type, created through user controller, first name of user |
| last_name | String type, created through user controller, last name of user|
| password| String type, created through user controller, password of user account|
| email | Show file differences that haven't been staged |
| summary | String type (an optional self-bio to introduce personal interests and specialised learning areas used for personal networking), created through user controller |
| profile_img|String type, updated through user controller, url address of the image|
| phone_num| String type, updated through user controller, phone number of user|
| d.o.b. (date of birth)| Date type ( first recorded when registered ), updated through user controller, can be updated as user’s birthday |


**![](https://lh4.googleusercontent.com/24cw4KHCcWd20halX1vuBIHN_Ll4Tt03NKGBMlCJ23rIAIV2MgnIkCdUEWsEB5WRpNl4AO9gVoZ2cnlMD8YSzDt0mHzIvkCob9BpHmgFzfVqcxDRK6mBEmkhapmF1aF1KwC4G6yW)**

**Job listing (../controllers/jobController.js)**

With the job listing function, users are able to create, update, and delete jobs, enabled by ../controllers/jobController.js (job controller). The job object is firstly able to be created through the ../models/job.js that will have properties of a title, description, the user who created it and the associated date and time of creation, and will receive a system generated unique ID through mongoose. Associated pre-determined tags will also be added, which is associated with the tagging function and is linked to the job’s object ID. With the ID of the user who created the job stored, this enables restrictions to only allow the original poster to update or delete the job listing.



***Job Object Properties***
| **Property** | **Description** |
| --- | --- |
| title | String type, created through job controller |
| description | String type, created through job controller|
| user| User ID obtained, finding current user in job controller|
| tag | Array of tag object IDs, finding all associated tags in job controller |
| date | Date type, using function Date.now() |

**![](https://lh3.googleusercontent.com/3conz5A9ylXwnr2ENoCeilOQi16swM55_tU4eFHvPxmNp4rHM_Dwv-gEPnxb9Pw9AdrT9QsSdRE_lk6fw6rRIQz9LH0W-DgGbqZ-CY7j5aRpqi1e48BgbU46fZIA09Cad1uPHpy6)**

**Tagging (../controllers/tagController.js)**

The features of tags are enabled via dashboard which draws upon ../controllers/tagController.js (tag controller). Currently tags are user-created through tag controller, which is then stored as separate objects with their individual IDs. The full list of tags are able to be requested, and is seen done so in job controller and dashboard. Although the function is now established, it is planned in the future to alter it so that tags will fall under user suggestion, and having ‘near term’ searches to reduce issues in terms of creating tags of incorrect spelling or similar typing nuances.

**![](https://lh5.googleusercontent.com/V5hwahgGgfysthNTFgA8KA_zBj4cmQgaEPTdAWEbIZSXsBpazFb-vqWQ2_NG1fBrCE_M6AABUB5oAUxTfwjlVoO7b6B0vCnhQUUGDoiHlbHCxGHYVqetoMVE5KUt2_TQrV47apo3)**

