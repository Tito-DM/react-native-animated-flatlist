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
const IMG_SIZE = 80;
const API_KEY = "563492ad6f9170000100000104d7c3f8d7004020a13eff916c6eb7a9";
const API_URL =
  "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20";
const fetchImg = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });

  const { photos } = await data.json();
  return photos;
};
export default () => {
  const [img, setimg] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      const img = await fetchImg();
      setimg(img);
    };

    fetchData();
  }, []);
  const toRef = React.useRef();
  const thumbRef = React.useRef();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    toRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true
    })
    if(index * (IMG_SIZE + 10)-IMG_SIZE/2 > width/2){
thumbRef?.current?.scrollToOffset({
  offset: index * (IMG_SIZE+ 10)- width /2 + IMG_SIZE/2,
  animated: true
  })
    }
  };
  if (!img) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        ref={toRef}
        horizontal
        onMomentumScrollEnd={(ev) => {
          scrollToActiveIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / width)
          );
        }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={img}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.src.portrait }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />

      <FlatList
        ref={thumbRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={img}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        style={{ position: "absolute", bottom: IMG_SIZE }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
               onPress = {()=> scrollToActiveIndex(index)}
            >
              <Image
                source={{ uri: item.src.portrait }}
                style={{
                  width: IMG_SIZE,
                  height: IMG_SIZE,
                  borderRadius: 12,
                  marginRight: 10,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? "#fff" : "transparent",
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
