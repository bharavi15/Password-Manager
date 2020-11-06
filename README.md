# Password-Manager

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Password Manager is a cross-platform desktop app written with help of [Node.js](https://nodejs.org) and [Electron](https://www.electronjs.org/).

This app uses [AES-256](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) Encryption algorithm in Galois/Counter Mode(GCM) mode for encrypting the passwords. It's key is derived from password set by user. It also generates new random Initialization Vector(IV) for encryption when saving passwords.

**It is best practice not to save passwords, but if you still have to, save them securely.**



## Installation

### Basic Installation
Download the [Latest Release](https://github.com/bharavi15/Password-Manager/releases) according to your operating system.
### Install using GIT

Use Git clone to clone into the repository.
```cmd
git clone https://github.com/bharavi15/Password-Manager.git
```
Install the required dependencies 
```cmd
cd Password-Manager && npm install
```
Run Password-Manager using
```cmd
npm start
```

## Usage

### Initial setup
Set admin password when using the app for the first time.

**Note- Saved passwords cannot be recovered if you forget admin password as that itself is the encryption key.**
Please reset the app by deleting ```.passMan.db``` file.


![image](https://user-images.githubusercontent.com/26803384/91870733-abcee780-ec94-11ea-931c-56f74d1b9032.png)
***
### Login 
Every time you start the app you'll have to login using admin password.

![image](https://user-images.githubusercontent.com/26803384/91870189-5eeb1100-ec94-11ea-9399-0c4f12094e6a.png)
***
### Home page
Here you can view already saved passwords or add new service. You can also update the admin password or delete all saved passwords.
![image](https://user-images.githubusercontent.com/26803384/91870539-9fe32580-ec94-11ea-9d5c-c3b71065e00c.png)
***

### Add service
Here you can enter the service for which you are saving the password and the password itself.
![image](https://user-images.githubusercontent.com/26803384/91871132-c6a15c00-ec94-11ea-868d-60a5c5341bd3.png)
***

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

This project uses [Material Icons](https://material.io/resources/icons/?style=baseline) and [Materialize](https://materializecss.com/) for styling.
## License
The code from this repo is [MIT](https://choosealicense.com/licenses/mit/) licensed. 
