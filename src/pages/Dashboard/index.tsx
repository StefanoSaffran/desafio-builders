import React, { useEffect, useState, useMemo } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {
  Feather as Icon,
  Entypo,
  FontAwesome5 as FA5,
  MaterialCommunityIcons as MCI,
} from '@expo/vector-icons';

import api from '../../services/api';

import * as S from './styles';

interface IForecast {
  weather: Array<{
    id: number;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  dt: number;
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

const Dashboard: React.FC = () => {
  const [forecast, setForecast] = useState<IForecast>({} as IForecast);

  const loadForecast = async (): Promise<void> => {
    setForecast({} as IForecast);

    const { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Ooooops',
        'Precisamos de sua permissão para obter a localização',
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;

    const response = await api.get<IForecast>(
      `weather/?lat=${latitude}&lon=${longitude}&appid=76272c135415744f33eff636ded7cdcd&lang=pt_br&units=metric`,
    );

    setForecast(response.data);
  };

  useEffect(() => {
    loadForecast();
  }, []);

  const time = useMemo(() => {
    return format(
      new Date(forecast.dt * 1000 || Date.now()),
      "cccc 'às' HH:mm",
      {
        locale: ptBR,
      },
    );
  }, [forecast.dt]);

  const sunrise = useMemo(() => {
    return format(
      new Date(forecast?.sys?.sunrise * 1000 || Date.now()),
      'hh:mm',
      {
        locale: ptBR,
      },
    );
  }, [forecast.sys]);

  const sunset = useMemo(() => {
    return format(
      new Date(forecast?.sys?.sunset * 1000 || Date.now()),
      'HH:mm',
      {
        locale: ptBR,
      },
    );
  }, [forecast.sys]);

  return (
    <S.Container>
      <S.GradientBackground />
      {forecast.name ? (
        <>
          <S.Background>
            <S.Header>
              <S.City>{forecast.name}</S.City>
              <S.TempDetails>
                <S.Weather>
                  {forecast && forecast?.weather[0]?.description}
                </S.Weather>
                <S.TempContainer>
                  <S.Temperature>
                    {forecast?.main?.temp.toFixed(0)}°
                  </S.Temperature>
                  {forecast?.weather[0]?.icon && (
                    <S.Image
                      source={{
                        uri: `http://openweathermap.org/img/wn/${forecast?.weather[0]?.icon}@2x.png`,
                      }}
                    />
                  )}
                </S.TempContainer>
                <S.TimeContainer>
                  <S.Time>Atualizado {time}</S.Time>
                  <S.Button onPress={loadForecast}>
                    <MCI name="reload" size={22} color="#fff" />
                  </S.Button>
                </S.TimeContainer>
              </S.TempDetails>
            </S.Header>
            <S.Details>
              <S.MinMaxContainer>
                <S.TempTitle>Mínima</S.TempTitle>
                <S.Wrapper>
                  <FA5 name="temperature-low" size={16} color="#fff" />
                  <S.TempText>
                    {forecast?.main?.temp_min.toFixed(0)}°
                  </S.TempText>
                </S.Wrapper>
              </S.MinMaxContainer>
              <S.MinMaxContainer>
                <S.TempTitle>Máxima</S.TempTitle>
                <S.Wrapper>
                  <FA5 name="temperature-high" size={16} color="#fff" />
                  <S.TempText>
                    {forecast?.main?.temp_max.toFixed(0)}°
                  </S.TempText>
                </S.Wrapper>
              </S.MinMaxContainer>
            </S.Details>
          </S.Background>
          <S.WeatherInfo>
            <S.InfoItem>
              <S.WeatherTitle>Nascer do sol</S.WeatherTitle>
              <S.Wrapper>
                <Icon name="sunrise" size={16} color="#FECC6D" />
                <S.WeatherText>{sunrise}</S.WeatherText>
              </S.Wrapper>
            </S.InfoItem>

            <S.InfoItem>
              <S.WeatherTitle>Pôr do sol</S.WeatherTitle>
              <S.Wrapper>
                <Icon name="sunset" size={16} color="#FFAEBC" />
                <S.WeatherText>{sunset}</S.WeatherText>
              </S.Wrapper>
            </S.InfoItem>

            <S.InfoItem>
              <S.WeatherTitle>Vento</S.WeatherTitle>
              <S.Wrapper>
                <Icon name="wind" size={16} color="#A6A6A6" />
                <S.WeatherText>{forecast?.wind?.speed} m/s</S.WeatherText>
              </S.Wrapper>
            </S.InfoItem>

            <S.InfoItem>
              <S.WeatherTitle>Umidade</S.WeatherTitle>
              <S.Wrapper>
                <Entypo name="water" size={16} color="#95E2EC" />
                <S.WeatherText>{forecast?.main?.humidity}%</S.WeatherText>
              </S.Wrapper>
            </S.InfoItem>
          </S.WeatherInfo>
        </>
      ) : (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}
        />
      )}
    </S.Container>
  );
};

export default Dashboard;
