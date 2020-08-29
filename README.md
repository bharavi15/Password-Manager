# Password-Manager

Password Manager is a cross-platform desktop app written with help of [Node.js](https://nodejs.org) and [Electron](https://www.electronjs.org/).

This app uses [AES-256](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) Encryption algorithm in Cipher Block Chaining(CBC) mode for encrypting the passwords. It's key is derived from password set by user. It also generates new random Initialization Vector(IV) for encryption when saving passwords.

**It is best practice not to save passwords, but if you still have to, save them securely.**



## Installation

### Basic Installation
Download the [Latest Release](https://github.com/bharavi15/Password-Manager/releases) according to your operating system.
### Install using GIT

Use Git clone to clone into the repository.
```cmd
git clone https://github.com/bharavi15/Password-Manager.git
```
Then install the required dependencies 
```cmd
cd Password-Manager && npm install
```

## Usage

### Initial setup
Set admin password when using the app for the first time.

**Note- Saved passwords cannot be recovered if you forget admin password as that itself is the encryption key.**
Please reset the app by deleting ```.passMan.db``` file.


![image](https://user-images.githubusercontent.com/26803384/90429180-d17bbe80-e0e2-11ea-9ebf-ba3e5f2ca3f6.png)
***
### Login 
Every time you start the app you'll have to login using admin password.

![image](https://user-images.githubusercontent.com/26803384/90428745-118e7180-e0e2-11ea-98c2-ed45fc17d94c.png)
***
### Home page
Here you can view already saved passwords or add new service. You can also update the admin password or delete all saved passwords.
![image](https://user-images.githubusercontent.com/26803384/90422899-27e3ff80-e0d9-11ea-9889-cd9f681fee74.png)
***

### Add service
Here you can enter the service for which you are saving the password and the password itself.
![image](https://user-images.githubusercontent.com/26803384/90425017-b9a13c00-e0dc-11ea-903a-82cfe97ac3ee.png)
***

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

This project uses Material Icons and [Materialize](https://materializecss.com/) for styling.
## License
The code from this repo is [MIT](https://choosealicense.com/licenses/mit/) licensed. 
