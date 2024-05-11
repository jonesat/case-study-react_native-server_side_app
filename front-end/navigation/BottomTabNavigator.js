import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {getFocusedRouteNameFromRoute} from "@react-navigation/core"
import {style} from '../css/styles';
import SearchPage from "../screens/SearchPage";
import {TabBarIcon} from '../components/week7';
import ShelfScreen from "../screens/ShelfPage";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Main";

export function BottomTabNavigator({route,navigation,}){

    return(
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        
            <BottomTab.Screen   
                name="Search"
                component={SearchPage}  
                // style={{flex:1}}             
                options={{
                    title: "Search",
                    tabBarIcon: ({focused}) =>(<TabBarIcon focused={focused} name="md-search-circle-sharp"/>),
                }}
            />

            <BottomTab.Screen   
                name="Shelf"                
                component={ShelfScreen}                
                // style={{flex:1}}
                options={{
                    title: "Your Book Shelf",
                    tabBarIcon: ({focused}) =>(<TabBarIcon focused={focused} name="md-book-sharp"/>),
                }}
            />

        </BottomTab.Navigator>
    )
}