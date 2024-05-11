import React  from "react";
import {useState} from 'react';
import {Stylesheet,TextInput,SafeAreaView, FlatList,Text,View,ScrollView,Linking} from "react-native";
import {Card,Divider, List, Button , Title ,Paragraph } from 'react-native-paper';
import {style} from '../css/styles';
import { useNavigation } from "@react-navigation/core";
import { AddToShelf,RemoveFromShelf } from "./contextItems";
import { getAuthorWorks } from "../api";
import moment from 'moment';
import { useUserContext } from '../contexts/userProvider';


export function CreateCard(props){
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);    
    return(         
        <Card style={style.card}>
            <List.Section style={{borderRadius:10}}>    
                <List.Accordion                    
                    title={`Title: ${props.book.title}`}
                    description="Click for book details"
                    left={book => 
                        <Card.Cover style={style.cardImg} source={props.book.imageLinks.thumbnail? {uri: props.book.imageLinks.thumbnail.toString()}: require('../assets/noImg.png')} />}  
                    expanded={!expanded}
                    onPress={handlePress}
                    style={style.listAccordion}
                    >
                    <Divider/>
                    <Title> {props.book.title} </Title>
                    <List.Item title={`Author: ${props.book.authors}`}/>
                    {props.book.searchInfo.textSnippet && (<List.Item title={"Description:"} description={`${props.book.searchInfo.textSnippet}`}/>)}
                    
                    <Card.Actions style={style.cfooter}>                
                        {props.searching?<AddToShelf book={props.book}/>:<RemoveFromShelf book={props.book}/>}
                        <Button onPress={()=>props.navigation.push("Detail",{book:props.book})}>Details</Button>                                   
                    </Card.Actions>
                </List.Accordion>
            </List.Section>
        </Card>
    )
}

export function CreateCardList(props){
    return(
        <FlatList
            data={props.books}
            renderItem={({item}) => <CreateCard book={item} navigation={props.navigation} searching={props.searching}/>}
            keyExtractor={item => item.id}   
            style = {style.flatList}                     
            contentContainerStyle = {style.flatListContainerStyle}                        
        />
    )
}

export function CreateAuthorList(props){
    return(
        <FlatList
            data={props.books}
            renderItem={({item}) => <CreateCard book={item} navigation={props.navigation} searching={props.searching}/>}
            keyExtractor={(item,index) => index.toString()}   
            style = {style.authorFlatList}                     
            contentContainerStyle = {style.flatListContainerStyle}                        
        />
    )
}

export function CreateDetails(props){
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);  
    const { loading, works, error } = getAuthorWorks(props.book.authors);

    const ratingsLI = ((book)=>{
        let requirementsBool = []
        requirementsBool.push(book.averageRating!=="Unknown averageRating")
        requirementsBool.push(book.ratingsCount!=="Unknown ratingCount")
        if (requirementsBool.every((bool)=>bool)){
          return <List.Item title={`Avg Rating`} description={`${book.averageRating} from ${book.ratingsCount} reviews.`}/>
        }
      })

    const buyButton = (book)=>{
        let requiredFields =  ["listPrice","buyLink","currencyCode"]
        let requirementsBool = []
    
        props.book.saleInfo.saleability ==="FOR_SALE"? requirementsBool.push(true):requirementsBool.push(false)
        requiredFields.map((field)=>props.book.saleInfo[field]==="undefined"?requirementsBool.push(false):requirementsBool.push(true))
        
        if (requirementsBool.every((bool)=>bool)){
          return(     
            <View>
                <Text>
                    {`Buy Now: ${props.book.saleInfo.listPrice.amount} ${props.book.saleInfo.listPrice.currencyCode}`}
                </Text>
                <Button mode="contained" onPress={()=>Linking.openURL(props.book.saleInfo.buyLink)}>Buy</Button>            
                <CreateAuthorList books={props.books}/>
            </View>       
                
          )
        }
      }
    return(         
        <List.Section>    
                <Card style={style.card}>
                    
                    <List.Accordion                     
                        title={`Title: ${props.book.title}`}
                        description="Click for book details"
                        left={book => 
                            <Card.Cover style={style.cardImg} source={props.book.imageLinks.thumbnail? {uri: props.book.imageLinks.thumbnail.toString()}: require('../assets/noImg.png')} />}  
                        expanded={expanded}
                        onPress={handlePress}
                        style={style.listAccordion}
                        >
                        <Title> {props.book.title} </Title>
                        <List.Item title={`Author:`} description={`${props.book.authors}`}/>
                        <List.Item title={`Genre:`} description={`${props.book.categories}`}/>
                        <List.Item title={`Published Date:`} description={moment(props.book.publishedDate).format('DD/MMM/YYYY')}/>
                        {ratingsLI(props.book)}
                        {props.book.pageCount>0?<List.Item title={`Page Count:`} description={`${props.book.pageCount}`}/>:""}
                        {typeof props.book.isbn10 ==="undefined"?"":<List.Item title="ISBN10:" description={props.book.isbn10}/>}                        
                        
                        <Divider/>
                        <List.Item title="Description:" description={props.book.description} descriptionNumberOfLines={7}/>
                       
                        
                                    
                    </List.Accordion>
                    <Card.Actions>
                            {buyButton(props.book)}
                    </Card.Actions>
                </Card>
    
    </List.Section>

         
    )
}

