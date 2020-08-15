import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';

export const Container = styled.View`
  flex: 1;
`;

export const Loading = styled(AppLoading)`
  color: #fff;
  align-items: center;
  justify-content: center;
  flex: 1;
  z-index: 3;
`;

export const Background = styled.View`
  height: 70%;

  justify-content: space-around;
`;

export const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#5948EE', '#8FD3FA'],
  start: [0, 0],
  end: [0, 1],
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
`;

export const Header = styled.View`
  align-items: center;
  width: 100%;
`;

export const City = styled.Text`
  font-family: 'Manrope_300Light';
  font-size: 30px;
  color: #fff;
`;

export const TempDetails = styled.View``;

export const Weather = styled.Text`
  text-align: center;
  font-family: 'Manrope_300Light';
  font-size: 18px;
  color: #fff;
`;

export const TempContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Temperature = styled.Text`
  text-align: center;
  font-family: 'PublicSans_100Thin';
  font-size: 90px;
  color: #fff;
  letter-spacing: -5px;
`;

export const Image = styled.Image`
  width: 120px;
  height: 120px;
`;

export const TimeContainer = styled.View`
  align-items: center;
  position: relative;
`;

export const Time = styled.Text`
  color: #ccc;
  text-align: center;
`;

export const Button = styled(BorderlessButton)`
  position: absolute;
  right: 0;
  top: -3px;
`;

export const Details = styled.View`
  width: 100%;
  padding: 30px;

  flex-direction: row;
  justify-content: space-between;
`;

export const MinMaxContainer = styled.View`
  width: 48%;
  align-items: center;
`;

export const TempTitle = styled.Text`
  color: #fff;
  font-family: 'Manrope_700Bold';
  font-size: 18px;
  letter-spacing: 1px;
  margin-bottom: 15px;
`;

export const TempText = styled.Text`
  color: #fff;
  margin-left: 6px;
  font-family: 'Manrope_300Light';
  letter-spacing: 1px;
`;

export const WeatherInfo = styled.View`
  flex: 1;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: -25px;
  background-color: #fcfcfa;
  z-index: 2;

  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
`;

export const WeatherTitle = styled.Text`
  font-family: 'Manrope_700Bold';
  letter-spacing: 1px;
  margin-bottom: 10px;
`;

export const WeatherText = styled.Text`
  margin-left: 6px;
  font-family: 'Manrope_300Light';
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const InfoItem = styled.View`
  align-items: center;
  width: 48%;
  height: 50%;
  padding: 20px;
`;
