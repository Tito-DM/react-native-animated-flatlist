import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";
const { width, height } = Dimensions.get("screen");

const API_KEY = "563492ad6f9170000100000104d7c3f8d7004020a13eff916c6eb7a9";
const API_URL =
  "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20";
const fetchImg = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });

  const {photos} = await data.json();
  return photos;
};
export default () => {
  const [img, setimg] = React.useState(null)
  React.useEffect(()=>{
        const fetchData = async ()=>{
          const img = await fetchImg();
          setimg(img)
        }

        fetchData();
  },[])

  if(!img){
    return null
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList 
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      data= {img} 
      keyExtractor={item=> item.id.toString()} 
      renderItem={({item})=>{
        return (
    
            <View style= {{width,height}}>
              <Image source ={{uri: item.src.portrait}} style={[StyleSheet.absoluteFillObject]} />
            </View>
        )
      }}/>
    </View>
  );
};
