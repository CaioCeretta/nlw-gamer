import { useState, useEffect } from 'react';
import { Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import logoImg from '../../assets/logo-nlw-esports.png';

import { Heading } from '../../components/Heading';

import { GameCard, GameCardProps } from '../../components/GameCard';


import { GAMES } from '../../utils/games';
import { styles } from './styles';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}: GameCardProps) {
    navigation.navigate('game', {id, title, bannerUrl})
  }

  useEffect(() => {
    fetch('http://192.168.0.208:3001/games')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setGames(data)
      })

  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Find your Duo!"
          subtitle='Select the game that you wish to play!'>
        </Heading>

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)} // Se tem parametro voce precisa chamar desse jeito, caso contrario pode ser apenas o nome da função
              
            />

          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />



      </SafeAreaView>
    </Background>
  );
}