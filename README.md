# Axmos Front-End Example

## Project Overview

This repository serves as an example front-end implementation in Google Cloud. It utilizes the Material Tailwind Dashboard React template ([link to template](https://demos.creative-tim.com/material-tailwind-dashboard-react/#/dashboard/home)) as a foundation, demonstrating a component-based architecture and showcasing the integration of a pre-built dashboard component library. This approach enables rapid development and customization to simplify the startup foundation process.

## Architecture

This repository is part of a set of open source projects created by Axmos to provide the startup community with a foundation to easily get started with their projects on Google Cloud.

![Axmos Startup Starter Kit Architecture](Arch%20-%20Startup%20Starter%20Kit.png)

## Deployment Configuration

**DNS with Cloudflare**

This section outlines how to configure your domain name with Cloudflare to serve the static assets built from your front-end code.
We recommend Cloudflare to reduce the initial cost of the Google Cloud Load Balancer in front of the Bucket with the only purpose of getting a SSL Certificate in front of your site. Cloudflare allows you to create a CNAME record as proxy to your website bucket and it will set automaticaly a SSL Certificate.

1. **Getting Started:** Follow Cloudflare's guide to set up a website: [link to Cloudflare getting started](https://developers.cloudflare.com/learning-paths/get-started/#live_website)

**CNAME Configuration**

* **Name:** Specify whether you want to use `www` or the root (`@`) for your website.
* **Content:** Set this to `c.storage.googleapis.com` to point Cloudflare to Google Cloud Storage.
* **Proxy Status:** Choose "Proxied" to enable Cloudflare's caching and security features.
* **TTL:** Leave this as "Auto" for automatic updates.

**Google Cloud Storage Static Website**

This section explains how to configure Google Cloud Storage to serve your front-end application as a static website.
You don't need to run your front-end in a Containder consuming CPU and RAM, if you are using React, angular, Vue or any other framework that generate static HTML5 web site a cheap and simple bucket is your best alternative. (If you require server side rendenring this alternative doesn't work)

* **Documentation:** Refer to Google's guide for hosting static websites on Cloud Storage: [link to Google Cloud Storage documentation](https://cloud.google.com/storage/docs/hosting-static-website)

## Deployment Flow

This section details the automated deployment process triggered by pushing code changes to your Git repository.

**Cloud Build Configuration**

* Follow the instructions provided by your Cloud Build platform (e.g., Google Cloud Build) to set up a build trigger that automatically runs the deployment process when code is pushed to a specific branch or tag.
* Configure the trigger to set the `BRANCH_NAME` environment variable for use in the build steps.
* Consider using Cloud Build secrets management for sensitive variables like `CLOUDFLARE_ZONE_ID`.

**Build Steps**

* The build process should install dependencies, run the build script (`npm run build` or similar) to create optimized production-ready assets, and potentially customize the Material Tailwind Dashboard React template for your project's specific needs.
* Adjust the build commands and output location if your build process operates differently.

**Deployment Script (`deploy.sh`):**

1. **Load Environment Variables:** The deployment script (`deploy.sh`) should read relevant environment variables from a file named based on the current branch (e.g., `$BRANCH_NAME.env_deploy`). These variables should include:
   * `DESTINATION_BUCKET`: The name of the Google Cloud Storage bucket where your website files will be uploaded.
   * `REGION`: The region where the bucket will be created.
   * (Optional) `CLOUDFLARE_ZONE_ID`: The Cloudflare zone ID for cache invalidation (consider storing securely).
2. **Create/Update Bucket:** Create a Google Cloud Storage bucket with the specified name and region using `gcloud storage buckets create` or `gcloud storage buckets update` if it already exists.
3. **Clean Up Existing Files:** Remove any existing files in the bucket using `gsutil -m rm -rf $DESTINATION_BUCKET/*`.
4. **Upload Build Files:** Upload the built assets from the build output location (likely the `build` directory) to the bucket using `gsutil -m cp -r . $DESTINATION_BUCKET`.
5. **Set Public Access (Optional):** If your website requires public access, grant read access to all users for objects in the bucket using `gcloud storage buckets add-iam-policy-binding $DESTINATION_BUCKET --member=allUsers --role=roles/storage.objectViewer`. Consider more granular access control for production environments.

6. **Configure Website (Optional):** If necessary, configure the bucket to serve as a static website by setting the main page and error page using `gcloud storage buckets update $DESTINATION_BUCKET --web-main-page-suffix=index.html --web-error-page=404.html`.

7. **Invalidate Cloudflare Cache (Optional):** If you're using Cloudflare, you can include a step to purge the cache using the Cloudflare API to ensure that updated content is delivered to users immediately. This step can be triggered after the deployment is complete.

**Additional Considerations:**

* **Security:** Pay attention to security best practices, such as using strong passwords, limiting access to sensitive information, and keeping your software and dependencies up-to-date.
* **Error Handling:** Implement error handling in your deployment script to gracefully handle potential failures and log detailed error messages.
* **Logging:** Consider adding logging to your deployment script to track the execution and troubleshoot issues.
* **Testing:** Thoroughly test your deployment process to ensure it works as expected.
* **CI/CD Pipelines:** Integrate your deployment process into a CI/CD pipeline to automate builds, tests, and deployments.
* **Monitoring:** Set up monitoring tools to track your website's performance and uptime.

By following these guidelines and leveraging the provided `readme.md` and `deploy.sh` scripts, you can effectively deploy your Axmos Front-End Example project to Google Cloud Storage and ensure a smooth user experience.
