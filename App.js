import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "a957785922f1d615be82c70b6ff4b72b"; //https://openweathermap.org/api 사용

//icons.expo.fyi
const icons = {
  Clouds: "cloudy", // 날씨 : 아이콘이름
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  snow: "snow",
  rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync(); // 유저 권한
    if (!granted) setOk(false);

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );

    const json = await res.json();

    setDays(
      json.list.filter((weather) => {
        if (weather.dt_txt.includes("12:00:00")) {
          return weather;
        }
      })
    );
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      {/* <View style={styles.weather}> */}
      {/* scrollbiew는 화면보다 커야해서 flex:3을 주면 작동 안됨 */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={{ width: SCREEN_WIDTH }}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ ...styles.day, alignItems: "center" }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={{ ...styles.day, paddingLeft: 30 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingRight: 30,
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.main.temp).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="white"
                />
              </View>

              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "tomato" },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "white",
    fontSize: 58,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    color: "white",
    alignItems: "left",
  },
  temp: {
    color: "white",
    marginTop: 50,
    fontSize: 130,
  },
  description: {
    color: "white",
    fontSize: 50,
  },
  tinyText: {
    color: "white",
    fontSize: 20,
  },
});
