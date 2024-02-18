## Napark
This application is aboout parking management system which can be used for reserving parking slot, getting the information of the availability of each parking lots, and managing the parking lot

## Running the application locally
* Prerequisite
  * Xcode - [Download link](https://developer.apple.com/xcode/)
  * Android Studio - [Download link](https://developer.android.com/studio)
  * expo application (optional)

* Install the dependencies
```sh
npm install
```

* To use backend service (Local server)
```sh
npm install -g ngrok
```
```sh
# Sign up ngrok account
ngrok config add-authtoken <YOUR-AUTHTOKEN>
```

```sh
ngrok config edit #with below yml
```

```yml
version: "2"
authtoken: 2cWpVRAxBHc2YCgSK3Z0ApUM0mc_6CRXLsJjdRQ5Vrf1QsdZ3
tunnels:
  napark-auth:
    addr: 1323
    proto: http
  napark-user:
    addr: 1325
    proto: http
  napark-parking-lot:
    addr: 1324
    proto: http
```

```sh
ngrok start --all
```
<img width="987" alt="image" src="https://github.com/ParkingSystemWithLPR/Napark-application/assets/70643030/fae3f87e-b095-43be-a275-4226b1f4e870">

Then, create `.env.local` with this content
```.env
EXPO_PUBLIC_AUTH_API_URL=https://a207-2001-fb1-ff-9ecf-b48f-c49f-c984-bffe.ngrok-free.app
EXPO_PUBLIC_USER_API_URL=https://65b2-2001-fb1-ff-9ecf-b48f-c49f-c984-bffe.ngrok-free.app
EXPO_PUBLIC_PARKING_LOT_API_URL=https://a51b-2001-fb1-ff-9ecf-b48f-c49f-c984-bffe.ngrok-free.app

```

* Start the application
```sh
npx expo start
```
with these options
* Press a | to open Android 
* Press i | to open IOS simulator
* Press j │ open debugger
* Press r │ reload app
* Press m │ toggle menu
