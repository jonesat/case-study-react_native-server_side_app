import { StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {style} from '../css/styles';


async function removeItemValue(key) {
  try {
      await AsyncStorage.removeItem(key);
      console.log(`Removed key: ${key}`)
      return true;
  }
  catch(exception) {
      return false;
  }
}



export function BodyText(props){

    return(
        <Text style={style.bodyText}>{props.text} - </Text>
    );
}

export function HeadlineText(props){

  return(
    <Text style={style.headlineText}>{props.text}</Text>
      
  );
}

export function HeadlineImage(props){
  
  return(
    <Image source={require('../assets/hero.jpg')} style={style.headlineImage}/>
  )
}

export function Headline(props){
  return(
  <View>
    <HeadlineImage hero={props.hero}/>
    <HeadlineText text={props.text} hero={props.hero}/>
  </View>
  )
}


export function TestButton(props){
  
  return(
    <View style={style.container}>
        <TouchableOpacity 
          onPress={()=>{
            removeItemValue("@Shelf")
          }}
          style={style.touchable}>          
          <View>
              <Text style={style.bodyText}>Emergency Override - Delete Async Storage</Text>
          </View>
        </TouchableOpacity>
      
    </View>
  )
}



