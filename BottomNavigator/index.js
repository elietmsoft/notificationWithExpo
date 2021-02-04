
import React, { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { View, Image, StyleSheet, TouchableOpacity,Platform, TouchableWithoutFeedback, Animated, Text, Alert } from 'react-native';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function BottomNavigator()
{
    // Les variables et méthodes obligatoires
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }, []);

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Vous avez un message 📬",
            body: 'Voici le corps de la notification',
            data: { data: 'Allez ici' },
          },
          trigger: { seconds: 2 },
        });
      }
      
    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Echec d obtention du token de push notifications');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Il faut exécuter le Push notifications sur un device physique');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }
    //Fin

    toggleOpen = () => {}
        return (
            <View style={styles.MainContainer}>
                <Text style={{fontSize:28,marginTop:30,alignSelf:"center",color:"#FFF"}}>Bonjour Russ</Text>
                <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
                    <Image 
                    style={{width:"100%",height:"100%"}}
                    resizeMode="contain"
                    source={require("../assets/russ.jpeg")} />
                </View>
                <Text>Your expo push token: {expoPushToken}</Text>

                <View style={styles.subMainContainer}>

                    <TouchableWithoutFeedback>
                        <View style={[styles.button, styles.actionBtn]}>

                            <Image style={{ width: 60, height: 60 }}
                                resizeMode="contain"
                                source={{ uri: 'https://icon-library.net/images/android-plus-icon/android-plus-icon-0.jpg' }} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.bottom}
                style={{

                    position: 'absolute',
                    backgroundColor: 'white',
                    border: 2,
                    radius: 3,
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    shadowOffset: {

                        height: 3, width: 3
                    },
                    x: 0,
                    y: 0,
                    style: { marginVertical: 5 },
                    bottom: 0,
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 25


                }}>

                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => { Alert.alert('click') }}>
                            <Image
                                style={styles.styleImg}

                                source={{ uri: 'http://pluspng.com/img-png/home-icon-png-home-house-icon-image-202-512.png' }}

                                onPress={()=>{Alert.alert("")}}
                            >

                            </Image>

                        </TouchableOpacity>
                        <Text style={{justifyContent:'center',alignItems:'center'}}>Home</Text>
                    </View>
                    
                    <View style={{
                        flexDirection: 'column', alignItems: 'center',justifyContent:'center',marginStart:30
                    }}>

                        <TouchableOpacity
                            onPress={() => { Alert.alert("click") }}
                        >
                            <Image
                               style={styles.styleImg}
                                source={{ uri: 'http://simpleicon.com/wp-content/uploads/active-search.png' }}
                                onPress={() => { Alert.alert("click") }}
                            />
                       
                        </TouchableOpacity>
                        <Text style={{justifyContent:'center',alignItems:'center' }}>search </Text>
                    </View>

                        <View style={{
                             flexDirection: 'column', alignItems: 'center',justifyContent:'space-between',marginStart:85,
                        }}>

                            <TouchableOpacity
                                onPress={() => { Alert.alert("click") }}
                            >
                                <Image
                                    source={{ uri: 'http://pixsector.com/cache/a1dd5a90/av895b2bd52a42e99ee3c.png' }}
                                    onPress={() => { Alert.alert("click") }}
                                    style={{ marginHorizontal: 16, width: 30, height: 30 }}
                                    containerStyle={{ marginHorizontal: 16 }}
                                />
                       
                            </TouchableOpacity>
                            <Text style={{justifyContent:'center',alignItems:'center' }}>Menu </Text>
                        </View>
                        <View style={{
                            flexDirection: 'column', alignItems: 'center',justifyContent:'flex-end',
                          
                        }}>
                            <TouchableOpacity
                               onPress={async () => {
                                await schedulePushNotification();
                              }}
                            >
                                <Image
                                    source={require("../assets/alarm_80px.png")}

                                    style={{ marginHorizontal: 16, width: 30, height: 30 }}
                                    containerStyle={{ marginHorizontal: 16 }}
                                />
                     
                            </TouchableOpacity>
                            <Text style={{justifyContent:'center',alignItems:'center' }}>Push </Text>
                           
                        </View>

                    {/* </View> */}
                </View>
            </View>
        );
    }




const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        //justifyContent: 'center',
       // alignItems: 'center',
        //backgroundColor: 'blue',
        flexDirection: 'column',
        backgroundColor: '#ec0000'
    },
    subMainContainer:{
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'grey',
        width: 70,
        height: 70,
        borderRadius: 35,
        bottom: 35,
        zIndex: 10
    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 0,
        top: 5,
        left: 5,
        shadowOpacity: 5.0,
    },
    styleImg:{
        width: 30, height: 30 
    },
    actionBtn: {

        backgroundColor: '#1E90FF',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#fff'

    }


});