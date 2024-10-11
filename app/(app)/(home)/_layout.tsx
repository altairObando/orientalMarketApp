import FontAwesome from '@expo/vector-icons/FontAwesome5'
import { Tabs } from 'expo-router';

export default function TabRoot(){
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#4FE0D3' }}>
            <Tabs.Screen
                name='tab1'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={20} name='home' color={color} />,
                  }}/>
            <Tabs.Screen
                name='Products'
                options={{
                    title: 'Products',
                    tabBarIcon: ({ color }) => <FontAwesome size={20} name='box' color={color} />,
                  }}/>
            <Tabs.Screen
                name='tab3'
                options={{
                    title: 'News',
                    tabBarIcon: ({ color }) => <FontAwesome size={20} name='signal' color={color} />,
                  }}/>
            <Tabs.Screen
                name='tab4'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={20} name='user' color={color} />,
                }}/>
        </Tabs>
    )
}