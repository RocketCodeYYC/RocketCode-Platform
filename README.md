# RocketCode Platform

This platform provides the stack necessary to kickstart development of a web application using modern technologies. RocketCode Platform is consisted of open source technologies which provides a strong foundation for application development. The front-end UI technology uses React (https://reactjs.org/), Ant Design is the UI component library (https://ant.design/), Parse Server being the BaaS (backend-as-a-service) (https://parseplatform.org/), and MongoDB (https://www.mongodb.com/) is the underlying database. There are various reasons and justifications contributing to the architectural decisions and technologies selections. RocketCode Platform only provides an application platform blueprint and a reference implementation, you also have the option to select different technologies by plugging and pulling different components from tech stack and tailor it to your own use case and requirements.


## Directories & Files

Directory/File | Description
----------- | -----------
my-app | Ant Design React front-end application
parse-server/cloud-code | Parse Server Cloud Code where your custom back-end logic could reside
parse-server/config | Contains the configuration for Parse Server
parse-server/init-script/provision.js | The initialization script for seeding the Parse Server with 2 users (user & admin) and 2 roles (user & admin)
api.rest | REST Client api test file used for the REST Client extension for Visual Studio Code
docker-compose.yml | Docker Compose file for spinning up the RocketCode Platform environment
restart.bat | Batch file containing the command to restart the Parse Server Docker container. Modifications to Parse Cloud Code requires a restart.
----------------------------

## Installation

Assuming you already have the basics installed including Visual Studio Code, Git, Docker, and Docker Compose...

Recommend to fork this repository (upstream repository) to your own GitHub repository so that going forward you could keep your own forked repository in sync when there are changes and updates made to the RocketCode Platform.

For more info, please read:
1. Fork a repo (https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository)
2. Syncing a fork - Sync a fork of a repository to keep it up-to-date with the upstream repository. (https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)

After you've either cloned this repository or forked this repository and cloned from your forked repository, run the following:

```bash
git clone https://github.com/username/RocketCode-Platform.git
```

After the initial RocketCode Platform code has been downloaded install the dependencies using [npm](https://www.npmjs.com/package/npm).

```bash
cd .\RocketCode-Platform\my-app
npm install
```

Spin up the Docker containers

```bash
cd .\RocketCode-Platform
docker-compose up -d
```


