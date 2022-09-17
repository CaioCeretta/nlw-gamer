import { GameController } from 'phosphor-react-native';
import { TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
  hourEnd: string;
  hourStart: string;
  id: string;
  name: string;
  useVoiceChanel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label="Nome"
        value={data.name}
      />
      <DuoInfo
        label="Time of Playing"
        value={`${data.yearsPlaying} years of playing`}
      />
      <DuoInfo
        label="Availability"
        value={`${data.weekDays.length} days \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label="Voice Call"
        value={data.useVoiceChanel ? "Yes" : "No"}
        colorValue={data.useVoiceChanel ?  THEME.COLORS.SUCCESS : THEME.COLORS.ALERT }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
        >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20} />

        <Text style={styles.buttonTitle}>
          Sign In
        </Text>


      </TouchableOpacity>


    </View>
  );
}