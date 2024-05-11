import { StyleSheet,Dimensions } from 'react-native';
import { BottomTabNavigator } from '../navigation/BottomTabNavigator';



function scaleSize(fontSize) {
  const window = Dimensions.get('window');
  return Math.round((fontSize / 375) * Math.min(window.width, window.height));
}



export const style = StyleSheet.create({
  container: {   
    display:'flex',
    flexDirection:'row',
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // textAlign:'center',
    // alignContent:'center',
    // margin:2,   
  },
  bodyText:{
    // color:'#888',
    // fontSize:scaleSize(10),    
  },
  headlineText:{
    // color:'#080',
    // fontSize:scaleSize(50),
    // textAlign:'center'
  },
  // headlineImage:{
  //   width:800,
  //   height:450,
    
  // },
  touchable: {    
    // borderColor: '#888',  
    // borderWidth:3,
    // borderRadius: 10,   
    // textAlign:'center',
    // alignContent:'center',
    // alignItems:'center',
    // justifyContent:'center',
  },
  text: {
    // alignSelf: 'center'
  },
  banner: {    
    // headerTintColor: 'red',
    // headerTitleStyle: { color: 'black' }
  },
  event:{
    // backgroundColor:'green',
    // textAlign:'center',
    // padding:5,
    // borderRadius:10,
    // margin:2
  },
  eventTitle:{
    // backgroundColor:'red',
    // padding:5,
    // margin:2,
    // borderRadius:10,    
  },
  eventData:{
    // backgroundColor:'#fff',
    // margin:2,
  },
  card:{  
    flex:1,       
    display:'flex',       
    flexDirection:'column',
    flexWrap:'nowrap',
    justifyContent:'center',            
    borderRadius: 10,
    width:300+(Dimensions.get('screen').width/7),
    backgroundColor:'white',
    // height:100+Dimensions.get('screen').height/2.6,
    margin:10,
  },
  cardImg:{     
    flex:1,
    resizeMode: 'contain',
    width:Dimensions.get('window').width,
    objectFit:'cover',
    borderRadius: 10,    
    backgroundColor:'white',
    margin:10,
  },
  cfooter:{
    // display:"flex",
    // width:550,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,   
    margin:20,
  },
  cbody:{    
    
    // width:Dimensions.get('window').width/6,
    // borderRadius:10,
  },
  detailCard:{
    // display:'flex',
    // flexDirection:'column',
  },
  detailImg:{
    // width:300,
    // height:'100%',
    // objectFit:'cover',
    // borderRadius:10,
    // margin:15,
  },
  detailBody:{
    // display:'flex',
    // flexDirection:'row',
    // flexWrap:'nowrap',
  },
  detailTitle:{
    // textAlign:'center',
    // justifyContent:'center',
    // alignItems:'center',
  },
  searchContainer: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  authorFlatList: {
    flexDirection: 'row',
    // borderRadius: 10,
    // marginTop: '1%',
  },  
  authorcardfooter:{
    // display: 'flex',    
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 10,    
  },
  authorcardbody:{    
    // borderRadius: 10,
  },  
  authorcardgroup: {
    // flexDirection: 'row',
    // width: '90%',    
    // borderRadius: 10,
    // marginTop: '2%',
    // alignItems: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
    // alignContent: 'center',
  },
  flatListParent:{
    marginBottom:50,
    display:'flex',
    flex:1,    
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center',
    backgroundColor:'white',
    
  },
  flatList:{    
    // marginBottom:50,
    // display:'flex',
    flex:1,    
    // flexDirection:'row',
    // alignContent:'center',
    // alignItems:'center',
    // textAlign:'center',
    // justifyContent:'center'
  },
  flatListContainerStyle:{
    flexGrow: 1, 
    justifyContent: 'center',
  },  
  safe:{
    // flex:1,
  },
  headerRight:{
    flexDirection:'row',
    flexWrap:'nowrap',    
    marginRight:10,
    marginBottom:10,
    paddingBottom:20,
    paddingRight:10,
  },
  newScreenHeader:{
    height:20,
    backgroundColor:'#f4511e',   
    
  },
  newScreenHeaderTitle:{
    fontWeight:'bold',
    fontSize:20,
    color:'white',
    textAlign:'center',
    alignContent:'center',
    includeFontPadding:true,
    paddingBottom:30,
  },
  bottomTabNavigator:{
    flex:1,    
    marginBottom:50,
    display:'flex',    
    // flexDirection:'row',
    // alignContent:'center',
    // alignItems:'center',
    // textAlign:'center',
    // justifyContent:'center'              
  },
  searchBar:{
    height: 50,
    borderColor: '#919191',
    orderWidth: 1,
    margin: 10,
    paddingLeft: 15,
    borderRadius: 10,
  },
  listAccordion:{     
    // flex:1,  
    // display:'flex', 
    backgroundColor:'white',    
    padding:20,  
  },
  listAccordionItem:{
    flexWrap:'wrap',
  },
  listAccordionButton:{
    backgroundColor:'lightblue',
  },
  defaultContainer:{
    flex: 1, 
    flexDirection:'column',
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  defaultButton:{
    margin:25,
  }

});
