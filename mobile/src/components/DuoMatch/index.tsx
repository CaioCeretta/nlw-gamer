import { View, Modal, Text, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ClipBoard from 'expo-clipboard'

import { styles } from './styles';
import { THEME } from '../../theme';
import { Check, CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import { useState } from 'react';

interface Props extends ModalProps {
  discord: string;
  handleClose: () => void;
}



export function DuoMatch({ discord, handleClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopying(true);
  
    await ClipBoard.setStringAsync(discord);
  
    Alert.alert('Discord copied!', 'Discord was copied for you to put on Discord and find a Duo');
  
    setIsCopying(false);
  }
  
  return (
    <Modal
      animationType='fade'
      transparent
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={handleClose}
          >

            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500} />

          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading
            title="Let's play"
            subtitle="Now it's time to play"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.discord}>
            Add on discord
          </Text>

          <TouchableOpacity
          style={styles.discordButton}
          onPress={handleCopyDiscordToClipboard}
          disabled={isCopying}
          >
            <Text style={styles.label}>
              {isCopying ? <ActivityIndicator
              color={THEME.COLORS.PRIMARY}/> : discord}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}
